const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Over Your Head.',
        name: 'Branden Rew, Lionel Grant III, Derrick Maddox'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        aboutText: 'We are 3 football players who are looking to start our careers in coding by creating this website that utilizes all the things we have learned in our 4 years at Birminghame Southern College.',
        name: 'Branden Rew, Lionel Grant III, Derrick Maddox'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For questions or comments, please email: bmrew@bsc.edu.',
        title: 'Help',
        name: 'Branden Rew, Lionel Grant III, Derrick Maddox'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast( longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Branden Rew, Lionel Grant III, Derrick Maddox',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Branden Rew, Lionel Grant III, Derrick Maddox',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})