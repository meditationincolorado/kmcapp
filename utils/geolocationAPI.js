
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'

CENTER_MAX_RADIUS_IN_KM = 200

module.exports = {
    getUserLocation: async () => {
        getCurrentPosition = (options = {}) => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
        };

        try {
            const position = await this.getCurrentPosition();
            const { latitude, longitude } = position.coords;
            
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
    
            // Get User's Location
            return await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    return {
                        results_ct: responseJson.results.length,
                        number: responseJson.results[0].address_components[0],
                        street: responseJson.results[0].address_components[1],
                        city: responseJson.results[0].address_components[2].long_name.replace(/\s+/g, '-').toLowerCase(),
                        county:responseJson.results[0].address_components[3].long_name.replace(/\s+/g, '-').toLowerCase(),
                        state: responseJson.results[0].address_components[4].long_name.replace(/\s+/g, '-').toLowerCase(),
                        country: responseJson.results[0].address_components[5].long_name.replace(/\s+/g, '-').toLowerCase(),
                        zipcode: responseJson.results[0].address_components[6],
                        latitude: latitude,
                        longitude: longitude
                    }
                })
        } catch (error) {
            console.error(error)
            return { 'error': error }
        }
    },
    getDistance: (p1, p2) => {
        const rad = (x) => {
            return x * Math.PI / 180;
        }

        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.latitude - p1.latitude);
        var dLong = rad(p2.longitude - p1.longitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = (R * c) / 1000
        return d < CENTER_MAX_RADIUS_IN_KM ? d : -1 // returns the distance in km
    }
}