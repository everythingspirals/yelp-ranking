module.exports = {
    entry: ['./yelp.js'],
    target: 'node',
    output: {
        path: __dirname,
        filename: "build.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { test: /\.json$/, loader: "json-loader" }
        ]
    }
};