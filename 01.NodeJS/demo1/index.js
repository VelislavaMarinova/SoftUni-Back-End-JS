const http = require('http');
const router = require('./router')
const { homePage, aboutPage, defaultPage } = require('./controllers/homeContoller');
const { catalogPage, createPage, createItem } = require('./controllers/catalogContoller');

router.get('/', homePage);
router.get('/catalog', catalogPage);
router.get('/create', createPage);
router.post('/create', createItem);
router.get('/about', aboutPage);
router.get('default', defaultPage);


// const server = http.createServer((req, res) => {
//     router.match(req, res);
// }); ===
const server = http.createServer(router.match)

server.listen(3000);

