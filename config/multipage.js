const path = require('path');
const fs = require('fs');

const URL = process.env.INIT_CWD;// 当前目录

const NODE_ENV = process.env.NODE_ENV;  // process环境变量

if (NODE_ENV === 'production' && URL === undefined) throw new Error('当前打包命令缺少url参数！')

const config = {
	entry: 'main.js',
	html: 'index.html',
	pagesRoot: path.resolve(__dirname, '../trunk/branch')
};

const getRoutes = () => {
	if (fs.existsSync(`${URL}/${config.html}`)) {
		return URL;
	} else {
		throw new Error('找不到{config}.html')
	}
};

// let winL = 'E:\a\b\c\d\e\f'
const getPages = () => {
	const pages = {};
	let pageRoute = getRoutes();
	let filename = path.basename(pageRoute)
	pages[filename] = {
		entry: `${pageRoute}/${config.entry}`,
		template: `${pageRoute}/${config.html}`,
		// 兼容dev开发模式时 serve 全量项目和单个项目
		filename: URL ? config.html : `${filename}/${config.html}`
		// filename: config.html
	};
	return pages;
};

module.exports = {
	getRoutes,
	getPages
}
