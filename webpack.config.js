const htmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

const config = {
    entry: {
        main: path.resolve(__dirname,'src/index.js'),
        vendors: ['react', 'react-dom', 'axios']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]-[hash].js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use:[
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        module: true,
                        url: false,
                        minimize: true,
                        sourceMap: true
                    }
                }, {
                    loader: "postcss-loader"
                }, {
                    loader: "sass-loader"
                }
            ],
            include: path.resolve(__dirname, "src")
        }, {
            test: /\.(png|jpg|svg|gif|jpeg)$/i,
            use: ["file-loader?name=[name]-[hash].[ext]"],
            include: path.resolve(__dirname, "src")
        }, {
            test: /\.(jsx|js)$/,
            use: ["babel-loader"],
            include: path.resolve(__dirname, "src")
        }]
    },
    optimization: {
        splitChunks: {
            chunks:"all",
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        })
    ]
}

module.exports = config