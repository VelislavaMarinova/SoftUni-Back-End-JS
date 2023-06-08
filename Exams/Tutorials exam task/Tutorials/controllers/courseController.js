const courseController = require('express').Router();


const { createCourse, getOneById, deleteById, update, enrollUser } = require('../services/courseService');
const { parseError } = require('../util/parser');


courseController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Course',
    });
});

courseController.get('/:id', async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await getOneById(courseId);

    course.isOwner = course.ownerId == userId;
    course.enrolled = course.users.some(x => x == userId);


    res.render('details', {
        title: 'Course Details',
        course
    })
});

courseController.get('/:id/delete', async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id
    const course = await getOneById(courseId);
    const isOwner = course.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    await deleteById(courseId);
    res.redirect('/')
});

courseController.post('/create', async (req, res) => {
    const course = req.body;
    //add ownerId 
    course.ownerId = req.user._id;
    // const course = {
    //     title: req.body.title,
    //     description: req.body.description,
    //     imageUrl: req.body.imageUrl,
    //     duration: req.body.duration,
    //     ownerId: req.user._id
    // }
    console.log(course);
    try {

        await createCourse(course)
        res.redirect('/')
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Course',
            errors,
            body: course
        })
    }

});

courseController.get('/:id/edit', async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;
    const course = await getOneById(courseId);
    const isOwner = course.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }

    res.render('edit', {
        title: 'Edit Course',
        course,
    })
});

courseController.post('/:id/edit', async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;
    const course = await getOneById(courseId);
    const isOwner = course.ownerId == userId;

    if (!isOwner) {
        return res.redirect('/');
    }
    const edited = req.body

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required!');
        }
        const result = await update(courseId, edited);

        res.redirect(`/course/${courseId}`);

    } catch (error) {
        res.render('edit', {
            title: 'Edit Course',
            errors: parseError(error),
            course: req.body,
        });
    }
});

courseController.get('/:id/enroll', async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;
    const course = await getOneById(courseId);
    const isOwner = course.ownerId == userId;
    const userEnrolled = course.users.some(x => x == userId)

    if (!isOwner && !userEnrolled) {
        console.log('enroll');
        await enrollUser(courseId, userId);
    }

    return res.redirect(`/course/${courseId}`);
});

module.exports = courseController;