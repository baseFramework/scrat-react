var meta = require('./package.json');

fis.config.set('name', meta.name);
fis.config.set('version', meta.version);
fis.config.set('project.exclude', 'node_modules/**');
fis.config.set('framework', {
    debug: false,
    cache: false,
    urlPattern: '/c/%s',
    comboPattern: '/co??%s',
    alias: {
        config: 'config',
        underscore: 'component_modules/jashkenas-underscore/1.6.0/underscore.js',
    }
});

fis.config.set(
    'project.fileType.text',
    fis.config.get('project.fileType.text') + ', dom'
);
fis.config.set('modules.parser.jsx', 'react');
fis.config.set('modules.parser.dom', [addReactComment, 'react']);
function addReactComment(content){
    return '/** @jsx React.DOM */\n' + content.replace(/class\=/g, 'className=')
                                                .replace(/<!--(?!\[)([\s\S]*?)(-->|$)/g, '')
}
fis.config.get('roadmap.path').unshift({
    reg: '**.dom',
    isJsLike: true,
    useOptimizer: false,
    release: false
}, {
    reg : 'views/**.ejs',
    isHtmlLike : true,
    isViews : true
}, {
    reg : /^\/components\/(.*)\.jsx$/i,
    id: '${name}/${version}/$1.js',
    isJsLike: true,
    isMod: true,
    isComponent: true,
    useHash: false,
    url : '${urlPrefix}/c/${name}/${version}/$1.js',
    release : '/public/c/${name}/${version}/$1.js'
});