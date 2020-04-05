const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.error('Could not connect to the database', err));


// schema through mongoose

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean
});


// model and classes through mongoose

const Course = mongoose.model('Course', courseSchema);

const course = new Course({
  name: 'Node.js course',
  author: 'Marceau',
  tags: ['node', 'backend'],
  isPublished: false
});
