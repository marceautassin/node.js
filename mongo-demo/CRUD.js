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
  const course = await Course.findById(id);
  console.log(course);
}

// getCourse('5e8b6a4b69bc0c347c603ed9');

// Update

// query first
// async function updateCourse1(id) {
// const course = await Course.findById(id);
// if(!course) return;
// course.set({
//   name: 'That is a test',
//   author: 'Marceau obviously',
//   isPublished: true,
//   price: 10000
// });
// const result = await course.save();
// console.log(result);
// }

// updateCourse1('5e8b6b183a10513f72aad77d');

// update first

async function updateCourse2(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      name: "Third test sorry...",
      price: 2
    }
  }, {new: true});
  console.log(course);
}

// updateCourse2('5e8b6bce128f0a49bb39a5c3');


// Delete

async function removeCourse(id) {
  // const result = await Course.deleteOne({_id: id});
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

// removeCourse('5e8b6bbbc29fef48928e687d');
