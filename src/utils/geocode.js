const request = require("request")

const geocode =  (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2luZ3JldzEiLCJhIjoiY2wyYzY4YjBuMDEycDNkcDYxenhpZno1NCJ9.CAMmI1l43Z4I351EmkzKEg&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services! :(', undefined)
        }else if (body.features.length === 0) {
            callback('Unable to find location! :( Please double check your entry.', undefined)
        } else {
           callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
           })
        }          
    })
}


module.exports = geocode