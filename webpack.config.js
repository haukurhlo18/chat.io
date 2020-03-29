const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/js'),
    },
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
        compress: true,
        writeToDisk: true,
        port: 9000,
    },
};
