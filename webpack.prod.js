const path = require("path");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge }  = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(common, {
    mode : "production",
    output : {
        filename : "bundle.[contenthash].js",
        path : path.resolve(__dirname, "public")
    },
    plugins : [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename : "style.[contenthash].css"})
    ],
    module : { 
        rules : [
            {
                test : /\.css$/,
                use : [MiniCssExtractPlugin.loader,"css-loader"]
            }
        ]
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin()
        ],
        minimize: true
    },
});