
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const Trip = require('./models/trips-class')

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(express.urlencoded())

let trips = []

app.listen(3000,() => {
    console.log('Server is running')
})

app.get('/',(req,res) => {
    res.render('index')
})

app.get('/trips',(req,res) => {
    res.render('trips',{trips: trips})

})

app.get('/add-trip',(req,res) => {
    res.render('add-trip')
})

app.get('/confirm',(req,res) => {
    res.render('confirm')
})

app.post('/add-trip',(req,res) => {
    let tripName = req.body.tripName
    let imageURL = req.body.imageURL
    let destination = req.body.destination
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate

    let newTrip = new Trip (tripName, imageURL, destination, departureDate, returnDate)
    trips.push(newTrip)

    res.redirect('/confirm')

})

app.post('/delete-trip',(req,res) => {
    let tripName = req.body.tripName
    trips = trips.filter(trip =>{
        return trip.tripName != tripName
    })

    res.redirect('/trips')
})