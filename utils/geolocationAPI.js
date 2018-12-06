// module.exports = {
//     getUserLocation: async () => {
//         const success = (position) => {
//             const temp =  {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//                 error: null
//             }

//             console.log('testing', temp)
//             return temp
//         },
//         find = async () => {
//             return navigator.geolocation.getCurrentPosition(
//                 success,
//                 (error) => {
//                     // this.setState({ error: error.message })
//                     return { error: error.message }
//                 },
//                 { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//                 );
//         }

//         find()
//             .then((data) => {
//                 console.log('done', data)
//             })
//     }
// }