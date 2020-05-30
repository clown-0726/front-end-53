我不是键盘党的推崇者，也不是鼠标党的拥护者，存在即合理，这么多年鼠标和键盘能保持持久的关系，是经过无数磨练的。
其实我们要做的就是如果将两者配合好，有些操作键盘可以做到事半功倍，但是有些操作离开鼠标其实就是抬杠（这里鼠标包括了mac上的触摸板）。
但是我们一定要有geek的精神，在编程过程中能少做一次操作，就绝对不做。这样在日久的学习和体验中一定可以舞出自己曼妙的编程舞姿。
就如同我们通俗上的学习科目一样，IDE/编辑器工具的使用也是一门学问，我们要做到烂记于心那些通识操作（0 - 60%），掌握那些高级操作（60% - 80%），对于剩下的20%，那就是仁者见仁智者见智了。

通识操作：

高级操作：

神仙操作：

--------

## Windows 和 MAC 之间的控制转换

- Ctrl/Cmd : Control / Command 意思其实是一样的
- Alt/Option : Alternative / option 意思其实是一样的
- Shift/Shift : 略

## 一定要学会的多光标(multi Cursor Mode)特性

- Ctrl + D
- Alt/Option + Shift + I: 在选中的文本中每行的后面添加一个光标。

## 如何快速在文件、符号、代码之间跳转

- 文件跳转：ctrl(cmd) + p , 找到文件按下ctrl(cmd) + Enter会在一个新的窗口中打开
- 行跳转：ctrl(cmd) + g
- 文件内跳转，不仅仅有搜索 ctrl(cmd) + shift + o 开头写@可以在当前文件大纲之间跳转
- 定义 (Defnition) 和实现 (implementation) 跳转
- 使用F12 和 ctrl(cmd) + F12 实现定义和实现之间的相互跳转，ts可以，但是js定义和实现却是相同的这个不太好用。

## 玩转鼠标操作

- 鼠标点击行号并上下拖拽可以完成多行选择
- 鼠标进行复制粘贴（按住ctrl拖动就是复制），这根本就是通识操作

## 光标在文档的移动粒度

1. 你只需按下Option（Windows 上是 Ctrl 键）和左方向键。相反，如果要把光标移动到单词的末尾，只需要按下 Option 和右方向键就好了。
   同时按下shift键，就可以将移动变成选中了。
2. 当你把光标放在花括号上时，只需按下 Cmd + Shift + \（Windows 上是 Ctrl + Shift + \），就可以在这对花括号之间跳转。
3. 删除单词内的字符与此类似。假设把光标放在第一行第四个字符 c 的后面。Option 加左方
   向键把光标移动到 function 这个单词的开头，Option加左方向键再加 Shift 即可选中 func
   这四个字符，而Option 加 Delete 则会删除 func 这四个字符。这里你可能看出来了，这些快
   捷键共同的是 Option 键，然后通过按下 Shift 或者 Delete 键，来达到不同的效果

## 两个维度

- 光标的移动，文本的选择 ==> 不同的组合可以组合成一个“事务”

- ctrl + shift + k : 删除当前行

- 这个功能对应的快捷键非常好记，它跟 “Enter”键十分接近。当你想在当前行的下面新开始一行时，你
  只需按下 “Cmd + Enter” （Windows 上是 “Ctrl + Enter”）；而当你想在当前行的上面新开始一行时，
  你只要按下 “Cmd + Shift + Enter” （Windows 上是 “Ctrl + Shift + Enter”）就行了。

- 按住“Option + 上下方向键”（Windows中就是“Alt + 上下方向键”） ，将当前行，或者当前选中的几行代
  码，在编辑器里上下移动。

- 如果你同时按住 “Shift” 键的话，也就是 “Option + Shift + 上下方向键”（Windows中就是“Alt + shift +
  上下方向键”），那就可以复制这几行，然后粘贴到当前行的上面或者下面。

## 代码自动补全、快速修复和重构的二三事

- 自动补全/智能提示：
  	快捷键：Ctrl/Cmd + 空格键
  	关键字：quickSuggestions	
- 快速预览：
  	快捷键：Ctrl/Cmd + Shift + Space
  	关键字：parameterHints
- 快速修复：
  	快捷键：Ctrl/Cmd + .
- 重构：
  	快捷键：选中方法名，安装f2进行方法名修改（这个不同于全局替换）
  	选中一段话，左边出现的黄色小灯泡可以用来进一步方法抽取等重构

## 一定要用好代码折叠、小地图和面包屑特性

- 可折叠代码：Ctrl + Shift + [ / Cmd + Option + [
  					Ctrl + Shift + ] / Cmd + Option + ]
- 基于语言定义的代码折叠，VSCODE给用户提供了接口
  小地图：
  面包屑：

## 如何配置终端模拟器，告别系统终端

- 默认情况下，在 Windows 10 上我们会使用 PowerShell，而如果是 Win 10 以下的版本那么默认的 Shell 则会是 Cmd。macOS 和 Linux 下VS Code 会检测你的默认 Shell 是什么，比如在我的系统上，我就是使用 Zsh，而如果没有找到的话，终端则会使用 Bash 或者 sh 作为启动时的 Shell 环境。
- terminal.integrated.shell.windows、terminal.integrated.shell.osx 或者 terminal.integrated.shell.linux，这个设置的值就是你想要使用的 Shell 在系统上的路径。
- Shell 脚本传入参数: terminal.integrated.shellArgs.linux 修改为 -l 来实现
- 终端设置就是环境变量: 使用terminal.integrated.env.osx、terminal.integrated.env.linux 或者 terminal.integrated.env.windows 来控制集成终端创建 Shell 时，该使用哪些特殊的环境变量
- 控制终端最大保留的log：terminal.integrated.scrollback