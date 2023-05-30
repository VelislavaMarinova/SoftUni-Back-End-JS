# Cheat Sheet
# 1st part:

1. Initialize project
2. Install & setup express
    * add routes
    * add body parser
    * add static route
3. Add view engine: express-handlebars
    * register with express
    * add views folder
    * add home template 
    * add main layout: {{{body}}}
    * add partial template folder
4. Add home controller
    * add controller to routes
5. Connect database
    * set strict query / deprecation warning
6. Authentication
    * fix html links in layout
    * add auth controller
    * add reigster page
    * add login page
7. Add user model
8. Add auth service
9. Install bcrypt and cookie-parser and configure
10. Register user
    * validate repeat password
    * check if user exists
    * use bcrypt to hash password
11. Login user
    * check if user exists
    * check if password is valid
12. Generate jwt token
    * OPTIONAL: use util.promisify to use async
    * generate token with payload
    * add token to cookie
13. Add authentication middleware
    * add decoded token to request
    * use authentication middleware
14. Logout
15. Authorization middleware
16. Dynamic navigation
17. Error handling (local error handling)
18. Add error notification to main layout
19. Login automatically after register
20. Parse errors

# 2nd part: 

NB: remove all "." in the paths for css ex: src="/static/images/logo.png"

1. Add all resources as html and transform them to hbs.
    * replace main.hbs
    * replace home.hbs
2. Check task and mark all points that are done.
3. Create model //added in the template
4. Add cerate page
    * fill all name=" " fields in create form to be the same as in the model
    * add path href='/sth/create' to navbar in main.hbs
5. Add sthController //added in the template
    * create controller: //added in the template
    * connect controller with routes.js: router.use('/crypto',cryptoController)
    * The Create Offer page is available to logged-in users: need to be guarded from MW:isAutorized 
    * get-method for create page: 
            router.get('/create', isAutorized, (req, res) => {
            res.render('crypto/create');
        });
    * post-method for create page:

                    router.post('/create', isAutorized, (req, res) => {

                    });
    * try/catch arequest
6. Create sthService in services
    * create
    * get ownerId: req.user._id
    * pass ownerId in data for create 
    * create works? MongoDB compass
7. Add Catalog page
    * in sthController add get-method: router.get(...)
    * in sthService: getAll
    * getAll data in sthController and pass it in catalog page 
    * try/catch
    * No items logic
8. Add details page
    * in sthController add get-method: router.get(...)
    * in sthService: getOne
    * getOne data in sthController and pass it in catalog page
9.  Add logic about details page(not logged user/logged in user/owner/)
10. Buy crypro !!!
11. Add logic for buy button

