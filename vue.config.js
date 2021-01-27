const sass = require('sass');
// const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageMinMozJpeg = require('imagemin-mozjpeg');

module.exports = {
    devServer: {
        proxy: `http://localhost:${process.env.APP_NODEMON_PORT}`,
    },
    configureWebpack: {
        plugins: [
            // new CopyPlugin({
            //     patterns: [
            //         {
            //             context: './src/assets/',
            //             from: 'img/',
            //             to: 'img/',
            //         },
            //         {
            //             from: './src/assets/img/new/favicon',
            //             to: './',
            //         },
            //     ],
            // }),
            new ImageminPlugin({
                disable: process.env.NODE_ENV !== 'production',
                test: /\.(jpe?g|png|gif|svg)$/i,
                plugins: [
                    ImageMinMozJpeg({
                        quality: 85,
                        progressive: true,
                    }),
                ],
                cacheFolder: '/tmp/cache/img',
            }),
        ],
    },

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

    pluginOptions: {
        lintStyleOnBuild: false,
        stylelint: {},
    },
};
