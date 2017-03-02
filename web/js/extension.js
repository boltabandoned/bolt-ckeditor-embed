var ckAdditionalExternalPlugins = typeof ckAdditionalExternalPlugins === 'undefined' ? {} : ckAdditionalExternalPlugins;
var ckAdditionalConfigs = typeof ckAdditionalConfigs === 'undefined' ? {toolbar: []} : ckAdditionalConfigs;
var CkEditorReplaced = typeof CkEditorReplaced === 'undefined' ? [] : CkEditorReplaced;

(function(){
    var scripts = document.getElementsByTagName('script');
    var embedconfig = JSON.parse(scripts[scripts.length-1].dataset.config);
    var path = scripts[scripts.length-1].src.split('?')[0];
    var mydir = path.split('/').slice(0, -1).join('/')+'/';

    ckAdditionalExternalPlugins = $.extend(true, {
        'embed': mydir + '/embed/plugin.js',
        'embedbase': mydir + '/embedbase/plugin.js',
        'notification': mydir + '/notification/plugin.js',
        'notificationaggregator': mydir + '/notificationaggregator/plugin.js',
        'clipboard': mydir + '/clipboard/plugin.js',
        'dialog': mydir + '/dialog/plugin.js',
        'dialogui': mydir + '/dialogui/plugin.js',
        'widget': mydir + '/widget/plugin.js',
        'widgetselection': mydir + '/widgetselection/plugin.js'
    }, ckAdditionalExternalPlugins);

    ckAdditionalConfigs.toolbar.push({
        name: 'Embed',
        items: ['Embed'] 
    });

    ckAdditionalConfigs.embed_provider = embedconfig.provider;

    $(document).ready(function(){
        if (typeof(CKEDITOR) != 'undefined') {
            CKEDITOR.on('instanceReady',function(event, instance){
                if (CkEditorReplaced[event.editor.name]) {
                    return;
                }
                var config = event.editor.config;
                CKEDITOR.instances[event.editor.name].destroy();
                for (var pluginName in ckAdditionalExternalPlugins) {
                    CKEDITOR.plugins.addExternal(pluginName, ckAdditionalExternalPlugins[pluginName]);
                }
                for (var additionalConfig in ckAdditionalConfigs) {
                    if(config[additionalConfig].constructor === Array){
                        config[additionalConfig] = config[additionalConfig].concat(ckAdditionalConfigs[additionalConfig]);
                    }else{
                        config[additionalConfig] = ckAdditionalConfigs[additionalConfig];
                    }
                }
                config.extraPlugins += ',' + Object.keys(ckAdditionalExternalPlugins).join(',');
                CKEDITOR.replace(event.editor.name, config);
                CkEditorReplaced[event.editor.name] = true;
            });
        }
    });
})();