const http = require('http');
const path = require('path');
const fss = require('fs');

// const css = require('./css/site.css');
// const homePage = require('./views_old/index');
// const infoCat = require('./views_old/infoCat');
const cats = require('./cats.json')
const fsp = require('fs/promises');

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })

    if (req.url == '/') {

        const homePage = await readFile(path.resolve(__dirname, './views/home.html'));
        const catsHtml = cats.map((cat) => catTemplate(cat)).join('');
        const result = homePage.replace('{{cats}}', catsHtml);
        res.write(result);

    } else if (/cats\/\d+\/edit/.test(req.url)) {
        let catId = req.url.split('/')[2];
        let cat = cats.find(x => x.id == catId);
        // res.write(infoCat(cat));
    }
    else if (req.url == '/css/site.css') {

        res.writeHead(200, {
            'Content-Type': 'text/css'
        })

        const siteCss = readFile(path.resolve(__dirname, './content/styles/site.css'))
        // res.write(css)
    } else {

        res.write(`
                <h1>404</h1>
                `)
    }
    res.end();
});

function readFile(pathFile) {
    return fsp.readFile(pathFile, { encoding: 'utf-8' })
};

function catTemplate(cat) {
    const html = fss.readFileSync(path.resolve(__dirname, './views/partials/cat.html'), { encoding: "utf-8" });

    // let result = html.replace('{{name}}', cat.name);
    // result = result.replace('{{description}}', cat.description)
    // result = result.replace('{{imageUrl}}', cat.imageUrl)
    // result = result.replace('{{breed}}', cat.breed)
    // result = result.replace('{{id}}', cat.id)

    // return result;

  const filledHtml=  Object.keys(cat).reduce((result,key)=>{
        return result.replaceAll(`{{${key}}}`,cat[key])
    },html)
    return filledHtml;
};

server.listen(5000);
console.log('Server is running on port 5000...!!!');