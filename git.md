#git
[toc]
## 界面化
>sourceTree
## 初始配置
>`git config --list` 查看配置
>`git config --global user.name`用户名
>`git config --global user.email`邮箱
>`~/Desktop`   ~代表当前系统的路径
##  webstorm破解码
>http://idea.iteblog.com/key.php
##英语
>discard放弃
### 初始化
>`mkdir 目录名字`
>`cd 目录名字`
>`touch 文件名字`
>`cat 文件名字` 查看文件内容
>`mkdir test-git && cd test-git`
>`ls -al`查看所有文件，包含隐藏文件
>window默认不支持创建点开头的文件
### 查看状态
>`git status`
>红色表示没有在暂存区中
>绿色表示已经在暂存区
### 查看历史记录
>`git log` 显示提交的历史记录
>`git log --oneline` 显示简短的历史记录
>`git reflog` 查看所有历史版本
### 查看不同
>`git diff`  工作区和暂存区比
>`git diff --cached` 暂存区和历史区
>`git diff master` 工作区和历史区
### 版本回滚
>`git checkout 文件名` ，从暂存区将工作区覆盖掉
>`git reset HEAD 文件名或者点` 删除本次暂存区的提交
>`git reset --hard HEAD^` 退到上一个版本
>`git reset --hard 版本号id`，选择某个版本进行回滚操作
### 分支
>`git branch` 查看当前分支,和所有分支
>`git branch 分支名字` 建立分支 ，刚创建出来和master一样
>`git checkout 分支名字`切换分支
>`git branch -D 分支`删除分支 不能在本分支删除自己
>`git checkout -b 分支名字`创建并切换
>`git merge 分支名字`主分支合并副分支  快速前进 快速合并
### 创建gitignore必须在add之前创建
>`.idea`
>`node_modules`
### 将内容提交到某个分支
>默认我们的代码是放在工作区的，不属于任何分支，只有提交到某个分支上，此文件才归属于特定的分支
### fast-forward快速合并
>主干没有任何更新
>分支提交了新的代码
>将主干的指针快速指向到分支最新的代码即可
### conflict冲突
>合并多个分支可能合并的内容会产生冲突
>手动查看合并的文件，并解决冲突 然后 提交最新的结果
## 提交到远程仓库
### 建立文件
>README.md
>.gitigmore
### 查看远程仓库
>`git remote -v`查看关联的所有的仓库
>`git remote add 仓库地址的别名 仓库的地址`
>`git push origin master` 将master推送到origin上
### 部署静态网页
>只能通过git地址访问，只能放静态文件
>1.需要一个特定的分支（gh-pages）
>2.将代码推送到这个分支上
>在github该项目的setting上可以找到访问的网址
### 本地和线上版本不一致
>线上比线下版本新 `git pull 仓库别名 仓库地址分支`
## 代码合并请求管理提交的笔记
>`fork` 将别人的代码当前的状态，克隆一份放到自己的仓库上，一个项目只能fork一次，代码更新不会导致我的fork的代码更新
>`clone` 克隆是将线上的项目拉取到本地，拉下来就是git仓库，而且已经添加好了远程仓库的地址   `git clone 地址 自己的文件夹名字`
## 提交信息
>1.`git clone 自己fork的项目地址`
>2.`添加内容 dit add .  git commit -m "日志 git push origin master"`
## 再次提交
>将自己的内容放进去
>`git remote add teaher 地址`
>`git pull teacher master`
>`git push origin master`


>个人关于对git remote的理解
>git remote add origin 远程仓库地址  是将远程仓库和本地仓库关联起来 origin是这个仓库的别名，也是git默认的主仓库，我们对一个项目的操作都是基于这个仓库的某个分支。当我们再次使用上面的命令去关联其他仓库的时候，要给其他仓库B起一个别名，B可能也有多个分支，我们去下拉B仓库的某个分支，那个分支的代码就会合并到我本地仓库，当前工作区也会被合并，此时我们的远程分支还没更新，我们可以用`git push origin master`去更新我们的远程主仓库，这样三个仓库就会一样。
当然，我们在本地修改后，首先推送到本地仓库，然后在可以推送到远程仓库，两个远程仓库都可以推动，只需要注意仓库的名字和分支，例如如果我们当前处在本地仓库的开发分支上面，我们可以将它推送到远程仓库的开发分支上，两个仓库都可以提交。
关联多个仓库的目的其实是为了本地 远程仓库1 和远程仓库2的内容同步，三个仓库的内容是有一定的关联性的，甚至完全一样。本地仓库和远程主仓库是紧密相连的，分支一摸一样，但是另一个远程仓库不一定和本地的分支一摸一样，所以我们在推拉代码的时候，一定注意加上分支的名字。例如，`git pull leader master`只是将leader仓库的主分支代码拉下来，和当前分支合并，当前分支一定要是主分支才可以，也就是远程仓库的主分支代码被拉取下来，并且会和本地仓库的主分支进行合并，当前工作区的内容也会发生改变。
在本地仓库操作时，拉取主仓库内容，当前分支只能拉取当前分支的内容，不可以拉取别的分支，并且必须加上仓库别名和分支名，如果不加就会报错。同理上传的时候也要加上仓库别名和分支名，当前分支可以推送别的分支的内容，前提是加了仓库别名和分支名。
总之需要记住我们本地的仓库，里面有n个分支，我们可以设置在哪个分支下面进行操作，工作区的内容也就是这个分支的。远程的仓库可以看做是我们的资源仓库或者备用仓库，重点是本地的仓库一定要处理好。
还有就是在推送代码之前，一定要拉取远程仓库的代码。切记。