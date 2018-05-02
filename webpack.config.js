const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const browserConfig = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader', exclude: /spec/ },
			{
				test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: 'file-loader',
				options: {
					name: 'public/media/[name].[ext]',
					publicPath: url => url.replace(/public/, '')
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: { importLoaders: 1 }
						},
						{
							loader: 'postcss-loader',
							options: { plugins: [autoprefixer()] }
						}
					]
				})
			},
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: `css/[name].css`
		}),
		new webpack.DefinePlugin({
			__isBrowser__: "true"
		})
	]
}

const serverConfig = {
	entry: './server/index.js',
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: __dirname,
		filename: 'server.js',
		publicPath: '/'
	},
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader',  exclude: /spec/ }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__isBrowser__: "false"
		})
	]
}

module.exports = [browserConfig, serverConfig]
