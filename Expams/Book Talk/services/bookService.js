const Book = require('../models/Book');

exports.getAll = () => Book.find({});

exports.getOne = (selectedBookReviewId) => Book.findById(selectedBookReviewId);

exports.create = async (ownerId, bookReviewData) => {
    await Book.create({ ...bookReviewData, ownerId: ownerId });

}

exports.edit = async (bookReviewId, inputData) => {
console.log(inputData,bookReviewId);

    await Book.findByIdAndUpdate(bookReviewId, inputData, { runValidators: true });
};

exports.delete = (bookReviewId)=>Book.findByIdAndDelete(bookReviewId);


