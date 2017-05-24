const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, './dist/js'),
        publicPath: './dist/js/',
        filename: '[name].js'
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/,
                loader: 'style-loader!css-loader!sass-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'scripts': path.resolve(__dirname, './src/js'),
            'styles': path.resolve(__dirname, './src/sass'),
        }
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
