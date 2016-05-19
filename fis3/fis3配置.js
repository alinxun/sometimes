//less   npm install -g fis-parser-less-2.x
fis.match('**/*.less', {
    rExt: '.css', // from .less to .css
    parser: fis.plugin('less-2.x', {
        // fis-parser-less-2.x option
    })
});


// sass  npm install -g fis-parser-node-sass
fis.match('**/*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        //fis-parser-node-sass option
    })
});


// js-min
fis.match('*.js', {
  useHash: false, // default is true
  // 指定压缩插件 fis-optimizer-uglify-js 
  optimizer: fis.plugin('uglify-js', {
    // option of uglify-js
  })
});


//css-min
fis.match('*.css', {
  useHash: false, //default is `true`
  // compress css invoke fis-optimizer-clean-css
  optimizer: fis.plugin('clean-css', {
    // option of clean-css
  })
});


// html-min  npm i fis-optimizer-html-minifier [-g]
fis.match('*.html', {
  //invoke fis-optimizer-html-minifier
  optimizer: fis.plugin('html-minifier')
});

//amd ************************************************************
// npm install [-g] fis3-hook-amd
// npm install [-g] fis3-postpackager-loader

// npm install [-g] fis3-hook-amd
fis.hook('amd');

fis.match('/comp/**/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    release: '/static/$0'
});

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true // 资源映射表内嵌
    })
})

// fis3 release prod 产品发布，进行合并
fis.media('prod')
    .match('*.js', {
        packTo: '/static/aio.js'
    });
//amd ************************************************************end

//mod ************************************************************
// npm install [-g] fis3-hook-commonjs
fis.hook('commonjs');

fis.match('/comp/**/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    release: '/static/$0'
});

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    })
})

// fis3 release prod 产品发布，进行合并
fis.media('prod')
    .match('*.js', {
        packTo: '/static/aio.js'
    });


//mod ************************************************************end