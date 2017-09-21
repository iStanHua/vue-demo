'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                hostname: 'localhost',
                keepalive: true,
                livereload: 35729,
                open: true
            },
            dest: {
                options: {
                    port: 6969,
                    base: ['dist']
                }
            }
        },
        clean: {
            dest: ['dist']
        },
        copy: {
            dest: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    src: ['**/*', '!**/*.html', '!**/*.art', '!js/*.js', '!**/*.less'],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            }
        },
        less: {
            css: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/less/app',
                    src: ['{,*/}*.less'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['**/*.css'],
                    dest: 'dist/css'
                }]
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['**/*.js'],
                    dest: 'dist/js'
                }]
            }
        },
        template: {
            compile: {
                options: {
                    root: 'src/template/',
                    data: {
                        v: '<%= pkg.version %>'
                    }
                },
                files: [{
                    src: ['**/*.html', '!template/**/*.html'],
                    cwd: 'src',
                    expand: true,
                    dest: 'dist'
                }]
            }
        },
        prettify: {
            options: {
                config: '.jsbeautifyrc'
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.html'],
                    dest: 'dist'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.html'],
                    dest: 'dist'
                }]
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'clean',
        'copy',
        'uglify',
        'less',
        'cssmin',
        'template',
        'prettify',
        // 'htmlmin',
        'connect'
    ]);
};