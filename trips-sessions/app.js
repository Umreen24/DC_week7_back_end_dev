
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const PORT = 3000
const Trip = require('./models/trip')
const User = require('./models/user')
const session = require('express-session')
const path = require('path')
const tripUuId = require('uuid/v1')

const VIEWS_PATH = path.join(__dirname,'/views')

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')

app.use(express.urlencoded())

app.use(session({
    secret: 'fwaaf',
    resave: false,
    saveUninitialized: false,
}))

app.listen(PORT,() => {
    console.log('server running')
})

function authenticate(req,res,next) {
    if(req.session) {
        if(req.session.username){
            next()
        } else {
            res.redirect('/')    
        }
    }
}

let trips = []
let users = []

app.get('/',(req,res) => {
    res.render('index')
})

app.get('/add-trip',(req,res) => {
    res.render('add-trip')
})


app.get('/confirm',(req,res) => {
    res.render('confirm')
})

app.post('/register',(req,res) => {
    let username = req.body.username
    let password = req.body.password
    
    let newUser = new User (username, password)
    users.push(newUser)
    console.log(users)
    
    res.redirect('/confirm')
})

app.post('/login',(req,res) => {
    let username = req.body.username
    let password = req.body.password 
    
    let persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })
    
    if(persistedUser){
        if(req.session){
            req.session.username = persistedUser.username
            res.redirect('/trips')
        }
    }else {
        res.redirect('/',{message: 'Invalid username or password'})
    }
})

app.post('/add-trip',authenticate,(req,res) => {
    let tripName = req.body.tripName
    let destination = req.body.destination
    let imageURL = req.body.imageURL
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let user = req.session.username
    let tripId = tripUuId()
    
    let newTrip = new Trip (tripName, destination, imageURL, departureDate, returnDate, user, tripId)
    
    trips.push(newTrip)
    
    if(req.session){
        req.session.tripName == tripName
    }
    
    console.log(trips)
    
    res.redirect('/trips')
})

app.get('/trips',authenticate,(req,res) => {
    let newTrips = trips.filter(trip => {
        return trip.user == req.session.username
    })

    res.render('trips',{newTrips:newTrips})
})

app.post('/delete-trip',(req,res) => {
    
    let tripName = req.body.tripName
    trips = trips.filter(trip => {
        return trip.tripName != tripName
    })

    res.redirect('/trips')
})

app.get('/logout',(req,res) => {
    if(req.session){
        req.session.destroy(error => {
            if(error) {
                next(error)
            } else {
                res.redirect('/')
            }
        })
    }
})