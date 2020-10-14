const path = require("path");

module.exports = {
	entry: "./src/index.ts",
	target: 'node',
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
			},
		],		
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	node: {
		fs: "empty"
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	externals:[{
		xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
	}]
};
