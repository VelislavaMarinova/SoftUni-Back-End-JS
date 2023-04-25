const http = require('http');
const router = require('./router')
const { homePage, aboutPage, defaultPage } = require('./controllers/homeContoller');
const { catalogPage } = require('./controllers/catalogContoller');

router.register('/', homePage);
router.register('/catalog', catalogPage);
router.register('/about', aboutPage);
router.register('default', defaultPage);

// const server = http.createServer((req, res) => {
//     router.match(req, res);
// }); ===
const server = http.createServer(router.match)

server.listen(3000);

