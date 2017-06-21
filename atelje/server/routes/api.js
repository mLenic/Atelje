const express = require('express');
const router = express.Router();

const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/posts', (req, res) =>{
    axios.get(`${API}/posts`)
    .then(posts => {
      console.log(posts.data);
      res.status(200).send(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;