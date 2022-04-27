const request = require('request')

const forecast =  (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1f91fd54b0b6c07538ef8ddf04392baf&query='+ longitude + ',' + latitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services! :(', undefined)
        }else if (body.error) {
            callback('Unable to find location! :( Please double check your entry.', undefined)
        } else {
           callback(undefined, 'It is currently about ' + body.current.temperature +' degrees Fahrenheit out. It feels like '+ body.current.feelslike +'. Overhead it is '+ body.current.weather_descriptions + ' with a ' + body.current.precip + '% chance of rain.')
        }          
    })
}

module.exports = forecast