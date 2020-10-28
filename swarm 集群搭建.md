一提到 Docker 的服务编排服务，大多数人首先想到的肯定是 Kubernetes，仿佛 Kubernetes 已经成为 Docker 编排的标准。确实， Kubernetes 可以帮我们做很多的事情，但同时它也非常重。如果我们只想要一个轻量级的 Docker 编排工具，并且容易搭建和使用，那么官方的 Docker Swarm 会是一个不错的选择。

### Docker Swarm 的特点

作为官方首推的 Docker 服务编排工具，其最终的特点就是“简单”。主要体现在下面几点：

- 对外以 Docker API 的方式呈现，因此学习成本很低；
- 轻量级，节约资源；
- 对 Docker 命令参数支持完善；

### 搭建 Swarm 集群

##### STEP 01 创建服务器集群

准备三台安装好 Docker 和 docker-compose 的服务器(自己 aws 上的服务器)

- **Runner 3**:      172.31.47.251     |     52.37.216.32
- **Runner 2**:      172.31.46.208     |     34.223.240.14
- **All website**:   172.31.36.97       |     34.214.110.103

打开三台服务器上相应的端口

- **TCP port 2377** for cluster management communications
- **TCP** and **UDP port 7946** for communication among nodes
- **UDP port 4789** for overlay network traffic

##### STEP 02 运行部署命令

1. 在选定的 master 节点上运行 `sudo docker swarm init --advertise-addr 172.31.47.251` 来初始化 master 节点，然后我们会得到一个加入的token `SWMTKN-1-5sxf9hi55tnhush94ngq7q4j1b57l1qpazi8c5m8qxxel7hwdg-58dnnki56z18sgepaxh1rk0gs`

2. 然后在其他服务器上分别执行命令`docker swarm join --token SWMTKN-1-5sxf9hi55tnhush94ngq7q4j1b57l1qpazi8c5m8qxxel7hwdg-58dnnki56z18sgepaxh1rk0gs 52.37.216.32:2377` 让其他节点都加入到集群中来。

3. 这样我们就创建出了一个最基本的集群，我们可以用 `sudo docker node ls` 查看三个节点的状态

   ```
   ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
   f3efa8474eyyqzeoijr6huub3 *   ip-172-31-36-97     Ready               Active              Reachable           18.09.8
   g3k7dsddulw25uf9knu6c8vp6     ip-172-31-46-208    Ready               Active              Reachable           19.03.6
   zy8y7ye6m3mkg4pispooynj2v     ip-172-31-47-251    Ready               Active              Leader              19.03.11
   ```

##### STEP 03 配置集群的高可用

搭建完集群后，现在集群是一主多从的状态，如果主几点宕机后，整个集群就崩溃了，因此我们需要配置集群的高可用状态，配置方式也很简单，只需要在各个从节点上分别执行 `docker node promote NAME`  来提升各个节点的等级。这样如果主节点出问题后，那么 swarm 集群会通过选举的策略去选出其他的节点作为新的主节点。

### 一些常用的集群管理操作

##### 在集群上创建一个新的服务

`docker service create --name nginx --detach=false nginx`

`--detach=false` 表示是否在是在 Background 模式执行

可以通过 `docker service inspect nginx 去查看服务的具体信息

##### 修改服务配置

用 `docker service update --publish-add 8080:80 --detach=false nginx` 可以将 nginx 端口映射到宿主机的 8080 端口上

##### 服务伸缩

用 `docker service scale nginx=3 --detach=false` 来将 nginx 的服务变为三个，这样我们在进行访问的时候会通过 VIP LB 的方式做一个负载均衡，并且 LB 会带有一个 session 保存的功能

##### 停止服务

用 `docker service rm nginx` 可以停止掉一个服务

### Docker stack

正常的系统不肯能只有一个 service，往往是多个微服务的组合，服务和服务之间会有各种各样依赖关系，有些需要暴漏给用户访问，有些只是一些内部服务。而 Docker stack 在这里提供了一种配置文件的管理方式，使我们能更方便的管理我们的应用程序

下面是一个简单的配置文件及其解释，使用的时候可以运行 `docker stack deploy -c service.yml NAME` 来部署服务，当配置文件有更新的时候，可以使用上面同样的命令进行服务的更新部署。

```yml
version: "3.4"                 # 版本号

services:                      # 定义一组服务
  alpine:                      # 服务名
    image: apline              # 所需镜像
    command:                   # 镜像启动的时候运行的命令
      - "ping"
      - "www.google.com"
    networks:                  # 所属网络
      - "test-overlay"
    deploy:                    # 部署配置
      endpoint_mode: dnsrr     # 访问模式
      replicas: 2              # 几个副本
      restart_policy:          # 重启策略
        condition: on-failure
      resources:               # 资源约束
        limits:
          cpus: "0.1"
          memory: 50M
    depends_on:                # 服务依赖
      - nginx

    nginx:
      image: nginx
      networks:
        - "test-overlay"
      ports:
        - "8080:80"

networks:                      # 定义一组网络
  test-overlay:                # 网络名字
    external: true             # 如果已经存在，则这样写
```



### 服务发现和网络

服务发现其实指的是“服务间如何通讯”和“服务和用户如何通讯”这两个问题。

##### Ingress 网络

ingress 的 overlay 网络。overlay 网络就是在物理网络之上的一个虚拟网络，使我们的应用不再依赖物理网络，又能保持物理网络不变。

VIP LB 是一个基于虚拟网络的负载均衡，每个机器都有自己的虚拟IP

[![0h4w01.md.png](https://s1.ax1x.com/2020/10/13/0h4w01.md.png)](https://imgchr.com/i/0h4w01)

##### Ingress + link 网络

其实就是在原来的 ingress 网络上加上了 link，可以使得相互依赖的服务进行访问。内部使用了容器的DNS映射。

[![0h4Dk6.md.png](https://s1.ax1x.com/2020/10/13/0h4Dk6.md.png)](https://imgchr.com/i/0h4Dk6)

##### 自定义网络

先创建一个overlay的网络 `docker network create --driver=overlay --attachable mynet`

将服务绑定到网络 `docker service create -p 80:80 --network=mynet --name nginx nginx`

[![0h40Tx.md.png](https://s1.ax1x.com/2020/10/13/0h40Tx.md.png)](https://imgchr.com/i/0h40Tx)

##### 其他

先看一下 Swarm 的网络类型 `vip` 和 `dnsrr`

网络的Driver: `bridge` `host` `overlay`

### Reference

[1] 从零开始，使用Docker Swarm部署集群教程: https://blog.csdn.net/u011936655/article/details/81147315
[2] How to Add a Health Check to Your Docker Container: https://howchoo.com/devops/how-to-add-a-health-check-to-your-docker-container
[3] Restarting an unhealthy docker container based on healthcheck: https://stackoverflow.com/questions/47088261/restarting-an-unhealthy-docker-container-based-on-healthcheck
[4] set time period to restart a container with docker-compose: https://serverfault.com/questions/1003348/set-time-period-to-restart-a-container-with-docker-compose
[5] Getting started with swarm mode: https://docs.docker.com/engine/swarm/swarm-tutorial/#open-protocols-and-ports-between-the-hosts
[6] Docker Stack部署: https://blog.csdn.net/weixin_40364776/article/details/104432057

