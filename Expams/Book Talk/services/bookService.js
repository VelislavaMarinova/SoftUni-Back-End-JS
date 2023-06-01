const Book = require('../models/Book');

exports.getAll = () => Book.find({});

exports.getOne=(selectedBookReviewId)=>Book.findById(selectedBookReviewId);

exports.create = async (ownerId, bookReviewData) =>{
console.log(bookReviewData);
await Book.create({ ...bookReviewData, ownerId: ownerId });

}
