const express = require('express');
const articleRouter = express.Router();
const Articles = require('../models/schema');

//All articles
articleRouter.get('/', (req, res) => {
    Articles.find()
    .sort({name: -1})
    .then(article => res.json(article))
    .catch(error => res.status(400).json(`Cannot get via the router! Error ${error}`))
})

//Add new article
articleRouter.post('/add', (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        textBody: req.body.textBody,
    })

    newArticle
        .save()
        .then(() => res.json(`Article added`))
        .catch(error => res.status(400).json(`Upload error: ${error}`));
})

//Find Article by id
articleRouter.get('/:id', (req, res) => {
    Articles.findById(req.params.id)
    .then(article => res.json(article))
    .catch(error => res.status(400).json(`Can't find article, error ${error}`))
});

//Find Article by id and UPDATE
articleRouter.put('/:id', (req, res) => {
    Articles.findByIdAndUpdate(req.params.id)
    .then(article => {
        article.title = req.body.title,
        article.textBody = req.body.textBody,

        article.save()
        .then(() => res.json(`Article ${article.title} updated`))
        .catch(error => res.status(400).json(`Can't update this article, error ${error}`))
    })
    .catch(error => res.status(400).json(`Can't find this article, error ${error}`))
})

//Find article by id and delete
articleRouter.delete('/:id', (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Article destroyed`))
    .catch(error => res.status(400).json(`Can't erase this article, error ${error}`))
})

module.exports = articleRouter;