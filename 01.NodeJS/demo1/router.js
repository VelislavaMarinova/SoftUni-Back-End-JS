const routes = {};

function register(method, path, handler) {
    if (routes[path] == undefined) {
        routes[path] = {};
    }
    routes[path][method] = handler;
}

function match(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const actions = routes[url.pathname];
    let handler;
    if (actions != undefined) {
        handler = actions[req.method];
    }
    if (typeof handler == "function") {
        handler(req, res);
    } else {
        routes.default['GET'](req, res)
    }

    // const handler = routes[url.pathname][rec.method];

}

module.exports = {
    register,
    get:register.bind(null,"GET"),
    post: register.bind(null,"POST"),
    match
}