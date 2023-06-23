import User from './user.model.js';
import Library from './library.model.js';
import Book from './book.model.js';

// Relation 1:N user - library
User.hasMany(Library, {
    foreinkey: "libraryId",
    sourceKey: "id",
});
Library.belongsTo(User, { foreinkey: "libraryId", targetId: "id" });

// Relation 1:N user - book
User.hasMany(Book, {
    foreinkey: "userId",
    sourceKey: "id",
});
Book.belongsTo(User, { foreinkey: "userId", targetId: "id" });

// Relation 1:N book - library
Library.hasMany(Book, {
    foreinkey: "libraryId",
    sourceKey: "id",
});
Book.belongsTo(Library, { foreinkey: "libraryId", targetId: "id" });