module.exports = {
    getClasses: async (appContext) => {
        // const key = `google-calendar-api/${country}/${region}/${city}/token.json`
        const url = 'https://nkt-mobile-api.herokuapp.com/calendar'

        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                appContext.setState({ classesResult: responseJson })
            })
            .catch((error) => {
                appContext.setState({ classesResult: error })
            });
    }
}