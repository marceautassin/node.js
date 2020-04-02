  const Joi = require ('joi');

  const express = require('express');
  const app = express();

  app.use(express.json()); // adding json method for post method

  const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
  ];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send([1,2,3, 4]);
});

// PORT

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
  console.log(`Listening to port ${port}...`);
});

// route
app.get('/posts/:id', (req, res) => {
  res.send(req.params);
});

app.get('/test/:id', (req, res) => {
  res.send(req.query);
});

//courses
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => (c.id === parseInt(req.params.id)));
  if (!course) return res.status(404).send('The course with the given id was not found'); //404
  res.send(course);
});
//function Joi validation
const validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);

};

// app.post();

app.post('/api/courses', (req, res) => {

  // Manual validation
  // if (!req.body.name || requestAnimationFrame.body.name < 3) {
    //   res.status(400).send('Name is required and should me more than 3 characters.')
    //   return;
    // };

    // JOI validation

    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);
    res.send(course);
  });

  // app.put()

  app.put('/api/courses/:id', (req, res) => {
    //if course does not exist => 404
    const course = courses.find(c => (c.id === parseInt(req.params.id)));
    if (!course) return res.status(404).send('The course with the given id was not found'); //404

    // //not validate => 400

    // const schema = {
    //   name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);

    // if (result.error) {
    //   res.status(400).send(result.error.details[0].message)
    //   return;
    // };

    const { error } = validateCourse(req.body); //destructuring method

    if (error) return res.status(400).send(error.details[0].message);

    //update
    course.name = req.body.name;
    res.send(course);

  });
  // app.delete();
  app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found'); //404

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
  });
