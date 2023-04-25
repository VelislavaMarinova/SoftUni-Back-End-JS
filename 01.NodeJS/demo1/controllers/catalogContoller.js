const {html,data}=require("../util");

function catalogPage(req, res) {
    res.write(html(`
    <h1>Catalog</h1>
    <p>List of Items</p>
    <ul>${data.map(x=>`<li>${x.name}-${x.color}</li>`).join('\n')}</ul>
    `, 'Catalog'));
    res.end();
}
module.exports={
    catalogPage
}