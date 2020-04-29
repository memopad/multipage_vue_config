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
    const allRoutes = [];
    const fullname = URL
    if (fs.existsSync(`${fullname}/${config.html}`)) {
        allRoutes.push(fullname);
    }
    return allRoutes;
};

const getPages = () => {
    const pages = {};

    getRoutes().forEach(route => {
        let filename = route.slice(route.lastIndexOf('/') + 1);
        pages[filename] = {
            entry: `${route}/${config.entry}`,
            template: `${route}/${config.html}`,
            filename: config.html
        };
    });
 
    return pages;
};

module.exports = {
    getRoutes,
    getPages
}
