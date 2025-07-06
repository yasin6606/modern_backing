const path = require('path');

module.exports = {
    entry: './src/server.ts',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build'),
    },
    target: 'node',
    performance: {
        hints: false, // or 'warning' | false
    },
};
