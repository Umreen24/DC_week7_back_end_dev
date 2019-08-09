//establishing variables from packages installed
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const Trip = require('./models/trips-class')

//mustache configuration/letting application know that mustache is the framework that will be used
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

//new way of using body-parser
app.use(express.urlencoded())

//empty array that will be pushed with trips added
let trips = []

//starting server
app.listen(3000,() => {
    console.log('Server is running')
})

//creating root page
app.get('/',(req,res) => {
    res.render('index')
})

//creating trips page and looping through trips array
app.get('/trips',(req,res) => {
    res.render('trips',{trips: trips})
})

//creating add-trip page
app.get('/add-trip',(req,res) => {
    res.render('add-trip')
})

//creating confirmation page
app.get('/confirm',(req,res) => {
    res.render('confirm')
})

//add new trip with Trip class constructors
app.post('/add-trip',(req,res) => {
    let tripName = req.body.tripName
    let imageURL = req.body.imageURL
    let destination = req.body.destination
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate

    let newTrip = new Trip (tripName, imageURL, destination, departureDate, returnDate)
    trips.push(newTrip)

    //redirecting to confirm page after trip has been added
    res.redirect('/confirm')
})

//filtering through trips array to hide the trip selected
app.post('/delete-trip',(req,res) => {
    let tripName = req.body.tripName
    trips = trips.filter(trip =>{
        return trip.tripName != tripName
    })

    //redirect to trips page after trip has been filtered out 
    res.redirect('/trips')
})