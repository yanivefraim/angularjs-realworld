module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      realworlddemo:{
        files: ['../real-world-demo/**/*.js', '!../real-world-demo/dist/**/*.*'],
                tasks: ['realworlddemo'],
                options:{
                    nospawn: true
                }
      }
    },
    concat: {
      realworlddemo: {
        files:{
                '../real-world-demo/dist/dev/main.js': ['../real-world-demo/**/*module.js','../real-world-demo/temp/templates.js','../real-world-demo/*.js','../real-world-demo/**/*.js', '!../real-world-demo/dist/**/*.js'],
                '../real-world-demo/dist/dev/index.html': ['../real-world-demo/index.html'],
                '../real-world-demo/temp/templates.html': ['../real-world-demo/**/*.tpl.html']
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
                src: ['../real-world-demo/temp/templates.html'],
                dest: '../real-world-demo/temp/templates.js'
            }
        },
         ngAnnotate: {
            options: {
                // Task-specific options go here.
            },
            realworlddemo: {
                files: {
                    '../real-world-demo/dist/dev/main.js': ['../real-world-demo/dist/dev/main.js']
                }
            }
        }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-html2js');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('realworlddemo', ['concat:realworlddemo', 'html2js', 'ngAnnotate:realworlddemo']);

  // Default task(s).
  grunt.registerTask('realworlddemo_develop', 'realworlddemo develop', function(){
    grunt.task.run(['watch:realworlddemo']);  
  });

};