const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.error('Could not connect to the database', err));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
    .find({isPublished: true})
    .or([{
        price: {
          $gte: 15
        }
      },
      {
        name: /.*by.*/i
      }
    ])
    // .count()
    ;

}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
