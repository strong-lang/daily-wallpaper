// 每日壁纸分享版 - 静态服务器，无任何依赖
// 按请求路径返回真实文件：/ 返回 index.html，/assets/*.webp 返回图片，其他路径返回 404
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 10000;
const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.css': 'text/css', '.js': 'text/javascript' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(root, p);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found: ' + p);
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log('Wallpaper listening on ' + port));
