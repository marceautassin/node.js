  const express = require('express');
  const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/test', (req, res) => {
  res.send([1,2,3])
});

app.listen(3000, ()=> {
  console.log('Listening to port 3000...');
});


// app.put()
// app.post();
// app.delete();
