const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to mongoDB...'))
  .catch((error) => console.error('Error', error));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model('Course', courseSchema);

// Create

async function createCourse() {
  const course = new Course({
    name: "le meilleur cours de la terre",
    author: "Marceau",
    tags: ['ruby', 'fullstack'],
    isPublished: true,
    price: 1500
  });
  const result = await course.save();
  console.log(result);
  console.log('course created');
}

// createCourse();

// Read

async function getCourses() {
  const courses = await Course
    .find({price: {$lte: '153'}})
    .sort({name: 1});
  console.log(courses);
}

// getCourses();

async function getCourse(id) {
  const course = await Course
  .find();
  console.log(course);
}

getCourse('5a68fdc3615eda645bc6bdec');
