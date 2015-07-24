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

        less: [
            './css/less/styles.less'
        ]
    };
    return config;
};
