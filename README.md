# ImoocDownloader
这个分支是nodejs express 服务器版本。用来跟给前端查询反馈用。

## 介绍（Summary）

（命令行版本请见master分支）该版本用到了ES2015和ES2016的特性，所以务必保证node版本能在v6.x（生产环境在v7.4）

想着如果实现一个后端服务版本，然后我再使用前端框架实现界面。使用起来会比命令行舒服很多。所以这是一个服务端版本。直接运行然后查询可以得到相应的json数据。

对了，为了在半天内实现出来，粗糙但目的明显的小工具并不具备各种安全措施……

## 安装与使用（Install & Usage）

### 两种方法安装（Install）
1.  `git clone https://github.com/ColMugX/ImoocDownloader.git ./ImoocDownloader`
2.  `Download ZIP`
3.  `Open in Desktop`

(记得把分支切换到server下)
### 使用（Usage）

```shell
cd ./ImoocDownloader
npm install
npm run dev  #服务端启动，端口为6698
```