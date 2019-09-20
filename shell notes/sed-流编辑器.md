## 介绍

sed(Stream Editor)，流编辑器。对标准输出或文件逐行进行处理。

## 语法格式

- 第一种形式: stdout | sed [option] "pattern command"
- 第二种形式: sed [option] "pattern command" file

解释一下，sed可以接受标准输入也可以直接去操作文件。"pattern command" 表示 pattern 匹配成功的行就进行command命令的处理。

## sed 选项

| 选项 | 含义                               |
| ---- | ---------------------------------- |
| -n   | 只打印模式匹配行                   |
| -e   | 直接在命令行进行sed编辑，默认选项  |
| -f   | 编辑动作保存在文件中，指定文件执行 |
| -r   | 支持扩展正则表达式                 |
| i    | 直接修改文件内容                   |



```bash
sed -n '/python/p' 123.txt
sed -n -e '/python/p' -e '/PYTHON/p' 123.txt
sed -n 's/love/like/g;p' 123.txt
```

