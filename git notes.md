### GIT是基于commit的！！！一个tag最终指向的的是一个commit，一个branch上可以有多个commit。

### author 和 commiter的区别：
author是文件是谁创建的，commiter是谁修改后提交的。

### commit tree blob之间的关系：
commit 对应一棵树（tree, 里面对应文件的索引），每个文件就是blob（blob和文件名没有关系，只要内容不变，git就认为是一个文件）

![](https://s2.ax1x.com/2019/12/27/lVurqJ.md.png)

### 增加远端地址和关联上游分支

- `git remote add yuanduan file:///path/yuanduan.git` 感觉平时clone一个仓库之后其远端的名字就默认是origin，相当于这里的的yuanduan
- `git push --set-upstream yuanduan branch-name` 设置上游的分支
- 你可以通过第一个命令让在当前的仓库增加其他仓库的引用，之后就可以用第二个命令让本地的仓库的分支指向某个仓库的分支了。

### 一个例子仓库合并的例子

假设本地的分支要合并到远程github的分支，由于两个分支都有master，因此必须要做master的合并，当在本地执行完增加远程分支引用和设置本地master分支的上游为远端分支之后，我们执行pull会自动帮我们fast-forward。我们知道pull就是fetch+merge的集成，我们分布去看，先执行fetch则会先在本地得到一个orgin/master分支指向远程分支，然后我们切换到本地的master分支执行merge`git merge origin/master`，这样就是直接pull操作的结果，结果会让新的commt产生两个祖先，一个是本地，另一个是远程的master。

如果fetch下来不做merge而是做rebase的话，效果则会不一样，会产生一个祖先而不是两个，具体不再这里讨论。都是分支的集成策略，如果选取看情况。

### 分离头指针状态（Detached HEAD）

一般情况下，HEAD都是指向某个branch的。

但是当我们在Detached HEAD状态的时候，我们仍然可以做commit，但是当我们切换到其他分支的时候，这些新的commit就会消失，被git当作垃圾清理掉。

因此从Detached HEAD切换到正常分支的时候，一定要记得建立一个新的分支。

分离头指针状态就是我们的变更没有基于某个branch去做。

### 一些常见的工作场景 / 操作

- 比较暂存空间和HEAD的区别 `git diff --cached`

- 比较暂存空间和工作区的区别 `git diff <-- filename>`

- 放弃掉最近的一些 commit 即回复到某一个状态 `git reset --hard <12xsd23dw>`

- 查看不同提交的指定文件的差异 `git diff branch1 branch2 <-- filename>`

  > 这里注意，比较不同比较的不是分支，而是commit，如果用分支名的话其实比较的是分支指向的最新commit 

- git删除文件 `git rm filename`

- git stash

  > `git stash`: 将工作区的文件暂时存储
  >
  > `git stash list`: 查看有哪些stash
  >
  > `git stash apply/pop` 将stash中的文件弹出，当弹出后，apply不会删除stash中的内容，pop会删除stash的内容。

- git log 命令：`git log -n4 --online --all --graph`

- git重命名：`git mv name1 name2`

- 查看本地有多少分支：`git branch -v`

- 对最近一次提交的message做变更：`git commit --amend`

- 越过临时空间直接提交：`git commit -am"without go to temp space"`

- git push -f 危险禁止命令

  `git push -f origin b3bf033:master` 在本地强制将远程分支“恢复”到某一个提交状态。

  `git reset --hard hashcode`

### 选择自己团队的工作流

考虑因素：团队人员的组成，研发设计能力，输出产品的特性，项目的难易程度

主干开发：google 使用

特性开发：git flow， github flow，gitLab flow（带生产分支），GitLab Flow（带环境分支），Gitlab Flow（带发布分支）

![](https://s2.ax1x.com/2020/01/07/lyXWUs.md.png)

![](https://s2.ax1x.com/2020/01/07/lyXWUs.md.png)

![](https://s2.ax1x.com/2020/01/07/lyX4Cq.md.png)

![](https://s2.ax1x.com/2020/01/07/lyX580.md.png)

![](https://s2.ax1x.com/2020/01/07/lyXI2V.md.png)

![](https://s2.ax1x.com/2020/01/07/lyX7KU.md.png)

### 分支集成策略

- Allow merge commits

  自动产生一个merge commit，然后将feature 合并到主干分支上，我们可以追踪到所有的commit

  TIPS: `git push -f origin master` 将master强制回退到上一个版本

- Allow squash merging

  把 feature 分支的commit  合成一个commit，提交到主干分支上，（不会有箭头从 feature 指向 主干，在图上），会生成新的merge commit

- Allow rebase merging

- 以master最新提交为rebase点，将特性分支 changes cherry-pick 到主干分支上（从master最新的指针开始cherry-pick）。

### 协同合作的时候

日常开发中，当其他人在远程分支上做了提交之后，自己常用git pull 来同步远程分支。其实这个git pull包含两步，第一步是git fetch，这个时候是将远程分支的最新提交拿到本地，第二部就是将拿下来的这个最新分支merge到本地分支。 

如果不同人同时修改了同一个文件的文件名，那么git会保留所有被修改文件名的副本，并且删除源文件，由所有修改者协商判断保留哪一个文件名。

### rebase的交互操作
`git rebase -i 27d2f8146eabc` (27d2f8146eabc应该是要rebase操作的commit的父commit)

	> 修改老旧commit的message。
	>
	> 把连续的多个commit整理成1个。
	>
	> 把间隔的几个commit整理成1个。 

### github tips

- github 高级搜索： `git keyword in:readme stars:>1000 filename:.gitlab-ci.yml`