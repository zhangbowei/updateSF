## updatesf简介

作用：爬取指定用户的所有笔记索引 => 合成一篇文章的内容 => 发布/更新该文章

意义：解决Segmentfault的笔记需要用户手动翻页查询的问题。

## 配置说明

### 方式：输入参数

注：参数通过yargs.js解析。

```javascript
updatesf --user=??? --password=??? --nickname=??? --fileTitle=??? --fileTag=??? --fileCard=???


```

### 方式：环境变量

```
export SF_USER="???@???.com"
export SF_PASSWORD="???"
export SF_NICKNAME="???"
export SF_FILETITLE="???"
export SF_FILETAG='["???", "???"]'
export SF_FILECARD="??????"
```

## 参数含义

注：以环境变量配置方式为例。

SF_USER

`必填`：登录SegmentFault的用户名。

SF_PASSWORD

`必填`：登录SegmentFault的密码。

SF_NICKNAME

`必填`：个性网址 > 点击[编辑] > 显示的内容。

![](https://ww1.sinaimg.cn/large/006tNc79ly1ffg2e6kdeqj31c80eimyv.jpg)

SF_FILETITLE

`选填`：要发布文章的标题，默认值为  `"测试文章"`。

SF_FILETAG

`选填`:  要发布文章的标签，默认值为`'["javascript"]'`。

SF_FILECARD

`选填`： 空值，程序发布新文章；非空值，程序更新指定文章。(e.g `1190000007682744`)

![](https://ww3.sinaimg.cn/large/006tNc79ly1ffg2kulek8j30s201st93.jpg)

## 结果反馈

程序运行成功则输出`Status：200`。

![](https://ww3.sinaimg.cn/large/006tNc79ly1ffg2nm1e0lj30lw024t8v.jpg)

