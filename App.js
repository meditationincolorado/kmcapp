import React, {Component} from 'react';
import {
  Alert,
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ImageBackground, 
  TouchableHighlight,
  Linking,
  Dimensions,
  Button
} from 'react-native';
import MainScrollView from './components/mainscroll/mainscrollview'
import CalendarScrollView from './components/calendar/calendarscrollview'
import MediationsScrollView from './components/meditations/meditationsscrollview'
import AdviceScrollView from './components/advice/advicescrollview'
import content from './content.json'
import {button, mainColor} from './assets/css/constants'
import { getMoviesFromApiAsync } from './utils/adviceapi'

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
      recordingsResult: null,
    };

    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  goToNKTWebsite() {
    Linking.openURL('https://kadampa.org/')
  }

  handleMenuSelection(feature) {
    this.setState({ activeView: feature })
  }

  fetchRecordings() {
    const url = 'https://raw.githubusercontent.com/meditationincolorado/kmcapp/master/components/meditations/meditations.json'
    
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          recordingsResult: responseJson,
        }, function(){
          setTimeout(()=> {
            console.log('state', this.state.dataSource)
          }, 1000)
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  fetchAdvice() {
    const url = 'https://raw.githubusercontent.com/meditationincolorado/kmcapp/master/components/advice/advice.json'
    
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          recordingsResult: responseJson,
        }, function(){
          setTimeout(()=> {
            console.log('state', this.state.dataSource)
          }, 1000)
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentDidMount() {
    this.fetchRecordings()

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          activeView: 'Main',
        });

        setTimeout(()=> {
          console.log('state',)
        }, 1000)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  goHome() {
    this.setState({ activeView: 'Main' })
  }

  render() {
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

        {this.state.activeView === 'Classes' ? <CalendarScrollView  /> : null}
        {this.state.activeView === 'Meditations' ? <MediationsScrollView apiResult={this.state.recordingsResult} /> : null}
        {this.state.activeView === 'Good Advice' ? <AdviceScrollView /> : null}
        
        {this.state.activeView === 'Main' ? 
          <MainScrollView onClick={this.handleMenuSelection.bind()}/> : 
          null
        }

        {/*<CalendarScrollView style={styles.calendar}/>*/}

        {/*<NKT>
          <Text style={styles.welcome}>{content.welcome.text} is a member of !</Text>

          <TouchableHighlight onPress={this.goToNKTWebsite.bind()}>
            <Image 
              style={styles.nktlogo} 
              resizeMode="cover"
              source={require('./assets/images/nkt_logo_white.png')} 
            />
          </TouchableHighlight>
        </NKT> */
        }

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
