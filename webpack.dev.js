const path = require("path");
const common = require("./webpack.common");
const { merge }  = require("webpack-merge");

module.exports = merge(common, {
    mode : "development",
    module : { 
        rules : [
            {
                test : /\.css$/,
                use : ["style-loader","css-loader"]
            }
        ]
    },
    output : {
        filename : "bundle.js",
        path : path.resolve(__dirname, "dist")
    }
});