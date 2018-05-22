module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		aws: grunt.file.readJSON('../credentials.json'),
		s3: {
			options: {
				accessKeyId: '<%= aws.accessKeyId %>',
				secretAccessKey: '<%= aws.secretAccessKey %>',

				dryRun: false,
				cache: false
			},
			uploadVendors: {
				cwd: 'src/vendorList',
				src: '**',
				options: {
					headers: {
						CacheControl: 'max-age:900',
						ContentEndocoding: 'gzip'
					},
					bucket: 'stroeer-consentmanager-live-eu',
					region: 'eu-central-1',
					sslEnabled: true,
					maxRetries: 3,
					access: 'public-read',
					gzip: true
				}
			},
			uploadCmp: {
				cwd: 'src/controller',
				src: 'cmp3p.js',
				options: {
					headers: {
						CacheControl: 'max-age:900',
						ContentEndocoding: 'gzip'
					},
					bucket: 'stroeer-consentmanager-live-eu',
					region: 'eu-central-1',
					sslEnabled: true,
					maxRetries: 3,
					access: 'public-read',
					gzip: true
				}
			},
			uploadUi: {
				cwd: 'build/',
				src: '**',
				options: {
					headers: {
						CacheControl: 'max-age:900',
						ContentEndocoding: 'gzip'
					},
					bucket: 'stroeer-consentmanager-live-eu',
					region: 'eu-central-1',
					sslEnabled: true,
					maxRetries: 3,
					access: 'public-read',
					gzip: true
				}
			}
		}
	});
	// Load tasks.
	grunt.loadNpmTasks('grunt-aws');

	// Default task(s).
	grunt.registerTask('PushFileToS3', ['s3:uploadVendors','s3:uploadCmp','s3:uploadUi']);
};