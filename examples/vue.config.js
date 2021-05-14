module.exports = {
    publicPath: '',
    devServer: {
        proxy: {
            '/api/v5': {
                target: 'http://baobab.kaiyanapp.com',
                ws: true,
                changeOrigin: true
            }
        }
    }
};