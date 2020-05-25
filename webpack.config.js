const FS = require("fs");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

function getPathsInDirectory(path) {
	let paths = [];

	if (FS.statSync(path).isFile()) paths.push(path);
	else {
		for (const subpath of FS.readdirSync(path)) {
			paths = [...paths, ...getPathsInDirectory(`${path}/${subpath}`)];
		}
	}

	return paths;
}

const filePaths = getPathsInDirectory("./src/server/templates").map(p =>
	p.substring("./src/server/templates/".length)
);

const pages = filePaths.map(f => {
	/**
	 * @type {string[]}
	 */
	const parts = f.split(".");
	return {
		name: parts.slice(0, parts.length - 1).join("."),
		ext: parts[parts.length - 1],
	};
});

module.exports = {
	devtool: "source-map",
	entry: {
		...pages.reduce(
			(obj, page) => ({
				...obj,
				[page.name]: [`./src/client/views/${page.name}.ts`],
			}),
			{}
		),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		...pages.map(
			page =>
				new HtmlWebpackPlugin({
					template: `src/server/templates/${page.name}.${page.ext}`,
					filename: `${page.name}.${page.ext}`,
					chunks: [page.name],
				})
		),
	],
	devServer: {
		contentBase: "./dist/client",
		port: 8080,
		writeToDisk: true,
		staticOptions: {
			redirect: false,
		},
	},
	mode: "development",
	output: {
		path: `${__dirname}/dist/client`,
		filename: "js/[name].[hash].js",
		publicPath: "/",
		devtoolModuleFilenameTemplate: "file:///[absolute-resource-path]",
	},
	resolve: {
		alias: {
			"@client-components": `${__dirname}/src/client/components`,
			"@client-scripts": `${__dirname}/src/client/scripts`,
			"@client-styles": `${__dirname}/src/client/styles`,
			"@client-views": `${__dirname}/src/client/views`,
			"@common-modules": `${__dirname}/src/common/modules`,
			"@common-scripts": `${__dirname}/src/common/scripts`,
			"@server-scripts": `${__dirname}/src/server/scripts`,
			"@server-templates": `${__dirname}/src/server/templates`,
		},
		extensions: [".ts", ".js", ".scss"],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"],
			},
			{
				test: /\.scss$/,
				use: ["vue-style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.sass$/,
				use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"],
			},
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					configFile: "tsconfig.webpack.json",
					appendTsSuffixTo: [/\.vue$/],
				},
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
		],
	},
};
