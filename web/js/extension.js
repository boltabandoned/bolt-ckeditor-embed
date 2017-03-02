(function(){
    var scripts = document.getElementsByTagName('script');
    var embedconfig = JSON.parse(scripts[scripts.length-1].dataset.config);
    var path = scripts[scripts.length-1].src.split('?')[0];
    var mydir = path.split('/').slice(0, -1).join('/')+'/';
    var CKEDITORembedconfigInitialized = [];
    $(document).ready(function(){
        if (typeof(CKEDITOR) != 'undefined' ) {
            CKEDITOR.on('instanceReady',function(event, instance){
                if (CKEDITORembedconfigInitialized[event.editor.name]) {
                    return;
                }
                var config = event.editor.config;
                CKEDITOR.instances[event.editor.name].destroy();
                CKEDITOR.plugins.addExternal('embed', mydir + 'embed/plugin.js');
                CKEDITOR.plugins.addExternal('embedbase', mydir + 'embedbase/plugin.js');
                CKEDITOR.plugins.addExternal('notification', mydir + 'notification/plugin.js');
                CKEDITOR.plugins.addExternal('notificationaggregator', mydir + 'notificationaggregator/plugin.js');
                CKEDITOR.plugins.addExternal('clipboard', mydir + 'clipboard/plugin.js');
                CKEDITOR.plugins.addExternal('dialog', mydir + 'dialog/plugin.js');
                CKEDITOR.plugins.addExternal('dialogui', mydir + 'dialogui/plugin.js');
                CKEDITOR.plugins.addExternal('widget', mydir + 'widget/plugin.js');
                CKEDITOR.plugins.addExternal('widgetselection', mydir + 'widgetselection/plugin.js');
                config.extraPlugins += ',embed';
                config.embed_provider = embedconfig.provider;
                config.toolbar.push({
                    name: 'Embed',
                    items: ['Embed']
                });
                CKEDITOR.replace(event.editor.name, config);
                CKEDITORembedconfigInitialized[event.editor.name] = true;
            });
        }
    });
})()