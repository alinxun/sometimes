//基本命令:
/*
 
 * fis install :　　//安装公共组件库 
 * fis release :    //编译并发布项目
 * fis server :		//启动一个本地调试服务器
 * 
 * fis server start : //启动fis的本地调试服务器功能对构建发布的项目进行预览
 * fis server start -p [port]  //指定新的端口
 * fis server start --type node  //启动node版fis server
 * fis server stop  //关闭内置服务器
 * 
 * fis release --optimize 
 * fis release -o   //资源压缩
 * fis release -d <path/to/output> //默认放在用户根目录，可以使用命令  fis server open 打开
 * fis release --optimize --md5  //fis release -om  //为项目中的静态资源添加md5版本号
 * 
 * 关于用时间戳
 * 
 * var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours()].join(''));

fis.config.set('roadmap.path', [
    {
        reg: /.*\.(js|css)$/,
        query: '?t=${timestamp}',
        //useSprite: true
        useHash: false
    },
    {
        reg: '**.html',
        useCache: false
    }
]);

 *设置打包
 * 
 * fis.config.set('pack', {
    '/pkg/lib.js': [
        'js/lib/jquery.js',
        'js/lib/underscore.js',
        'js/lib/backbone.js',
        'js/lib/backbone.localStorage.js',
    ]
});


 * fis release --optimize --md5 --pack //fis release -omp
 * 
 * 
 * */

/*
/////////// 辅助开发
 * 
 * fis release --watch  //fis release -w   文件监视
 * fis release --watch --live  // fis release -wl  文件监视 +  自动刷新  （要求浏览器环境支持WebSocket）
 * 
 * 
 * */


/*
 //////////配置ＡＰＩ
   fis.config.set(key, value);   -or-   fis.config.merge({....});    
 * 
 * 
 * 内部初始化配置   
 * fis.config.init({
 * 		project : {
 * 					charset : 'utf-8',
 * 					md5Length: 7
 * 				}
 * });
 * 
 * 

 * */
//项目配置： 
  fis.config.set('project.charset',"gbk");  
  fis.config.merge({project:{charset:'gbk'}});//编码
  fis.config.set('project.md5Length',8);     //-or-    
  fis.config.merge({project:{md5Length:8}});//md5长度
  fis.config.set('project.md5Connector','-');  //-or   
  fis.config.merge({project:{md5Connector:"-"}});//设置md5连接符
  fis.config.set('project.include','src/**');  //-or-  
  fis.config.merge({project:{include:"src/**"}});  //-or-  
  fis.config.set('project.include',['src/**',/^\/vendor\//i]);//设置项目源码文件include过滤器。只有命中include的文件才被视为源码，其他文件则忽略。
  fis.config.set('project.exclude', /^\/_build\//i); //-or- 
  fis.config.merge({project : { exclude : /^\/_build\//i }}); //-or- 
  fis.config.set('project.exclude', ["dist/**", /^\/_build\//i]);  //设置项目源码文件exclude过滤器。如果同时设置了 project.include 和 project.exclude 则表示在include所命中的文件中排除掉某些文件。
 
fis.config.set('project.fileType.text', 'tpl, js, css'); //-or-
fis.config.merge({//追加文本文件后缀列表
    project : {
        fileType : {
            text : 'tpl, js, css'
        }
    }
});
fis.config.set('project.fileType.image', 'swf, cur, ico');// -or-
fis.config.merge({//追加图片类二进制文件后缀列表
    project : {
        fileType : {
            image : 'swf, cur, ico'
        }
    }
});

fis.config.set('project.watch.exclude', 'node_modules');// -or-
fis.config.set('project.watch.exclude', ['node_modules', /docs/]);//设置项目源码监听时不监听的文件列表


fis.config.set('project.watch.usePolling', true);//设置项目源码监听的方式， usePolling 为 true 时会使用轮询的方式检查文件是否被修改，比较消耗CPU，但是适用场景更广。设置为 false 后会使用系统API进行文件修改检查，对性能消耗较小，但是可能由于系统版本不同，会存在兼容性问题。












