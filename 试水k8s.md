## 简介

k8s 如今已经成为业界容器编排的标准。具体介绍可以参考网上以及官网的说明，这篇文档主要记录搭建一个高可用集群的过程，并且记录如何在典型应用场景下的应用，并且记录日常运维的过程。

## 安装步骤

 安装准备 --> 安装容器引擎 --> 下载安装工具、node组建 --> 安装集群网络 --> 初始化master --> 核心组件镜像下载 --> 加入worker节点 --> 配置命令行工具

#### 安装准备

- 选择 k8s 的 1.10.x 版本
- kube-up VS kubeadm VS kops
  - kube-up 是脚本引导方式运行
  - kops 以普通服务的方式运行 k8s，它负责基础设施层和k8s两层的控制，这更适合云提供商。
  - kubeadm是容器化的方式运行 k8s 的关键服务
- kubeadm 及可能成为 k8s 默认原生引导集群安装工具

## 准备基础环境

#### 安装虚拟机

本着简单高效的目的，这里选择开源的 virtualbox 虚拟机，并且安装 ubuntu 20.x 三台虚拟机。本人对 ubuntu 操作比较熟悉，并且 ubuntu 能保持比较新的 linux 内核，因此使用起来比较方便。

#### 配置虚拟机网络

我们创建一个 NAT 的网络，然后把所有的虚拟机的网络指定到这个网络，这样他们之间就可以互相通讯了。

<img src="https://lilu-pic-bed.oss-cn-beijing.aliyuncs.com/my-blog/try-k8s/setup-nat-network.png" style="zoom:50%;" />

#### 虚拟机配置 openssh

安装 openssh

```bash
sudo apt-get update
sudo apt-get install openssh-server
sudo ps -ef | grep ssh
```

查看 ip 地址

```bash
sudo apt install net-tools # 如果找不到 ifconfig
sudo ifconfig
```

#### 配置虚拟机端口转发

因为我们设置的是 NAT 网络，我们需要将 ssh 22 的端口转发到当前机器的选定端口以便我们可以直接在 host 机直接 ssh 登入到虚拟机。

<img src="https://lilu-pic-bed.oss-cn-beijing.aliyuncs.com/my-blog/try-k8s/net-port-forword-1.png" style="zoom:50%;" />

<img src="https://lilu-pic-bed.oss-cn-beijing.aliyuncs.com/my-blog/try-k8s/net-port-forword-2.png" style="zoom:50%;" />

#### 激活虚拟机 root 用户

我们在安装 ubuntu 系统的时候使用的是自己新建的用户，这里我用的是 `username/password: k8s/k8s`，可以通过下面命令激活 root 用户。

```
sudo passwd 或者sudo passwd root
Password：你当前的密码 
Enter new UNIX password：这个是root的密码 
Retype new UNIX password：重复root的密码 
然后会提示成功的信息。 

切入root用户，  su root   输入刚刚设置好的密码就可以了
```

#### 在虚拟机上安装容器运行时

最著名的容器运行时当属 docker，但是 k8s 不仅仅只支持这一个，所有符合 k8s CRI 接口的容器运行时都可以支持 k8s 的容器编排。可以访问 docker 的官方文档来安装 docker，这里安装的是 Docker version 19.03.13 版本。

- https://docs.docker.com/engine/install/ubuntu/

下图为 k8s 与容器运行时的关系架构图

![](https://lilu-pic-bed.oss-cn-beijing.aliyuncs.com/my-blog/try-k8s/relationship-between-k8s-container.png)

虚拟机 IP 地址参考

| Name         | IP 地址      | 转发端口       |
| ------------ | ------------ | -------------- |
| k8s template | 10.0.2.15:22 | 127.0.0.1:9091 |
| k8s 01       | 10.0.2.4:22  | 127.0.0.1:9092 |
| k8s 02       |              | 127.0.0.1:9093 |
| k8s 03       |              | 127.0.0.1:9094 |

启动成功后我们可以在本地通过 `ssh 127.0.0.0 -p 9091` 来链接我们创建的虚拟机

#### 安装 kubeadm，kubelet 和 kubectl

kubeadm 将 k8s 的核心组件以容器化的形式运行在主机上，但是 kubeket 依旧是以后台服务的形式运行在各个主机节点上的。kubectl 是集群不可获取的命令行管理工具。

在下载安装上述工具的时候对系统是有许多要求的，可以在官方的网址上查看：https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/。

具体安装步骤也可以参照上述链接一步步进行安装。

最后检查安装状态

```bash
kubeadm version
kubectl version
systemctl status kubelet
```

值得注意的是，kubelet 的状态一直是监听状态，只有我们用 kubeadm 部署集群或者加入集群后，kubelet 的状态才是运行状态。

#### 主节点部署 k8s 环境

部署一个 k8s 对服务器也有有一定环境要求的，可以参考官网给出的参考：https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/

在初始化集群之前，我们要进行集群的 pod 网络插件选择，这里选择 Weave Net。因为 Weave Net 是比较成熟的。

关闭 swap 功能。注释掉 `/etc/fstab` 的最后一样 swap 功能。

执行 kubeadm init 进行初始化集群
`kubeadm init --apiserver-advertise-address=10.0.2.15 --pod-network-cidr=192.168.16.0/20`

运行完之后会得到下面的日志用于将从节点加入到集群中

```
Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 10.0.2.15:6443 --token 87tlj0.7gq5red9o9d717xo \
    --discovery-token-ca-cert-hash sha256:27dd7cdbc78f507fe788221a9fc704b94db517f1bfe84a16be6ede29fb011d80
```

设置 KUBECONFIG 环境变量以使得 kubectl 可以进行管理 k8s 集群 `export KUBECONFIG=/etc/kubernetes/admin.conf` 然后用 `kubectl get pods -n kube-system -o wide`  查看运行状态。

PS: 如果 kubeadm init 出现问题，要先执行 `kubectl reset` 回复状态。

安装 Weave Net 网络插件

`kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"`

#### 将 worker 节点加入到主节点

xxx

#### 配置任意节点管理集群

xxx

查看系统运行日志 `journalctl -f -u kubelet.service`



## Reference:

[1] Linux初始root密码设置: https://www.cnblogs.com/mecy1222/p/7063954.html