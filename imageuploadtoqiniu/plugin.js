tinymce.PluginManager.add('imageuploadtoqiniu', function(editor) {

  var initUploader = function() {
    Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: 'image-pick',
      uptoken_url: '/fetch_token?img=1',
      domain: 'http://7xjkhy.dl1.z0.glb.clouddn.com/',
      max_retries: 3,
      auto_start: true,
      init: {
        'FileUploaded': function(up, file, info) {
          var domain = up.getOption('domain');
          var res = jQuery.parseJSON(info);
          var sourceLink = domain + res.key;
          $('#img-state').text('上传完成!').show();
          $('#image-url').val(sourceLink);
        },

        'UploadProgress': function(up, file) {
          if (file.status === plupload.UPLOADING) {
            $('#img-state').text('正在上传  ' + file.percent + '%').show();
          } else {

            $('#img-state').text('正在尝试上传...').show();
          }
        },
        'Error': function(up, err, errTip) {
          $('#img-state').text('上传出错,请重试！').show();
        },
        //'UploadComplete': function(up, file) {
        //  $('#img-state').text('上传完成').show();
        //}
      }
    });
  }

  var showDialog = function(editor) {
    editor.windowManager.open({
      title: 'Insert/edit image',
      body: [{
        id: 'image-url',
        type: 'textbox',
        name: 'url',
        label: 'Image URL'
      }, {
        type: 'button',
        text: 'Pick a image',
        name: 'image-pick',
        id: 'image-pick'
      }, {
        type: 'label',
        text: '请输入图片地址或从本地选择上传!',
        id: 'img-state',
        //style: 'display:none !important;height:30px;'
      }],
      onsubmit: function(e) {
        onSubmit(editor);
      }
    });
    initUploader();
  };
  var onSubmit = function(editor) {
    editor.insertContent('<img src="' + $('#image-url').val() + '"/>');
  };


  editor.addButton('image', {
    icon: 'image',
    tooltip: 'Insert/edit image',
    onclick: function() {
      showDialog(editor);
    }
  });

  editor.addMenuItem('image', {
    icon: 'image',
    text: 'Insert/edit image',
    context: 'insert',
    onclick: function() {
      showDialog(editor);
    },
    prependToContext: true
  });
});
