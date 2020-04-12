const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    allowProtoMethodsByDefault: true
})

// Render engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// Todos proceeding logic
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

// Connect routes
app.use(todoRoutes)



async function start () {
    try {

        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://vadim:1234qwer@cluster0-ongco.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        // Start server
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}...`)
        })

    } catch(e) {
        console.log(e)
    }
}

start()
