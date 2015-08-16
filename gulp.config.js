module.exports = function() {
    var config = {
        temp: './.tmp/',
        index: './index.html',

        // all js files to vet
        alljs: [
            './app/**/*.js',
            './*.js'
        ],

        appscripts: [
            './app/**/*.js'
        ],

        css: './css/',

        less: [
            './css/less/styles.less'
        ]
    };
    return config;
};
