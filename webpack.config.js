const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode : "development",
    entry : "./src/index.js",
    output : {
        filename : "bundle.[contenthash].js",
        path : path.resolve(__dirname, "dist")
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : ["style-loader","css-loader"]
            }
        ]
    },
    plugins : [new HtmlWebpackPlugin()]
}