import React, {Component} from 'react';
import { Alert, Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableHighlight, Linking, Dimensions, Button } from 'react-native';
import MainScrollView from './components/mainscroll/mainscrollview'
import CalendarScrollView from './components/calendar/calendarscrollview'
import MediationsScrollView from './components/meditations/meditationsscrollview'
import AdviceScrollView from './components/advice/advicescrollview'
import { getAdvice, getMeditations } from './utils/AWSapi'
import { getClassesLocally, getClasses } from './utils/googleCalAPI'
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'

/* AWS */
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from 'react-native-dotenv'
const AWS = require('aws-sdk')
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
})
const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
})

/* Screen Dimensions */
let dim = Dimensions.get('screen')

export default class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      activeView: 'Main',
      isLoading: true,
      classesResult: null,
      dharmaResult: null,
      meditationsResult: null,
      cityObj: null,
      stateObj: null,
      countryObj: null,
    };

    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

    goToNKTWebsite() {
        Linking.openURL('https://kadampa.org/')
    }

    handleMenuSelection(feature) {
        this.setState({ activeView: feature })
    }

    // componentWillMount() {
    retrieveContent() {
        const setStateProxy = (classes, meditations, advice) => {
            this.setState({
                classesResult: classes,
                meditationsResult: JSON.parse(meditations.response.data.Body.toString('utf-8')),
                dharmaResult: JSON.parse(advice.response.data.Body.toString('utf-8')),
                isLoading: false
            })
        }

        Promise.all([
            getClassesLocally(this.state),
            getClasses(this.state),
            getMeditations(),
            getAdvice(),
        ]).then(function ([classesAlt, classes, meditations, advice]){
            setStateProxy(classes, meditations, advice)
        }).catch((error) => {
            console.error(error)
        })
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`

            fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log('responseJson', responseJson)
                    const results_ct = responseJson.results.length,
                        number = responseJson.results[0].address_components[0],
                        street = responseJson.results[0].address_components[1],
                        city = responseJson.results[0].address_components[2],
                        county = responseJson.results[0].address_components[3],
                        state = responseJson.results[0].address_components[4],
                        country = responseJson.results[0].address_components[5],
                        zipcode = responseJson.results[0].address_components[6]

                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                        cityObj: city,
                        stateObj: state,
                        countryObj: country,
                        activeView: 'Main',
                    }, ()=> { this.retrieveContent() });
                })
                .catch((error) => {
                    return { 'error': 'no classes returned'}
                });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    goHome() {
        this.setState({ activeView: 'Main' })
    }

    render() {
        const loaded = !this.state.isLoading

        return (
            <ImageBackground source={require('./assets/images/female-meditator-1.png')} style={styles.container}>
                
                {this.state.activeView !== 'Main' ? <View style={styles.homeContainer}>
                    <TouchableHighlight onPress={this.goHome.bind(this)}>
                    <Image 
                        style={styles.homeIcon} 
                        resizeMode="stretch"
                        source={require('./assets/images/home-icon-white.png')} 
                    />
                    </TouchableHighlight>
                </View> : null }

                {loaded && this.state.activeView === 'Classes' ? <CalendarScrollView  apiResult={this.state.classesResult} /> : null}
                {loaded && this.state.activeView === 'Meditations' ? <MediationsScrollView apiResult={this.state.meditationsResult} /> : null}
                {loaded && this.state.activeView === 'Good Advice' ? <AdviceScrollView apiResult={this.state.dharmaResult} /> : null}
                {loaded && this.state.activeView === 'Main' ? <MainScrollView onClick={this.handleMenuSelection.bind()} /> : null}

            </ImageBackground>
        );
    }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbc648',
        height: 650,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    homeContainer: {
        top: 60,
        left: 20,
    },
    homeIcon: {
        height: 30,
        width: 40
    },
    kmclogo: {
        height: 100,
        width: 180,
    },
    nktlogo: {
        height: 50,
        width: 50,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    welcome: {
        fontSize: 10,
        textAlign: 'center',
        fontStyle: 'italic', 
        margin: 10,
        width: dim.width*.65,
        color: '#ffffff',
    },
    calendar: {
        flex: 1
    }
    });
