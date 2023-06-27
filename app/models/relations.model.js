import Library from './library.model.js';
import Book from './book.model.js';

// Relation 1:N book - library
Library.hasMany(Book, {
    foreinkey: "libraryId",
    sourceKey: "id",
});
Book.belongsTo(Library, { foreinkey: "libraryId", targetId: "id" });