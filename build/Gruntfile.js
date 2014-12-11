module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      demo:{
        files: ['../demo/**/*.js', '!../demo/dist/**/*.*'],
                tasks: ['demo'],
                options:{
                    nospawn: true
                }
      }
    },
    concat: {
      demo: {
        files:{
                '../demo/dist/dev/main.js': ['../demo/**/*module.js','../demo/temp/templates.js','../demo/*.js','../demo/**/*.js', '!../demo/dist/**/*.js'],
                '../demo/dist/dev/index.html': ['../demo/index.html'],
                '../demo/temp/templates.html': ['../demo/**/*.tpl.html']
              }
      }
    },
     html2js: {
            options: {

            },
            main: {
                options: {
                    rename: function (moduleName) {
                        return "demo-templates"
                    },
                    singleModule: true,
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: ['../demo/temp/templates.html'],
                dest: '../demo/temp/templates.js'
            }
        },
         ngAnnotate: {
            options: {
                // Task-specific options go here.
            },
            demo: {
                files: {
                    '../demo/dist/dev/main.js': ['../demo/dist/dev/main.js']
                }
            }
        }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-html2js');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('demo', ['concat:demo', 'html2js', 'ngAnnotate:demo']);

  // Default task(s).
  grunt.registerTask('demo_develop', 'demo develop', function(){
    grunt.task.run(['watch:demo']);  
  });

};