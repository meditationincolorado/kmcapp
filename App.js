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

let dim = Dimensions.get('screen')

export default class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      activeView: 'Main',
    };

    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  goToNKTWebsite() {
    Linking.openURL('https://kadampa.org/')
  }

  handleMenuSelection(feature) {
    this.setState({ activeView: feature })
    setTimeout(()=>{
      console.log('menu selection', feature, this.state)
    }, 300)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          activeView: 'Main',
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  goHome() {
    console.log('go home')
    this.setState({ activeView: 'Main' })
  }

  render() {
    return (
      <ImageBackground /* source={require('./assets/images/tara.jpg')}*/ style={styles.container}>
        {
          /*<View style={styles.overlay} />
          
            <Image 
              style={styles.kmclogo} 
              resizeMode="stretch"
              source={require('./assets/images/kmc_co_logo_white.png')} 
            />*/
        }

          <View style={styles.homeContainer}>
              <TouchableHighlight onPress={this.goHome.bind(this)}>
                <Text style={styles.home}>Home</Text>
              </TouchableHighlight>
          </View>

        {this.state.activeView === 'Upcoming Classes' ? <CalendarScrollView /> : null}
        {this.state.activeView === 'Guided Meditations' ? <MediationsScrollView /> : null}
        {this.state.activeView === 'Dharma (Good Advice)' ? <AdviceScrollView /> : null}
        
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
    backgroundColor: '#ffffff',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  homeContainer: {
    top: 60,
    left: 20,
  },
  home: {
    color: '#000000'
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
