
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'

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
    }
}