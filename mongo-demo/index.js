const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.error('Could not connect to the database', err));


// schema through mongoose

  const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
  });


  // model and classes through mongoose

  const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'angular course',
    author: 'Marceau',
    tags: ['angular', 'frontend'],
    isPublished: false,
    price: 2000
  });

  const result = await course.save();
  console.log(result);
}

// async function getCourses() {
//   //query operators
//   //eq (equal)
//   //neq (not equal)
//   //gt (greater than)
//   //gte(greater than or equal to)
//   //lt (less than)
//   //lte(less than or equal to)
//   //in
//   //nin ( not in)
//   const courses = await Course
//   // .find({ author: 'Marceau', isPublished: false })
//   // .find({ price: {$gt: 10, $lte: 20}}) //filter all courses by price greater than 10
//   .find({price: {$in: [10,15,20]}})
//   .limit(10)
//   .sort({name: 1}) // 1 for ascending order, -1 for descending order
//   .select({name: 1, tags: 1});
//  console.log(courses);

//  // logical operators
//  //and
//  //or
//   const courses2 = await Course
//   .find()
//   .or({ author: 'Marceau'}, {isPublished: false })
//     .and({ author: 'Marceau' }, { isPublished: false })
//   .limit(10)
//   .sort({name: 1}) // 1 for ascending order, -1 for descending order
//   .select({name: 1, tags: 1});
//  console.log(courses);

//  //regular expression
//  const courses3 = await Course
//  //starts with
//  .find({author: /^Marceau/})
//  //ends with
//  .find({ author: /Tassin$/i }) // i for case unsensistive
//  //contains
// .find({author: /.*Marc.*/i})
//  .limit(10)
//  .sort({name: 1}) // 1 for ascending order, -1 for descending order
//  .select({name: 1, tags: 1});
// console.log(courses);

// }

async function getCourses() {
  const courses = await Course
    .find({
      author: /.*Mosh.*/
    })
    .limit(10)
    .sort({
      name: 1
    }) // 1 for ascending order, -1 for descending order
    .count();
  console.log(courses);

}

createCourse();
