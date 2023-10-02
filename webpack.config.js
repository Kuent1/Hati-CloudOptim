const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const templateFiles = fs.readdirSync(path.resolve(__dirname, './src/'))
  .filter((file) => path.extname(file).toLowerCase() === '.html');

const htmlPluginEntries = templateFiles.map((template) => new HTMLWebpackPlugin({
  inject: true,
  hash: false,
  filename: template,
  template: path.resolve(path.resolve(__dirname, './src/'), template),
  favicon: path.resolve(path.resolve(__dirname, './src/'), 'images', 'favicon.ico'),
}));

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        ...htmlPluginEntries
    ],
    devServer: {
        static: path.resolve(__dirname, './dist'),
        port: 9000
    }
}