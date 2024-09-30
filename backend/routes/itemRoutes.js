const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Cards page');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Card with id ${id}`);
});

router.post('/', (req, res) => {
    const newCard = req.body;
    res.send(`New card created: ${newCard.front} - ${newCard.back}`);
});

module.exports = router;
