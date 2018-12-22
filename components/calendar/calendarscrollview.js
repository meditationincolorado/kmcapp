import React, { Component } from 'react';
import { 
    View, 
    SectionList, 
    StyleSheet,
    Text ,
    TouchableHighlight,
    Dimensions,
    Linking
} 
from 'react-native';
import ModalView from '../modal/modalview'
import {mainColor, scrollview} from '../../assets/css/constants'

let dim = Dimensions.get('screen')

export default class CalendarScrollView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
            classes: [{
                day: 'No classes', 
                data: [{ 'error': 'In your area at this time :(' }]
            }],
            selectedClass: null,
            item: {
                title: 'test'
            }
      };

      this.showClassInfo = this.showClassInfo.bind(this);
      this.noCalendarAvailable = this.noCalendarAvailable.bind(this);
    }
    
    showClassInfo(item) {
        this.setState({ item: item, selectedClass: `${item.day} - ${item.title}` })
    }

    renderClassesTableClass(item) {
        return (
            <View style={this.state.selectedClass === false ?  styles.selectedItem : styles.item}>
                <Text style={styles.classTitle}>{item.title}</Text>
                <Text style={styles.classInfo}>{item.start} - {item.end}</Text>
                <Text style={styles.classInfo}>{item.location}</Text>
            </View>
        )
    }

    configureAPIresult() {
        const classes = [],
            classDays = [],
            daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            intToDayConversion = (num) => {
                return daysArray[num]
            },
            timeConversion = (date) => {
                const hour = date.getHours(),
                    minutes = date.getMinutes(),
                    temp = {
                        hour: hour < 13 ? hour : hour % 12,
                        minutes: `${minutes < 10 ? 0 : ''}${minutes}`,
                        ampm: hour < 12 ? 'am': 'pm', 
                    }
                return temp
            },
            renderArray = () => {
                let dataArray = []
                for(i in classDays) {
                    temp = { day: classDays[i], data: [] }
                    dataArray.push(temp)
                }

                for(i in classes) {
                    const classObj = classes[i],
                        correct_index = classDays.indexOf(classObj.day)
                        
                    dataArray[correct_index].data.push(classObj.data)
                }
                return dataArray
            }

        for (i in this.props.apiResult) {
            const result = this.props.apiResult[i],
                startDatetime = new Date(result.start.dateTime),
                startDay = intToDayConversion(startDatetime.getDay()),
                startTime = timeConversion(startDatetime),
                endDatetime = new Date(result.end.dateTime),
                endTime = timeConversion(endDatetime),
                classObj = {
                    day: startDay,
                    data:
                        {
                            'title': result.summary,
                            'day': startDay,
                            'start': `${startTime.hour}:${startTime.minutes} ${startTime.ampm}`,
                            'end': `${endTime.hour}:${endTime.minutes} ${endTime.ampm}`,
                            'location': result.location,
                            'description': result.description,
                        }
                }

            classes.push(classObj)

            if(!classDays.includes(startDay)) classDays.push(startDay)
        }
    
        return renderArray()
    }

    noCalendarAvailable() {
        Linking.openURL('https://kadampa.org/map')
    }

    componentWillMount() {
        this.setState({
            classes: this.configureAPIresult()
        })
    }

    render() {
        const calendarAvailable = this.state.classes.length ? true : false

        if(calendarAvailable) {
            return (
                <View style={styles.container}>
                    {this.state.selectedClass &&  <ModalView type={'class'} item={this.state.item}/> }
                    
                    <SectionList
                        sections={this.state.classes}
                        renderItem={
                            ({item}) => 
                                <TouchableHighlight onPress={() => this.showClassInfo(item)}>
                                    {this.renderClassesTableClass(item)}
                                </TouchableHighlight>
                        }
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.day}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <TouchableHighlight onPress={this.noCalendarAvailable.bind()}>
                        <Text style={styles.no}>There is no calendar available via the app in your area. However, you may be able to find classes near you by click HERE.</Text>
                    </TouchableHighlight>
                </View>
            )
        }
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
    classTitle: {
        paddingBottom:0,
        fontSize: 15,
        color:'#ffffff',
        fontWeight: 'bold',
    },
    classInfo: {
        paddingBottom:0,
        fontSize: 15,
        color:'#ffffff'
    },
    option: {
        color: scrollview.textColor,
        fontSize: 15,
        height: scrollview.optionHeight,
    }
})