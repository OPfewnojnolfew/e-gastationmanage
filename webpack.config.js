var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    // entry: {
    //     p1: "./assets/js/index1.js",
    //     p2: "./assets/js/index.js"
    // },
    entry: ['./assets/js/index.js'],
    output: {
        path: __dirname,
        filename: "test.js"
    },
    plugins: [new CommonsChunkPlugin("init.js", ["./assets/js/index.js"])],
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: "style!css"
        }]
    }
};
