# 通过HTML/JS画图

> Github链接：[Github](https://github.com/Steven-nagisa-Y/Canvas-drawing)



## 1.文件简介

- ！安装服务端.cmd：用于安装本地服务端环境；

- 运行服务端.cmd：已经有node.js环境，或者安装了上一步的环境之后，需要绘图请运行；

- Cn.json：用于输出Cn数据，请勿手动修改；

- drawpoints.json：示例图像的点集；

- index.html：展示图像的主页面；

- main.c：用于把点的坐标通过傅里叶变换，转换为Cn；

- main.exe：在`Windows 10 x64`环境编译好的main.c，输入为point.txt，输出为Cn.json；

- main.js：在网页画图的主要JavaScript脚本，输入为Cn.json；

- old.main.js：老版本的JavaScript脚本，能够获得任意绘图像的点集合（需要通过控制台）；

- node.msi：`Windows 10 x64`平台的Node.js安装包，若是其他平台，请前往[官网下载](https://nodejs.org/en/download/)；

- package.json：npm 包的描述文件，勿管；

- point.txt：输入的点的坐标，范围[0, 500]​格式为：

  `x1 y1 x2 y2 x3 y3 ...`

- server.js：通过node.js实现的本地服务器，用法：`node server.js`，退出请按 ctrl - c；





## 2.使用

### 1-安装本地服务环境

**如果你直接用浏览器打开index.html能够正常显示图像，请跳到第三步。**

新版浏览器禁止了页面在本地读取数据，所以只有采用在本地运行一个服务端来显示网页。

**Windows 10 x64**可直接双击运行**！安装服务端.cmd**，按照步骤安装即可。

安装一次后无需再次安装。



### 2-运行本地服务端

第二次运行可以在本目录下运行：**运行服务端.cmd**，然后通过浏览器打开：[http://localhost:4040](http://localhost:4040)



### 3-输入点集

在point.txt中输入点坐标集合，范围是[0, 500]​，格式为`x1 y1 x2 y2 x3 y3 ...`。

记住坐标的个数，**一组 x1 y1 算一个点**



### 4-通过傅里叶变换获得Cn

**Windows 10 x64**可直接运行：**main.exe**。

输入的第一个数据为：上述点集的个数；

输入第二个数据为：拟合圈的个数，建议范围：[20, 1000]，过大浏览器绘图卡顿。



### 5-查看图像

在老版本的浏览器中可以直接运行：**index.html**查看图像；

新版浏览器请保证已进行第一、第二步骤，在控制台看到：**Server running at http://localhost:4040**，之后，访问[http://localhost:4040](http://localhost:4040)即可查看绘图。



### 6-退出

关闭全部窗口即可退出。



## 3-开源协议

采用**Apache License 2.0**开源协议。
