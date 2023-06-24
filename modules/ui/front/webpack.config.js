const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROD_MODE = 'production';
const DEV_MODE = 'development';

module.exports = (env) => {
    const mode = env.mode || PROD_MODE
    return {
        mode: mode,
        entry: './src/index.ts',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'ts-loader',
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Tg constructor',
                template: './public/index.html',
            }),
        ],
        devServer: {
            static: './dist',
            port: 3000,
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        }
    };
};
