var express = require('express');
var router = express.Router();

const Book = require('../models/Book');

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        res.render('index', { book: await Book.find() });
    } catch (error) {
        res.render('index', { book: "" });

    }
});

const emptyBook = {
    name: null,
    author: null,
    price: null

}

router.get('/add', (req, res) => res.render('add', { book: emptyBook }));
router.post('/add', (req, res) => {
    const { name, author, price } = req.body;

    if (name, author, price) {
        const newBook = new Book({
            name,
            author,
            price,
        });
        newBook.save();
        req.flash('success_msg', 'New book added!')
        res.redirect("/")
    } else {
        req.flash('error_msg', 'Please enter all field')
        res.redirect("/add")
    }
});



router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        Book.findById(id, (err, docs) => {

            if (err) {
                console.log(err);
            }
            else {
                res.render('edit', {
                    book: {
                        id: docs._id,
                        name: docs.name,
                        author: docs.author,
                        price: docs.price,
                    }
                })

            }
        });
    } catch (error) {

    }
});




router.post('/update/:id', async (req, res) => {
    const id = req.params.id;
    console.log("this is id " + id)
    const { name, author, price } = req.body;
    try {
        await Book.findOneAndUpdate({ _id: id }, {
            "$set":
            {
                name: name,
                author: author,
                price: price
            }
        }, { new: true }).then((err, result) => {
            // res.send(result)
            res.redirect('/')
        })
    } catch (error) {
    }

})







router.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Book.findOneAndDelete
            ({ _id: id },
                (err, result) => {
                    req.flash('success_msg', 'BOOK DELETED')
                    res.redirect("/")

                })
    } catch (error) {
        console.log("THIS IS ERR => " + error)
    }
});




module.exports = router;
