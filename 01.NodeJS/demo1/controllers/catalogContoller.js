const { html, data } = require("../util");

function catalogPage(req, res) {
    res.write(html(`
    <h1>Catalog</h1>
    <p>List of Items</p>
    <ul>${data.map(x => `<li>${x.name}-${x.color}</li>`).join('\n')}</ul>
    `, 'Catalog'));
    res.end();
}

function createPage(req, res) {
    res.write(`
<h1>Create Item</h1>
<form>
    <label>Name: <input type="text" name="name"></label>
    <label> Color:
        <select name="color">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
        </select>
    </label>
    <input type="submit" value="Create">
</form>`);
    res.end();
}
module.exports = {
    catalogPage,
    createPage,
}