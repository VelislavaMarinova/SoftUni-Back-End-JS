const {html}=require("../util");

function homePage(req, res) {
    res.write(html(`<h1>Home page</h1>
    <p> Welcome to our site</p>`, 'Home Page'));
    res.end();
}

function aboutPage(req, res) {
    res.write(html(`
    <h1>About Us</h1>
    <p>Contact: +1-555-21312</p>
    `,"About Page"));
    res.end();
}
function defaultPage(req, res) {
    res.statusCode = 404;
    res.write(html(`
    <h1>404 Not Founs</h1>
    <p>The resource you requested cannot be found</p>
    `, 'Not Found'));
    res.end();
}

module.exports = {
    homePage,
    aboutPage,
    defaultPage
};