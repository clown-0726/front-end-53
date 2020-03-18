## CDN（内容分发网络） 场景

配置语法：

```nginx
Syntax: sendfile on | off;
Default: sendfile off;
Context: http, server. location, if in location;

# sendfile 开启的情况下，提高网络包的传输效率
# tcp_nopush 不是一个一个去发，而是多个文件打包一起发，sendfile的优化
Syntax: tcp_nopush on | off;
Default: tcp_nopush off;
Context: http,server,location

# 实时性能比较高的时候打开，提高网络传输的实时性
Syntax: tcp_nodelay on | off;
Default: tcp_nodelay off;
Context: http,server,location

# 压缩传输
Syntax: gzip on | off;
Default: gzip off;
Context: http,server,location, if in location

# 压缩比率
Syntax: gzip_comp_level level;
Default: gzip_comp_level 1;
Context: http,server,location
```

扩展Nginx压缩模块

http_gzip_static_module - 预读gzip功能
http_gunzip_module - 应用支持gunzip的压缩方式（几乎不用，在不支持zip压缩方法场景下用）

## 浏览器缓存

```nginx
Syntax: expires [modified] time;
		expires epoch | max | off;
Default: expires off;
Context: http,server,location, if in location;
```



## 跨站访问 (Access-Control-Allow-Origin)

```nginx
Syntax: add_header name value;
Default: -;
Context: http,server,location, if in location;
```

```nginx
location ~ .*\.(htm|html)$ {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
    root /opt/app/code;
}
```

## 防盗链

其实先原理就是检查某一资源的上一级资源是不是来自本站点，用http_refer这个请求头

```nginx
Syntax: valid_referers none | blocked | server_names | string ...;
Default: -;
Context: server,location;
```

```nginx
location ~ .*\.(htm|html)$ {
    valid_referers none blocked 116.62.103.228;
    if($invalid_referer) {
        return 403;
    }
    root /opt/app/code;
}
```



## 反向代理

```nginx
Syntax: proxy_pass URL;
Default: -;
Context: location, if in location, limit_expect;
```

## 正向代理

正向代理和反向代理的区别其实就在为谁代理，正向代理就是为客户端代理，反向代理是为服务器代理，也就是我们常常用的访问nginx服务器，而nginx将我们的某一规则的请求代理到其他地址访问。

一个正向代理的例子：就是翻墙，比如我们要访问墙外的资源，我们现在有一台服务器可以访问，因此，我们可以设置浏览器自己的代理为这太服务器的地址，这样我们就可以访问墙外的资源了。

```nginx
resolver 8.8.8.8
location / {
	proxy_pass http://$http_host$request_uri;
}
```

## 代理语法补充 & 企业配置实例

### 代理语法补充

```nginx
# 缓冲区
Syntax: proxy_buffering on | off;
Default: proxy_buffering on;
Context: http,server,location;
# 扩展：proxy_buffer_size, proxy_buffers, proxy_busy_buffers_size

# 跳转重定向
Syntax: proxy_redirect default;
		proxy_redirect off; proxy_redirect redirect replacement;
Default: proxy_redirect default;
Context: http,server,location;

# 缓冲区
Syntax: proxy_set_header field value;
Default: proxy_set_header Host $proxy_host;
		proxy_set_header Connection close;
Context: http,server,location;
# 扩展：proxy_hide_header, proxy_set_body

# 超时
Syntax: proxy_connect_timeout time;
Default: proxy_connect_timeout 60s;
Context: http,server,location;
# 扩展：proxy_read_timeout, proxy_send_timeout

```



### 企业配置实例

```nginx
location / {
	proxy_pass http://127.0.0.1:8080;
    proxy_redirect default;
    
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP &remote_addr;
    
    proxy_connect_timeout 30;
    proxy_send_timeout 60;
    proxy_read_timeout 60;
    
    proxy_buffer_size 32k;
    proxy_buffering on;
    proxy_buffers 3 128k;
    proxy_busy_buffers_size 256k;
    proxy_max_temp_file_size 256k;
    
    # Can use below sentence to include above common config
    # include proxy_params;
}
```

## 负载均衡

负责均衡地域上划分分为GSLB和SLB

![](https://s2.ax1x.com/2020/02/17/3CtLX6.md.png)

![](https://s2.ax1x.com/2020/02/17/3CNFjP.md.png)

在SLB中又分为七层负载均衡和四层负载均衡

- 四层负载均衡实现的是包转发，在ISO模型中的传输层也就是对TCP/UDP的包转发负载均衡
- 七层负载均衡是ISO模型的应用层，地址的负载均衡，nginx就是典型的七层负载均衡

通过 `proxy_pass` 和 `upstream`（配置一组服务器）实现的

upstream 配置语法

```nginx
Syntax: upstream name { ... };
Default: -;
Context: http;
```

example:

```nginx
upstream imooc {
    116.62.103.228:8001 down;
    116.62.103.228:8002 backup;
    116.62.103.228:8003 max_fails=1 fail_timeout=10s;
}

...

location / {
    proxy_pass http://imooc;
    include proxy_params;
}
```



nginx默认会采用轮询的方式做负载均衡，如果一个节点挂掉了，则会自动将这个节点下线。

upstream举例

```nginx
upstream backend {
    server backend1.example.com weight=5; # 带有加权的轮询
    server backend2.example.com:8080;
    server unix:/tmp/backend3;
    
    server backend1.example.com:8080 backup; # 这是备份节点
    server backend2.example.com:8080 backup;
}
```

后端服务器在负载均衡调度中的状态

| 状态         | 解释                                  |
| ------------ | ------------------------------------- |
| down         | 当前的server暂时不参与负载均衡        |
| backup       | 预留的备份服务器                      |
| max_fails    | 允许请求失败的次数                    |
| fail_timeout | 经过max_fails失败之后，服务暂停的时间 |
| max_conns    | 限制最大的接受的连接数                |

nginx 负载均衡调度算法

| 状态         | 解释                                                         |
| ------------ | ------------------------------------------------------------ |
| 轮询         | 按照时间顺序逐一分配到不同的后端服务器                       |
| 加权轮询     | weight指越大，分配道德访问几率越高<br>**轮询都有一个缺点就是不能很好的保存 用户 session，容易造成用户掉线** |
| ip_hash      | 每个请求按照访问IP的hash结果分配，<br>这样来自同一个IP的固定访问一个后端就服务器<br>**这个的实现原理是`$remote_addr` 因此如果前面再有一层代理的话就很难识别出用户IP** |
| url_hash     | 按照访问的URL的hash结果来分配请求，<br>是每个URL定向到同一个后端服务器 |
| least_conn   | 最少连接数，哪个集齐连接数少就分发                           |
| hash关键数值 | hash自定义的key                                              |

url_hash

```nginx
Syntax: hash key [consitent];
Default: -;
Context: upstream;
```

## 缓存

- 浏览器缓存
- 代理缓存：主要是一些请求的服务端数据，缓存在nginx代理层
- 服务端缓存，主要是一些key-value缓存，比如redis，memcache等

```nginx
proxy_cache_path # 定义缓存的路径
proxy_cache zone | off # 使用哪个定义好的路径
proxy_cache_valid # 缓存的周期，过期配置
proxy_cache_key sting # 缓存的维度
```

Example:

![](https://s2.ax1x.com/2020/02/18/3FqPcF.md.png)

让页面不缓存

```nginx
Syntax: proxy_no_cache string...;
Default: -;
Context: http, server, location;
```

大文件分片请求

```nginx
Syntax: slice size;
Default: size 0;
Context: http, server, location;
```

优势：
每个子请求收到的数据会形成一个独立文件，一个请求断了，其它的请求不受影响

缺点：
当文件很大或者slice很小的时候，可能会导致文件描述符耗尽等情况