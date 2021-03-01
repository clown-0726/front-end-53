### 一个例子仓库合并的例子

假设本地的分支要合并到远程github的分支，由于两个分支都有master，因此必须要做master的合并，当在本地执行完增加远程分支引用和设置本地master分支的上游为远端分支之后，我们执行pull会自动帮我们fast-forward。我们知道pull就是fetch+merge的集成，我们分布去看，先执行fetch则会先在本地得到一个orgin/master分支指向远程分支，然后我们切换到本地的master分支执行merge`git merge origin/master`，这样就是直接pull操作的结果，结果会让新的commt产生两个祖先，一个是本地，另一个是远程的master。

如果fetch下来不做merge而是做rebase的话，效果则会不一样，会产生一个祖先而不是两个，具体不再这里讨论。都是分支的集成策略，如果选取看情况。

### 一些常见的工作场景 / 操作

- 比较暂存空间和HEAD的区别 `git diff --cached`

- 比较暂存空间和工作区的区别 `git diff <-- filename>`

- 比较不同提交的指定文件的差异 `git diff branch1 branch2 <-- filename>`

  > 这里注意，比较不同比较的不是分支，而是commit，如果用分支名的话其实比较的是分支指向的最新commit


### 分支集成策略

- Allow merge commits

  自动产生一个merge commit，然后将feature 合并到主干分支上，我们可以追踪到所有的commit

  TIPS: `git push -f origin master` 将master强制回退到上一个版本

- Allow squash merging

  把 feature 分支的commit  合成一个commit，提交到主干分支上，（不会有箭头从 feature 指向 主干，在图上），会生成新的merge commit

- Allow rebase merging

- 以master最新提交为rebase点，将特性分支 changes cherry-pick 到主干分支上（从master最新的指针开始cherry-pick）。

### rebase的交互操作
`git rebase -i 27d2f8146eabc` (27d2f8146eabc应该是要rebase操作的commit的父commit)

	> 修改老旧commit的message。
	>
	> 把连续的多个commit整理成1个。
	>
	> 把间隔的几个commit整理成1个。 
