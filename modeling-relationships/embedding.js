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
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
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
}

async function addAuthor(courseID, author) {
  const course = await Course.findById(courseID);
  course.authors.push(author);
  course.save();

}

async function removeAuthor(courseID, authorID) {
  const course = await Course.findById(courseID);
  const author = course.authors.id(authorID);
  author.remove();
  course.save();

}


// createCourse('Node Course', [
//   new Author({name: 'Mosh'}),
//   new Author({name: 'Marceau'})

// ]);

// addAuthor('5e8e0bc80660a656ddd15946', new Author({name: 'Jonathan'}));
removeAuthor('5e8e0bc80660a656ddd15946', '5e8e0c2fb868e25c339c8e91');

// updateCourse('5e8e02133dca566219b0d6bd');
// removeCourse('5e8e02133dca566219b0d6bd');
