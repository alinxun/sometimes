/**
 * Created by Administrator on 2016/5/7.
 */

//wrapper 函数 ：包含整个Grunt配置信息
module.exports = function(grunt) {

    //初始化configuration 对象
    grunt.initConfig({
        //从package.json文件读入项目配置信息，并存入到package.json文件列出的属性
        pkg: grunt.file.readJSON('package.json'),
        
        meta:{
            distPath:'dist/',
            doclessetsPath: 'docs/assets/',
            docsDistPath: 'docs/dist/',
            docsPath: 'docs/',
            jsPath:'js/',
            lessPath:'less/',
            cssPath:'css/'
        },
        
        banner: '/*!\n' +
        ' * =====================================================\n' +
        ' * author : linxun \n' +
        ' * email  : 634878427@qq.com\n' +
        ' * github : https://github.com/eou\n' +
        ' * <%= grunt.template.today("yyyy-mm-dd") %> '+
        ' * =====================================================\n' +
        ' */\n',
        
        clean:{
            dist:['<%= meta.distPath %>', '<%= meta.docsDistPath %>']
        },
        
        //合并
        concat: {
            options: {
                // 定义一个用于插入合并输出文件之间的字符
                separator: ';',
                banner:'<%= banner %>;'
            },
            dist: {
                // 将要被合并的文件
                src: ['js/**/*.js'],
                // 合并后的JS文件的存放位置
                dest: '<%= meta.distPath %>js/<%= pkg.name %>.js'
            }
        },
        
        //min  js
        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                //自动压缩concat任务中生成的文件
                }
            }
        },
        
        qunit:{
            files:['**/*.html']
        },
        
        jshint: {
            files: ['<%= meta.jsPath %>/**/*.js'],
            options: {
                //这里是覆盖JSHint 默认配置的选项
                globals: {
                    jQuery: true,
                    console:true,
                    module:true,
                    document:true
                }
            }
        },
        
        autoprefixer: {
            options: {
            // Task-specific options go here. 
            
            },
            your_target: {
            // Target-specific file lists and/or options go here. 
            },
            browsers: [
                    'ie 8',
                    'ie 9',
                    'Android >= 4',
                    'Chrome >= 40',
                    'last 6 Firefox versions',
                    'iOS >= 6',
                    'Safari >= 6'
                ]
        },
        
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });


    require('load-grunt-tasks')(grunt);//这个可以减少运行时间
    require('time-grunt')(grunt);//计算各个功能时间

// -------加载grunt插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-autoprefixer');
    
    grunt.registerTask('test',['jshint','qunit']);
    grunt.registerTask('default', ['jshint','qunit','concat','uglify']);
    
    
    

};
