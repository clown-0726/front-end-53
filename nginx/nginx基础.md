### 简介

nginx是一个高性能的、可靠的http中间件、代理服务。类似的中间件服务还有httpd，GWS（Google），IIS。

### 为什么选用nginx

1. IO多路复用epoll

2. 轻量级

3. CPU亲和（affinity）

   是一种把CPU的核心和Nginx工作进程绑定方式，把每个worker进程固定在一个CPU上执行，减少切换CPU的cache miss，获得更好的性能。

4. 采用sendfile模式发送静态文件，因此很快。



rpm -ql nginx

| 路径                                                         | 类型           | 作用                                       |
| ------------------------------------------------------------ | -------------- | ------------------------------------------ |
| /etc/logrotate.d/nginx                                       | 配置文件       | Nginx日志轮转,用于logrotate服务的日志切割  |
| /etc/nginx<br/>/etc/nginx/nginx.conf<br/>/etc/nginx/conf.d<br/>/etc/nginx/conf.d/default.conf | 目录、配置文件 | Nginx主配置文件                            |
| /etc/nginx/fastcgi_params<br/>/etc/nginx/uwsgi_params<br/>/etc/nginx/scgi_params | 配置文件       | cgi配置相关，fastcgi配置                   |
| /etc/nginx/koi-utf<br/>/etc/nginx/koi-win<br/>/etc/nginx/win-ut | 配置文件       | 编码转换映射转化文件                       |
| /etc/nginx/mime.types                                        | 配置文件       | 设置http协议的Content-Type与扩展名对应关系 |
| /usr/lib/systemd/system/nginx-debug.service<br/>/usr/lib/systemd/system/nginx.service<br/>/etc/sysconfig/nginx<br/>/etc/sysconfig/nginx-debug | 配置文件       | 用于配置出系统守护进程管理器管理方式       |
| /usr/lib64/nginx/modules<br/>/etc/nginx/modules              | 目录           | Nginx模块目录                              |
| /usr/sbin/nginx<br/>/usr/sbin/nginx-debug                    | 命令           | Nginx服务的启动管理的终端命令              |
| /usr/share/doc/nginx-1.12.0<br/>/usr/ share/doc/nginx- 1.12.0/COPYRIGHT<br/>/usr/ share/man/man8/nginx.8.gz | 文件、目录     | Nginx的手册和帮助文件                      |
| /var/cache/nginx                                             | 目录           | Nginx的缓存目录                            |
| /var/log/nginx                                               | 目录           | Nginx的日志目录                            |



### 默认配置语法

|                  | 解释                        |
| ---------------- | --------------------------- |
| user             | 设置nginx服务的系统使用用户 |
| worker_processes | 工作进程数                  |
| error_log        | nginx的错误日志             |
| pid              | nginx服务启动时候pid        |

events 模块

|                    | 解释                   |
| ------------------ | ---------------------- |
| worker_connections | 每个进程允许最大连接数 |
| use                | 工作进程数             |



```
http {
  ... ...
  server {
    listen      80;
    server_name localhost;
    location / {
    	root /usr/share/nginx/html;
    	index index.html index.htm;
    }
    error_ page 500 502 503 504 /50x. html;
    location = /50x.html {
    	root /usr/share/nginx/html;
    } 
  }
  server {
  	...
  }
}
```



### nginx log 配置

tip: `nginx -t -c /etc/nginx/nginx.conf` 来检查配置格式是否正确。

- 2-13 Nginx日志_log_format1
- 2-14 Nginx日志_log_format2

PS: 这两张讲述了日志的配置及其nginx的内置日志变量