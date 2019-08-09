
class Trip{
    constructor(tripName, destination, imageURL, departureDate, returnDate, user, tripId) {
        this.tripName = tripName
        this.destination = destination
        this.imageURL = imageURL
        this.departureDate = departureDate
        this.returnDate = returnDate
        this.user = user
        this.tripId = tripId
    }
}

module.exports = Trip