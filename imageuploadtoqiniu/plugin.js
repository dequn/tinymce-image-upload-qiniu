/**
 *plugins.js
 *
 *Released under MIT License.
 *Copyright (c) 2014-2015 www.friendsbt.com. All rights reserved.
 *
 */
tinymce.PluginManager.add('imageuploadtoqiniu', function(editor) {

  //uploader的设置请参考七牛官方文档，根据需要修改参数
  var initUploader = function() {
    Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: 'image-pick',
      uptoken: '3rer6DB4jKt2CqSVzBjNmAC3NQe4s_LkK5PuOB4s:0ztBdZ1REnoVwrDqJCjsL61FIfU=:eyJzY29wZSI6InhpYW95dWFueGluZ2tvbmciLCJkZWFkbGluZSI6MTQ0NDQyNDEyMCwicmV0dXJuQm9keSI6IntcImtleVwiOiQoa2V5KSxcImhhc2hcIjokKGV0YWcpLFwibmFtZVwiOiQoZm5hbWUpfSJ9',
      domain: 'http://7xjkhy.dl1.z0.glb.clouddn.com/',
      max_retries: 3,
      auto_start: true,
      init: {
        'FileUploaded': function(up, file, info) {
          var domain = up.getOption('domain');
          var res = jQuery.parseJSON(info);
          var sourceLink = domain + res.key;
          $('#image-url').val(sourceLink);
        },
      }
    });
  };

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
