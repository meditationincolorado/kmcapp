import React, {Component} from 'react';
import { Alert, Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableHighlight, Linking, Dimensions, Button } from 'react-native';
import MainScrollView from './components/mainscroll/mainscrollview'
import CalendarScrollView from './components/calendar/calendarscrollview'
import MediationsScrollView from './components/meditations/meditationsscrollview'
import AdviceScrollView from './components/advice/advicescrollview'
import { getCenters, getAdvice, getMeditations } from './utils/AWSapi'
import { getClasses } from './utils/googleCalAPI'
import { getUserLocation, getClosestCenter } from './utils/geolocationAPI'

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
      closestCenter: [],
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

    retrieveContent(closestCenter) {
        const setStateProxy = (classes, meditations, advice) => {
            if(!meditations.response.data || !advice.response.data) {
                this.setState({ isLoading: false })
                return
            } else {
                this.setState({
                    classesResult: classes,
                    meditationsResult: JSON.parse(meditations.response.data.Body.toString('utf-8')),
                    dharmaResult: JSON.parse(advice.response.data.Body.toString('utf-8')),
                    closestCenter: closestCenter,
                    isLoading: false
                })
            }
        }

        Promise.all([
            getClasses(closestCenter),
            getMeditations(),
            getAdvice(),
        ]).then(function ([classes, meditations, advice]){
            setStateProxy(classes, meditations, advice)
        }).catch((error) => {
            console.error(error)
        })
    }

    componentDidMount() {
        getUserLocation().then((locationInfo) => {
            console.log('locationInfo', locationInfo)
            getCenters(locationInfo).then((centers) => {
                const allCenters = JSON.parse(centers.Body.toString()),
                    closestCenter = getClosestCenter(allCenters, locationInfo)

                this.setState({
                    slogan: closestCenter.slogan
                })

                this.retrieveContent(closestCenter)
            }).catch((err) => {
                console.error(err)
            })
        }).catch((err) => {
            console.error(err)
        })

        setTimeout(()=> {
            console.log('test state:', this.state)
        }, 2000)
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
                {loaded && this.state.activeView === 'Main' ? <MainScrollView onClick={this.handleMenuSelection.bind()} center={this.state.closestCenter} /> : null}

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
