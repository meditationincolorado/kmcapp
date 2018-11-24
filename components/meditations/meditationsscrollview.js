import React, { Component } from 'react';
import { 
    View, 
    SectionList, 
    StyleSheet,
    Text ,
    TouchableHighlight,
    Dimensions} 
from 'react-native';
import ModalView from '../modal/modalview';

let dim = Dimensions.get('screen')

export default class MediationsScrollView extends Component {
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
        console.log('meditations mounted')
    }

    render() {
      return (
        <View style={styles.container}>
            {this.state.selectedClass &&  <ModalView type={'meditation'} item={this.state.item}/> }
            {/*<SectionList
                sections={testData}
                renderItem={
                    ({item}) => 
                        <TouchableHighlight onPress={() => this.showClassInfo(item)}>
                            <View style={this.state.selectedMeditation === `${item.theme} - ${item.title}` ?  styles.selectedItem : styles.item}>
                                <Text>{item.title}</Text>
                            </View>
                        </TouchableHighlight>
                }
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.day}</Text>}
                keyExtractor={(item, index) => index}
            />*/}

            <SectionList
                renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.option}>{title}</Text>
                )}
                sections={testData}
                keyExtractor={(item, index) => item + index}
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
        backgroundColor: 'rgba(247,247,247,1.0)',
        height: dim.height*.4,
       },
       sectionHeader: {
         paddingTop: 20,
         paddingLeft: 10,
         paddingRight: 10,
         paddingBottom: 2,
         fontSize: 14,
         fontWeight: 'bold',
         backgroundColor: 'rgba(247,247,247,1.0)',
       },
       item: {
         padding: 10,
         fontSize: 18,
         height: 44,
         backgroundColor: 'rgba(247,247,247,1.0)',
       },
       selectedItem: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: 'rgba(0,247,247,1.0)',
      },
})

const testData = [
    {
        title: 'Clear Mind', 
        data: ['Relax 1', 'Relax 2']
    },
]