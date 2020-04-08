const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseID) {
  // query first
  // const course = await Course.findById(courseID);
  // course.author.name = 'test',
  // course.save();

  //update first
  return await Course.findByIdAndUpdate(courseID, {
    $set: { // pas besoin du query operator ici
      'author.name': 'test update with $set'
    }
  });
}

async function removeCourse(courseID) {
  return await Course.update({_id: courseID}, {
    $unset: {
      'author': ''
    }
  });
};

// createCourse('Node Course', new Author({
//   name: 'Mosh'
// }));


// updateCourse('5e8e02133dca566219b0d6bd');
removeCourse('5e8e02133dca566219b0d6bd');
