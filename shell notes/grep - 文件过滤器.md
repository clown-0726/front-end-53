## grep 和 egrep

- 第一种形式：`grep [option] [pattern] [file1, file2]`
- 第二种形式：`command | grep [option] [pattern]`
- egrep 相当于 grep -E

| 选项 | 含义                                       |
| ---- | ------------------------------------------ |
| -v   | 不显示匹配行信息                           |
| -i   | 搜索时忽略大小写                           |
| -n   | 显示行号                                   |
| -r   | 递归搜索                                   |
| -E   | 支持扩展正则表达式                         |
| -F   | 不按正则表达式匹配，按照字符串字面意思匹配 |



```bash
grep -v python file

grep -vi python file

grep -n python file

# 匹配包含python或者PYTHON的行
grep -E "python|PYTHON" file

# 默认用正则表达式进行匹配的，注意.表示的是任意字符
grep "py.*" file

# 不实用正则表示，完全按照字面意思匹配
grep -F "py.*" file

# 在当前目录下递归搜索所有文件
grep -r love

# 显示一共有多少行匹配
grep -c python file
```

