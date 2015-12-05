# tinymce-image-upload-qiniu
一款用于将图片上传到七牛空间的tinymce插件

## 安装
复制imageuploadtoqiniu文件夹到tinymce/js/plugins/目录下边

```
tinymce.init({
plugins:['imageuploadtoqiniu'],
toolbar:'image'

})
```
## 配置
    imageuploadtoqiniu/plugin.js文件，需要按照七牛官方文档配置uploader

## 注意
    图片要能从七牛服务器上获取，请设置对应的上传bucket空间为公有空间，下载文件不需要token才行！
