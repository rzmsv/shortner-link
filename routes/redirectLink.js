const router = require("express").Router()
const Link = require('../model/link')
require('dotenv').config()

router.get('/:id',(req,res,next)=>{
    const id = req.params.id
    try {
        Link.searchShorterLink(id)
        .then(result=>{
            if (result){
                res.redirect(`${result.original_link}`)
            }else{
                res.redirect('/')
            }
        })
        .catch(err =>{
            res.redirect('/')
        })
    } catch (error) {
        res.redirect('/')
    }
})

module.exports = router