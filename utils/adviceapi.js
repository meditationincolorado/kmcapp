module.exports = {
    getMoviesFromApiAsync: () => {
        return fetch('https://facebook.github.io/react-native/movies.json')
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson.movies
          })
          .catch((error) => {
            console.error(error);
          });
    },
    apiTest: () => {
        return fetch('https://facebook.github.io/react-native/movies.json').then(response => 
            response.json().then(data => ({
                data: data,
                status: response.status
            })
        ).then(res => {
            console.log(res.status, res.data.title)
            return res.data
        }));
    }
}