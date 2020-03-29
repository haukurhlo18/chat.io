const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'chat.io',
            favicon: 'src/assets/favicon.ico',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react'
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            query: {
                                hash: 'sha512',
                                digest: 'hex',
                                name: 'name=[hash].[ext]',
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [
            '.js',
            '.less',
            '.css',
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        historyApiFallback: true,
        compress: true,
        writeToDisk: true,
        port: 9000,
    },
};
