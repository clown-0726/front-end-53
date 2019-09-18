## find命令

语法格式：find [路径] [选项] [操作]

| 选项                 | 含义                                    |
| -------------------- | --------------------------------------- |
| -name                | 根据文件名查找                          |
| -perm                | 根据文件权限查找                        |
| -prune               | 该选项可以排除某些查找目录              |
| -user                | 根据文件属主查找                        |
| -group               | 根据文件属组查找                        |
| -mtime -n \| +n      | 根据文件更改时间查找                    |
| -nogroup             | 查找无有效属组的文件                    |
| -nouser              | 查找无有效属主的文件                    |
| -newer file1 ! file2 | 查找更改时间比file 1新但比file2旧的文件 |
| -type                | 按文件类型查找                          |
| -size -n +n          | 按文件大小查找                          |
| -mindepth n          | 从n级子目录开始搜索                     |
| -maxdepth n          | 最多搜索到n级子目录                     |

 

#### 重点介绍 `-exec`

格式：`-exec 'command' {} \`

> -ok 和-exec功能一样，唯一区别就是每次对文件操作都给用户提示询问用户是否继续操作

Example:

```bash
# {} 表示前面查到的所有结果
# 在/etc目录下查找文件名以conf结尾的文件并删除它们
find ./etc -name '*.conf' -exec rm -rf {} \;

# 查到到/etc目下下所有文件大小大于1M的并复制到test_5目录下
find ./etc -size +1M -exec cp {} ./test_5/ \;

# 删除七天之前的文件
find /var/log/ -name "*.log" -mtime +7 -exec rm -rf {} \;

# 可以使用逻辑运算符
-a 与
-o 或
-not 非
```



## find, locate, whereis 和 which 总结

#### locate

- 文件查找命令,所属软件包mlocate

- 不同于find命令是在整块磁盘中搜索，locate命令在数据库文件中查找

  > 由于locate查找的数据包不是实时的，我们可以先执行`/var/lib/mlocate/mlocate.db`来更新查找数据库

- find是默认全部匹配, locate则是默认部分匹配

  > 所使用的配置文件 `/etc/updatedb.conf`

#### whereis

一般用于查找二进制程序文件或帮助文档

| 选项 | 含义               |
| ---- | ------------------ |
| -b   | 只返回二进制文件   |
| -m   | 只返回帮助文档文件 |
| -S   | 只返回源代码文件   |

#### which

仅查找二进制程序文件