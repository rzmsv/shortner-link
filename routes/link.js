const router = require("express").Router()
const Link = require('../model/link')
var jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
require('dotenv').config()


router.get('/', (req, res, next) => {
  res.render('home', {
    title: "Home Page"
  })
})


router.post('/', (req, res, next) => {
  var token = jwt.sign({ foo: req.body.originalLInk }, 'shhhhh');
  try {
    const specification = {
      getOriginalLink: req.body.originalLInk,
      getShorterLink: randomstring.generate({
        length: 5,
        charset: 'alphabetic'
      }),
      token : token.split('.')[1].slice(0,-10)
    }
    Link.searchToken(token.split('.')[1].slice(0,-10))
      .then((result) => {
        if (result == undefined) {
          console.log("new link added in database.")
          const insertOriginalLinksAndShorterLinkIntoDB = new Link(specification)
          insertOriginalLinksAndShorterLinkIntoDB.save()
          Link.searchOriginalLink(specification.getOriginalLink)
            .then(result => {
              console.log(result)
              res.render('home', {
                shortnerLink: process.env.link + result.shorter_link
              })
            })
        } else {
          res.render('home', {
            shortnerLink: process.env.link + result.shorter_link
          })
        }
      })
      .catch(err =>{
        console.log(err)
        res.redirect('/')
      })
  } catch (error) {

  }
})

module.exports = router