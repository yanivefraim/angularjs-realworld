module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      demo:{
        files: ['../demo/**/*.js', '../demo/**/*.scss', '!../demo/dist/**/*.*'],
                tasks: ['demo'],
                options:{
                    nospawn: true,
                    livereload: true
                }
      }
    },
    concat: {
      demo: {
        files:{
                '../demo/dist/dev/main.js': ['../demo/**/*module.js','../demo/temp/templates.js','../demo/*.js','../demo/**/*.js', '!../demo/dist/**/*.js','!../demo/**/*spec.js','!../demo/*config.js'],
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
        },
        karma: {
            options: {
                browsers: ['PhantomJS'],
                reporters: 'dots'
            },
            demo:{
                configFile: '../demo/demo_tests.config.js',
                browsers: ['Chrome'],
                background: false,
                singleRun: false
            }
        },
         clean: {
            demo_stage:{
                options: {
                    force: true
                },
                src:['../demo/dist/stage/']
            }
        },
          uglify: {
            demo_stage: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                    report: false
                },
                files:{
                    '../demo/dist/stage/main.min.js': ['../demo/dist/dev/main.js']
                 }
            }
        },
         hashres: {
            options: {
                // Optional. Encoding used to read/write files. Default value 'utf8'
                encoding: 'utf8',
                // Optional. Format used to name the files specified in 'files' property.
                // Default value: '${hash}.${name}.cache.${ext}'
                fileNameFormat: '${name}.${hash}.${ext}',
                // Optional. Should files be renamed or only alter the references to the files
                // Use it with '${name}.${ext}?${hash} to get perfect caching without renaming your files
                // Default value: true
                renameFiles: true
            },
            // hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want.
            demo_stage_1: {
                // Specific options, override the global ones
                options: {
                    // You can override encoding, fileNameFormat or renameFiles
                },
                // Files to hash
                src: [
                      // WARNING: These files will be renamed!
                      '../demo/dist/stage/main.min.js',
                      '../demo/dist/stage/main.min.css'
                    ],
                // File that refers to above files and needs to be updated with the hashed name
                dest: ['../demo/dist/stage/index.min.html']
            },
            demo_stage_2: {
                // Specific options, override the global ones
                options: {
                    // You can override encoding, fileNameFormat or renameFiles
                },
                // Files to hash
                src: [
                    // WARNING: These files will be renamed!
                    '../demo/dist/stage/index.min.html'
                    ],
                dest: []
        }
        },
          htmlmin: {                                     // Task
            demo_stage: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    '../demo/dist/stage/index.min.html' : '../demo/dist/stage/index.min.html'
                }
            }
        },
         compass: {
            options: {
                environment: 'production',
                noLineComments: true,
                outputStyle: 'expanded'
            },
            demo:{
                options:{
                    sassDir: '../demo/css',
                    cssDir: '../demo/dist/dev'
                }
            }
        },
         targethtml: {
          dev: {
            files: {
              '../demo/dist/dev/index.html': '../demo/index.html'
            }
          },
          stage: {
            files: {
              '../demo/dist/stage/index.min.html': '../demo/index.html'
            }
          }
        },
        cssmin: {
            demo_stage: {
                src: '../demo/dist/dev/main.css',
                dest: '../demo/dist/stage/main.min.css'
            }
        }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-html2js');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-karma');

  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-hashres'); 

  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.loadNpmTasks('grunt-targethtml');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('demo', ['html2js', 'concat:demo', 'ngAnnotate:demo', 'compass:demo', 'targethtml:dev']);

  // Default task(s).
  grunt.registerTask('demo_develop', 'demo develop', function(){
    grunt.task.run(['demo', 'watch:demo']);  
  });

  grunt.registerTask('demo_test', 'Run demo unitests', function(){
        grunt.task.run(['karma:demo:start']);
  });

  grunt.registerTask('demo_stage', 'Demo stage', function(){
        grunt.task.run(['clean:demo_stage', 'targethtml:stage', 'uglify:demo_stage', 'cssmin:demo_stage', 'htmlmin:demo_stage', 'uglify:demo_stage' ,'hashres:demo_stage_1','hashres:demo_stage_2']);
    });
};