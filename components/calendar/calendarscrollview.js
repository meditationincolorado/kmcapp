import React, { Component } from 'react';
import { 
    View, 
    SectionList, 
    StyleSheet,
    Text ,
    TouchableHighlight,
    Dimensions} 
from 'react-native';
import ModalView from '../modal/modalview'
import {mainColor, scrollview} from '../../assets/css/constants'

let dim = Dimensions.get('screen')

export default class CalendarScrollView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedClass: null,
        item: {
            title: 'test'
        }
      };

      this.showClassInfo = this.showClassInfo.bind(this);
    }
    
    showClassInfo(item) {
        this.setState({ item: item, selectedClass: `${item.day} - ${item.title}` })
        console.log('clicked--', this.state.item)

    }

    componentDidMount() {
        console.log('classes mounted')
    }

    render() {
      return (
        <View style={styles.container}>
            {this.state.selectedClass &&  <ModalView type={'class'} item={this.state.item}/> }
            <SectionList
                sections={testData}
                renderItem={
                    ({item}) => 
                        <TouchableHighlight onPress={() => this.showClassInfo(item)}>
                            <View style={this.state.selectedClass === `${item.day} - ${item.title}` ?  styles.selectedItem : styles.item}>
                                <Text style={styles.option}>{item.title}</Text>
                                <Text style={styles.option}>
                                    {item.location} @ {item.time}
                                </Text>
                            </View>
                        </TouchableHighlight>
                }
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.day}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
      );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 0,
        flex: 1,
        backgroundColor: scrollview.bkgColor,
        height: dim.height*scrollview.viewHeightFactor,
       },
    sectionHeader: {
        padding: scrollview.padding,
        paddingLeft: scrollview.paddingLeft,
        paddingBottom: 2,
        fontSize: scrollview.fontSize,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: scrollview.bkgColor,
    },
    item: {
        padding: scrollview.padding,
        paddingLeft: scrollview.paddingLeft,
        fontSize: scrollview.fontSize,
        height: scrollview.height,
        backgroundColor: 'transparent',
        color: '#ffffff',
    },
        selectedItem: {
        padding: scrollview.padding,
        paddingLeft: scrollview.paddingLeft,
        fontSize: scrollview.fontSize,
        height: scrollview.height,
        backgroundColor: mainColor,
        color: '#ffffff',
    },
    options: {
        padding: 0,
    },
    option: {
        color: scrollview.textColor,
        fontSize: 15,
        height: scrollview.optionHeight,
    }
})

const testData = [
    {
        day: 'Monday', 
        data: [
            {
                'title': 'Meditation 1',
                'day': 'Monday',
                'time': '7:00pm - 8:00pm',
                'location': 'Cap Hill',
                'description': 'Each class is self contained and will include a teaching and guided meditation. Everyone welcome! $12, Students/Seniors/Military $9 (free for Members) with Resident Teacher, Kadam Lucy James. More info and class topics: https://meditationincolorado.org/tuesdays',
                'address': '1081 Marion Street, Denver, CO 80218',
            },
            {
                'title': 'Meditation 2',
                'day': 'Monday',
                'time': '7:00pm - 8:30pm',
                'location': 'Boulder',
                'description': 'Lorem ipsum...',
                'address': 'Marion Street',
            }
        ]
    },
    {
        day: 'Tuesday', 
        data: [
            {
                'title': 'Meditation 3',
                'day': 'Tuesday',
                'time': '7:00pm - 8:00pm',
                'location': 'Cap Hill',
                'description': 'Lorem ipsum...',
                'address': 'Marion Street',
                'address': 'Marion Street',
            },
            {

                'title': 'Meditation 4',
                'day': 'Tuesday',
                'time': '7:00pm - 8:30pm',
                'location': 'Boulder',
                'description': 'Lorem ipsum...',
                'address': 'Marion Street',
            }
        ]
    },
    {
        day: 'Wednesday', 
        data: [
            {
                'title': 'Meditation 5',
                'day': 'Wednesday',
                'time': '7:00pm - 8:00pm',
                'location': 'Cap Hill',
                'description': 'Lorem ipsum...',
                'address': 'Marion Street',
            },
            {

                'title': 'Meditation 6',
                'day': 'Wednesday',
                'time': '7:00pm - 8:30pm',
                'location': 'Boulder',
                'description': 'Lorem ipsum...',
                'address': 'Marion Street',
            }
        ]
    },
]