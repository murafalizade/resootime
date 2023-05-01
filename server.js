const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;
        const subdomain = req.headers.host.split('.')[0];

        if (subdomain === 'localhost' || subdomain === 'www') {
            // Handle requests to the default domain
            handle(req, res, parsedUrl);
        } else if (pathname.startsWith('/restaurant')) {
            // Redirect requests to restaurant subdomains
            app.render(
                req,
                res,
                `http://${query.id}.${subdomain}:3000`,
                parsedUrl.query,
            );
        } else {
            // Handle requests to other subdomains
            res.statusCode = 404;
            res.end(`Cannot access subdomain ${subdomain}`);
        }
    }).listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
