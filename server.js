// 每日壁纸分享版 - 静态服务器，无任何依赖
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 10000;
const file = path.join(__dirname, 'index.html');
const html = fs.readFileSync(file);
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}).listen(port, () => console.log('Wallpaper listening on ' + port));
