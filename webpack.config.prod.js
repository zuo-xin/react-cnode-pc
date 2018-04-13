const config = require("./webpack.config")
const webpack = require("webpack")
const cleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = Object.assign({},config,{
    mode:"production",
    plugins:config.plugins.concat([
        new cleanWebpackPlugin("dist")
    ]),
    optimization: Object.assign({},config.optimization,{
        minimize:true
    })
})