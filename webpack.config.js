// var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
module.exports = {
    // entry: {
    //     p1: './assets/js/index1.js',
    //     p2: './assets/js/index.js'
    // },
    entry: ['./assets/js/react-menu.jsx'],
    output: {
        path: __dirname,
        filename: './assets/js/dist/react-menu.js'
    },
    // plugins: [new CommonsChunkPlugin('init.js', ['./assets/js/index.js'])],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};
