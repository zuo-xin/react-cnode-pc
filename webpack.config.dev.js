const config = require("./webpack.config.js")
const webpack = require("webpack")

module.exports = Object.assign({}, config, {
    mode: "development",
    devServer: {
        contentBase: __dirname + '/src',
        port: 1943,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'https://cnodejs.org/api/v1 ',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    plugins: config.plugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ])
})