const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const iconsPattern = {
	from: 'images/*',
	dest: 'images'
}
const manifestJson = {
	from: 'manifest.json',
	to: 'manifest.json'
}


module.exports = (_, argv) => {
	return {
	    entry: './src/content.js',
	    output: {
		    filename: 'content.js',
		    path: path.resolve(__dirname, 'dist')
	    },
	    optimization: {
		    minimizer: [
			    new UglifyJsPlugin({
				    uglifyOptions: {
					    compress: {
						    drop_console: argv.mode === 'production'
					    }
				    }
			    })
		    ]
	    },
	    plugins: [
		    new CleanWebpackPlugin(['dist']),
		    new CopyWebpackPlugin([ iconsPattern, manifestJson ]),
	    ],
	    module: {
		    rules: [
			    {
				    test: /\.js$/,
				    exclude: /node_modules/,
				    use: {
					    loader: 'babel-loader',
					    options: {
						    presets: ['@babel/preset-env']
					    }
				    }
			    },
			    {
				    test: /(\.jsx|\.js)$/,
				    loader: 'eslint-loader',
				    exclude: /node_modules/
			    }
		    ]
	    }
	}
}