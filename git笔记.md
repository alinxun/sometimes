https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/

廖雪峰的git 教程


https://backlog.com/git-tutorial/cn/
猴子都能懂的git 教程

//创建版本库
git init  //创建版本库

//
git add addFile.txt //把文件添加到仓库  实际上就是把文件修改添加到暂存区；
git commit -m 'add a file' //把文件提交到仓库  实际上就是把暂存区的所有内容提交到当前分支
git reset --hard HEAD^ //回退
git reset --hard 8f2e //回退到指定的版本  8f2e  指定版本提交时生成的hash值
git log //查看日志 由近到远的提交日志
git log --pretty=oneline //只显示版本号跟 提交注释
git reflog  //查看命令历史 避免回退之后没有了相应的日志 这样就可以撤销相应的回退
git diff HEAD -- addFile.txt // 查看工作去和版本库里面最新版本的区别
git checkout -- readme.txt //撤销修改
//命令中的 -- 很重要，没有就变成了 切换到另一个分支
git rm rmfile.txt //删除文件

//远程仓库
git remote add origin git@github.com:alinxun/learngit.git //本地仓库关联远程仓库
git push -u origin master //本地库上的内容推送到远程库 -u 分支关联，后期可以简化命令
git push origin master //本地提交

git clone git@github.com:michaelliao/gitskills.git //克隆一个本地库


//分支管理
git checkout -b dev //创建dev 分支
//Switch to a new branch 'dev' //切换到dev 分支
git branch //查看当前分支
git checkout  dev 切换到dev 分支
git branch dev2 //创建dev2分支
git merge dev //合并指定分支到当前分支
git branch -d dev // 删除dev 分支
git log --graph  //查看分支合并图


//解决冲突  这里是一个冲突
//解决冲突 这里制造一个冲突c

//分支管理策略
git merge --no-ff -m "merge with no-ff" dev // 禁用fase forward


//bug 分支
git stash  //把当前工作现场储存起来，等以后回复现场后继续工作
git status

git stash list  //查看工作现场列表
git stash apply //恢复 
git stash drop //删除“现场”
git stash pop //恢复的同时删除

git branch -d feature-valcan //删除分支 （当保存有现场的时候是提示删除失败）
git branch -D feature-valcan //强制删除

//多人协作
git remote  //查看远程库的信息
git remote -v //显示更详细的信息

//推送分支
git push origin master 
git push origin dev //推送dev 分支

//抓取分支
git checkout -b dev origin/dev //创建远程 origin的dev分支到本地
git push origin dev //push dev 分支到远程

git branch --set-upstream dev origin/dev  指定本地dev 分支与远程origin/dev 分支的链接

git pull //推送

//标签
git tag  //显示已有标签列表
git tag v1.0  //添加标签v1.0
git tag v0.8  984d10f //对hash前缀984d10f 版本添加tag
git show v0.8 //查看标签信息

git tag -a v0.1  -m "asdf" //指定标签信息
git tag -s <tagname> -m "blablabla..." //可以用PGP签名标签；

git push origin <tagname>   //可以推送一个本地标签；
git push origin --tags      //可以推送全部未推送过的本地标签；
git tag -d <tagname>        //可以删除一个本地标签；
git push origin :refs/tags/<tagname>    //可以删除一个远程标签。