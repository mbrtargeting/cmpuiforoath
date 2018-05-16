module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		aws: grunt.file.readJSON('../credentials.json'),
		concat: {
			coreBuild: {
				files: [
					{
						//Stroeer Meta Tagbuild
						src: 'src/core/**/*.js',
						dest: 'deploy/coreConcats/_core.js'
					}
				]
			},
			utility: {
				options: {
					banner: 'SDG.version = <%= pkg.coreVersion %>;\n'
				},
				files: [
					{
						src: 'src/utility/**/*.js',
						dest: 'deploy/coreConcats/utility.js'
					}
				]
			},
			publisher: {
				files: [
					{
						src: 'src/publisher/**/*.js',
						dest: 'deploy/coreConcats/publisher.js'
					}
				]
			},
			advertisment: {
				files: [
					{
						src: ['src/Advertisments/*.js','src/Advertisments/features/*.js','src/Advertisments/templates/*.js'],
						dest: 'deploy/coreConcats/advertisment.js'
					}
				]
			},
			modules: {
				files: [
					{
						src: 'src/Modules/**/*.js',
						dest: 'deploy/coreConcats/modules.js'
					}
				]
			},
			resources: {
				files: [
					{
						src: 'src/Resources/**/*.js',
						dest: 'deploy/coreConcats/resources.js'
					}
				]
			},
			libraries: {
				files: [
					{
						src: 'src/Externals/postscribe.js',
						dest: 'dist/metatag/libraries/postscribe.js'
					}
				]
			},
			closureBuild: {
				options: {
					banner: '(function() {\n',
					footer: '\n})();'
				},
				files: [
					{
						src: ['src/generalSetup/json.js', 'src/generalSetup/global.js', 'src/generalSetup/local.js'],
						dest: 'deploy/systemConcat/closure.js'
					}
				]
			},
			globalBuild: {
				files: [
					{
						src: 'deploy/coreConcats/*.js',
						dest: 'deploy/systemConcat/global.js'
					}
				]
			},
			buildMetaTag: {
				files: [
					{
						src: ['deploy/systemConcat/global.js', 'deploy/systemConcat/closure.js'],
						dest: 'deploy/systemConcat/metaTag.js'
					},
					{
						src: 'deploy/systemConcat/metaTag.js',
						dest: 'preview/metaTag.js'
					}
				]
			}
		},
		copy: {
			main: {
				files: [
					{
						src: 'deploy/systemConcat/global.js',
						dest: '../stroeerMetaTag-websiteConfigurations/metaTagCore_preview.js'
					}
				]
			}
		},
		uglify: {
			postScribe: {
				options: {
					banner: '/* Asynchronously write javascript, even with document.write., v1.4.0 https://krux.github.io/postscribe Copyright (c) 2015 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE */\n'
				},
				files: [
					{
						src: 'src/externals/postscribe.js',
						dest: 'deploy/libraries/postscribe.min.js'
					}
				]
			}
		},
		min: {
			main: {
				options: {
					mode: 'gzip'
				},
				files: [
					{
						src: 'deploy/libraries/postscribe.min.js',
						dest: 'dist/metatag/libraries/postscribe.min.js'
					}
				]
			}
		},
		s3: {
			options: {
				accessKeyId: '<%= aws.accessKeyId %>',
				secretAccessKey: '<%= aws.secretAccessKey %>',
				bucket: 'stroeer-metatag-live-configs-eu',
				dryRun: false,
				cache: true
			},
			uploadLibraries: {
				cwd: 'dist/',
				src: '**',
				options: {
					headers: {
						CacheControl: 'max-age:900',
						ContentEndocoding: 'gzip'
					},
					region: 'eu-central-1',
					sslEnabled: true,
					maxRetries: 3,
					access: 'public-read',
					gzip: true
				}
			}
		},
		eslint:{
			src:['src/**/*.js'],
			options:{
				configFile:'.eslintrc.json'
			}
		},
		'json-minify': {
			build: {
				files: 'dist/metatag/libraries/consentui/vendors/globalVendors.json'
			}
		}
	});
	// Load tasks.
	grunt.loadNpmTasks('grunt-aws');

	// Default task(s).
	grunt.registerTask('PushFileToS3', ['s3_TeamCity']);
};