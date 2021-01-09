const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[contenthash].bundle.js"
    },
    devServer:{
        contentBase: path.join(__dirname,"dist"),
        port: 9000,
        watchContentBase: true
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
            }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/
            }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9100,
            proxy: 'http://localhost:9000'
            }, 
            {
                reload: false
            }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
            })
        ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                //"style-loader",
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
                "postcss-loader"]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            }
        },
        {
            test: /\.(html)$/,
            use: ["html-loader"]
        }
    ]
    }
}