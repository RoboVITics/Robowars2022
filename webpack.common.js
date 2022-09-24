const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
    }),
  ],
  module : {
    rules : [
        {
           test: /\.(html)$/,
           use: ["html-loader"]
        },
       //  {
       //     test: /\.(svg|png|jp(e*)g)$/,
       //     use: {
       //         loader: "url-loader",
       //         type: "asset/resource",
       //         options : {
       //             esModule:false,
       //             name: "imgs/[name]-[hash].[ext]",
       //             limit: 80000
       //         }
       //     }
       //  }
       {
           test: /\.(svg|png|jp(e*)g)$/,
           type: "asset/resource",
           generator: {
               filename: 'imgs/[name].[hash][ext]'
           } 
       }
   ]
  }
};
