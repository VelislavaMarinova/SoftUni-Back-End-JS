const { getAllBydate, getThreeByUserCount } = require('../services/courseService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    let view;
    let courses = []

    const search = Object.values(req.query).join();

    console.log(search);

    if (req.user) {
        //user homepage
        view = 'user-home';
        courses = await getAllBydate()
        if (search) {
            const regex = new RegExp(search, "i");
            courses = courses.filter(x => regex.test(x.title));
            //courses =  courses.filter(x=>x.title.toLowerCase().includes(search.toLowerCase()));
        }
    } else {
        //guest homepage
        view = 'guest-home';
        courses = await getThreeByUserCount()
    }

    res.render(view, {
        title: 'Home Page',
        courses
    });
});

module.exports = homeController;

//TODO replace with real controller