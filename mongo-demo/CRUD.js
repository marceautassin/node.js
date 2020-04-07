const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to mongoDB...'))
  .catch((error) => console.error('Error', error));

const courseSchema = new mongoose.Schema({
  tags: {
    type: Array,
    // synchronous validation
    // validate: {
    //   validator: function (v) { return v && v.length > 0;},
    //   message: 'A course must have at least one tag.'
    // }

    //asynchronous validation
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: 'A course must have at least one tag.'
    }
  },
  date: Date,
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 225}, //mongoose validation
  category: {
    type: String,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    // uppercase: true,
    trim: true // remove paddings
  },
  author: String,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {return this.isPublished;},
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v)
  }
});

const Course = mongoose.model('Course', courseSchema);

// Create

async function createCourse() {
  const course = new Course({
    name: "le plastique c'est fantastique",
    category: "Web",
    author: "Marceau",
    tags: ['frontend'],
    isPublished: true,
    price: 180.3
  });
  try {
    const result = await course.save();
    console.log(result);
  }
  catch (ex) {
    for (field in ex.errors)
    console.log(ex.errors[field].message);
  }
}

createCourse();

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
