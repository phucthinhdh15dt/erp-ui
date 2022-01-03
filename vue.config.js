module.exports = {
    // parallel: false,
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 6980, // CHANGE YOUR PORT HERE!
        https: false,
        hotOnly: false,
    },
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import '@/assets/stylesheets/variable.scss';
                `,
            },
        },
    },
};
