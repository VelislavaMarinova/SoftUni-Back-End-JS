const http = require('http');
const { homePage, aboutPage } = require('./controllers/homeContoller');
const { catalogPage } = require('./controllers/catalogContoller');


const routes = {
    '/': homePage,
    '/about': aboutPage,
    '/catalog': catalogPage,
}

const server = http.createServer((req, res) => {
    console.log('Request sent');
    // console.log(request);
    console.log(req.method);
    console.log(req.headers);
    console.log(req.url);

    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(url);

    const handler = routes[url.pathname];

    if (typeof handler == 'function') {
        handler(req, res);
        // response.write(html(page));
        // response.end();
    } else {
        defaultPage(req, res);
    }

});
server.listen(3000);

