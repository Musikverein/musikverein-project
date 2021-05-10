const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const GenreSchema = Schema({
  genre: {
    type: String,
    required: [true, 'The genre is required'],
    unique: true,
  },
});

const Genre = mongoose.model('genre', GenreSchema);

module.exports = Genre;
