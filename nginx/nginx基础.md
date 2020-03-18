

## 简介

nginx是一个高性能的、可靠的http中间件、代理服务。类似的中间件服务还有httpd，GWS（Google），IIS。

## 为什么选用nginx

1. 采用IO多路复用 epoll 技术。（这里涉及操作系统的IO模型）

2. 轻量级（功能模块少，代码模块化，core中只保留最核心的代码，其他以插件形式提供）

3. CPU亲和（affinity）

   是一种把CPU的核心和Nginx工作进程绑定方式，把每个worker进程固定在一个CPU上执行，减少切换CPU的cache miss，获得更好的性能。

4. 一般服务器发送静态文件时，当拿到静态文件之后要将其经过操作系统的内核空间和用户空间，才能到达socket。而nginx直接采用sendfile模式发送静态文件，只需要经过内核空间即可，因此很快。

   ![](https://s2.ax1x.com/2020/02/13/1bx7ad.md.png)

## 安装工作目录详解

rpm -ql nginx

| 路径                                                         | 类型           | 作用                                                         |
| ------------------------------------------------------------ | -------------- | ------------------------------------------------------------ |
| /etc/logrotate.d/nginx                                       | 配置文件       | Nginx日志轮转,用于logrotate服务的日志切割                    |
| /etc/nginx<br/>/etc/nginx/nginx.conf<br/>/etc/nginx/conf.d<br/>/etc/nginx/conf.d/default.conf | 目录、配置文件 | Nginx主配置文件                                              |
| /etc/nginx/fastcgi_params<br/>/etc/nginx/uwsgi_params<br/>/etc/nginx/scgi_params | 配置文件       | cgi配置相关，fastcgi配置                                     |
| /etc/nginx/koi-utf<br/>/etc/nginx/koi-win<br/>/etc/nginx/win-ut | 配置文件       | 编码转换映射转化文件                                         |
| /etc/nginx/mime.types                                        | 配置文件       | 设置http协议的Content-Type与扩展名对应关系<br/>（文件扩展名和自身类型是需要映射关系的） |
| /usr/lib/systemd/system/nginx-debug.service<br/>/usr/lib/systemd/system/nginx.service<br/>/etc/sysconfig/nginx<br/>/etc/sysconfig/nginx-debug | 配置文件       | 用于配置出系统守护进程管理器管理方式                         |
| /usr/lib64/nginx/modules<br/>/etc/nginx/modules              | 目录           | Nginx模块目录                                                |
| /usr/sbin/nginx<br/>/usr/sbin/nginx-debug                    | 命令           | Nginx服务的启动管理的终端命令                                |
| /usr/share/doc/nginx-1.12.0<br/>/usr/share/doc/nginx- 1.12.0/COPYRIGHT<br/>/usr/share/man/man8/nginx.8.gz | 文件、目录     | Nginx的手册和帮助文件                                        |
| /var/cache/nginx                                             | 目录           | Nginx的缓存目录                                              |
| /var/log/nginx                                               | 目录           | Nginx的日志目录                                              |

## 安装编译参数

用 `nginx -V` 查看

## 默认配置语法及三大模块介绍 (nginx.conf  + nginx.conf.d/*) 

三大模块之模块一，全局配置模块

|                  | 解释                                              |
| ---------------- | ------------------------------------------------- |
| user             | 设置nginx服务(worker)的系统使用用户，一半保持默认 |
| worker_processes | 工作进程数，一般和CPU数量保持一致                 |
| error_log        | nginx的错误日志                                   |
| pid              | nginx服务启动时候pid                              |

三大模块之模块二，events 模块

|                    | 解释                                                         |
| ------------------ | ------------------------------------------------------------ |
| worker_connections | 每个进程允许最大连接数，一般10000个左右满足大多数企业要求    |
| use                | 工作进程数，定义选用哪种内核模型（linux常用select，poll, epoll） |

三大模块之模块三，每个 server 模块

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
    
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    	root /usr/share/nginx/html;
    } 
  }
  
  server {
  	...
  }
}
```

- listen 端口，server_name 配置主机名，默认localhost，如果有虚拟主机则配置虚拟主机ip or 虚拟主机名。
- location, error_page 其实就是路由配置。

## nginx 安装编译参数

![](https://s2.ax1x.com/2020/02/13/1qeb2F.md.png)

![](https://s2.ax1x.com/2020/02/13/1qmC8O.md.png)

![](https://s2.ax1x.com/2020/02/13/1qmeat.md.png)

![](https://s2.ax1x.com/2020/02/13/1qmmIP.md.png)

![](https://s2.ax1x.com/2020/02/13/1qmJZn.md.png)

## nginx log 配置

tip: `nginx -t -c /etc/nginx/nginx.conf` 来检查配置格式是否正确。

- 2-13 Nginx日志_log_format1
- 2-14 Nginx日志_log_format2

PS: 这两张讲述了日志的配置及其nginx的内置日志变量

## Nginx 变量

HTTP请求变量： arg_PARAMETER, http_HEADER, sent_http_HEADER

内置变量：Nginx内置的

自定义变量：自己定义的

## Nginx 模块

### Nginx官方模块

`nginx -V` 打印出的编译参数中带有 `--with`的就是相应的各个模块

| 编译选项                       | 作用                        |
| ------------------------------ | --------------------------- |
| --with-http_stub_status_module | Nginx的客户端状态及连接信息 |

配置语法：

```nginx
Syntax: sub_status
Default: -
Context: server, location
```

例子：

```nginx
location /mystatus {
    stub_status;
}
```



Tips: 语法检查 `nginx -tc /etc/nginx/nginx.conf`

| 编译选项                        | 作用                               |
| ------------------------------- | ---------------------------------- |
| --with-http_random_index_module | 目录中选择一个随机主页（很少用到） |

配置语法：

```nginx
Syntax: random_index on | off;
Default: random_index off;
Context: location
```

例子：

```nginx
location / {
    root /usr/share/nginx/html;
    random_index on;
}
```



| 编译选项               | 作用                     |
| ---------------------- | ------------------------ |
| --with-http_sub_module | HTTP内容替换（很少用到） |

配置语法：

```nginx
Syntax: sub_filter string replacement;
Default: -
Context: http,server,location

Syntax: sub_filter_last_modified on | off;
Default: sub_filter_last_modified off;
Context: http,server,location

Syntax: sub_filter_once on | off;
Default: sub_filter_once on;
Context: http,server,location
```

例子：

```nginx
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    sub_filter '<a>abc' '<a>ABC'; # 将 <a>abc 替换为 <a>ABC
    sub_filter_once off; # 不仅仅替换第一个，而是替换所有匹配项
}
```

### 第三方模块

## Nginx的请求限制

- 连接频率限制 - limit_conn_module
- 请求频率限制 - limit_req_module

HTTP1.0时代TCP不能复用，HTTP1.1时代可以顺序性TCP复用，将来HTTP2.0时代会是多路复用TCP复用

连接限制配置语法：

```nginx
Syntax: limit_conn_zone key zone=name:size;
Default: -
Context: http

Syntax: limit_conn zone number;
Default: -;
Context: http,server,location
```

请求限制配置语法：

```nginx
Syntax: limit_req_zone key zone=name:size rate=rate;
Default: -
Context: http

Syntax: limit_req zone=name [burst=number] [nodelay];
Default: -;
Context: http,server,location
```



## Nginx 的访问控制

- 基于IP的访问控制 - http_access_module
- 基于用户的信任登录 - http_auth_basic_module

http_access_module配置语法：

```nginx
Syntax: allow address | CIDR | unix: | all;
Default: -
Context: http, server, location, limit_except

Syntax: deny address | CIDR | unix: | all;
Default: -;
Context: http, server, location, limit_except
```

http_access_module配置例子：

```nginx
location ~ ^/admin { # 模式匹配，表示以 “/admin” 开头的
    root /opt/app/code;
    allow 222.128.189.0/24; # 只允许这个IP段
    deny all; # 限制所有的访问
    index index.html index.htm;
}
```

http_access_module的控制局限性：在nginx中我们是通过`$remote_addr`这个变量做的访问控制，这个是上一层的IP地址，但是并不代表是真实用户的IP地址，比如用户通过VPN访问，或者在nginx之前还有一层代理服务，因此这种访问控制是带有局限性的。

x_forwarded_for是IP协议中头信息必须携带的，这个变量记录了每一次代理的IP地址。因此可以用http_x_forwarded_for做访问控制。

http_x_forwarded_for = Client IP, Proxy(1) IP, Proxy (2) IP

解决方法一：采用别的HTTP头信息控制访问，如：HTTP_X_FORWARD_FOR。

	> 并不是每个厂商会在在请求头中加入这变量
	> 这个也存在被篡改的风险

解决方法二：结合goe模块

解决方法三：通过HTTP自定义变量传递

http_auth_basic_module配置语法：

```nginx
Syntax: auth_basic string | off;
Default: auth_basic off;
Context: http, server, location, limit_except

Syntax: auth_basic_user_file file;
Default: -;
Context: http, server, location, limit_except
```

http_auth_basic_module配置例子：

```nginx
location ~ ^/admin {
    root /opt/app/code;
    auth_basic "Auth access test!";
    auth_basic_user_file /etc/nginx/auth_conf;
    index index.html index.htm;
}
```

http_auth_basic_module的控制局限性：

1. 用户信息依赖文件方式
2. 操作管理机械，效率低下

解决：

1. nginx结合LUA实现高效验证
2. Nginx和LDAP打通，利用nginx-auth-ldap模块