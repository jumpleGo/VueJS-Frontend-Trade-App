const sass = require('sass');

module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap((options) => {
                // eslint-disable-next-line no-param-reassign
                options.compilerOptions.whitespace = 'preserve';
                return options;
            });
    },

    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                implementation: sass,
            },
        },
        extract: false,
    },
};
