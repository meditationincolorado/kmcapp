import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet,
    Text ,
    TouchableHighlight,
    Dimensions} 
from 'react-native';
import meditations from './meditations.json'
import ModalView from '../modal/modalview'

let dim = Dimensions.get('screen')

export default class MeditationsScrollView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedMeditation: null,
        item: null
      };

      this.showMeditationInfo = this.showMeditationInfo.bind(this);
    }
    
    showMeditationInfo(item) {
        this.setState({ item: item})
        setTimeout(()=> {
            console.log('show meditation--', this.state.item)
        }, 300)
    }

    componentDidMount() {
        console.log('Meditations did mount', meditations)

        for(const index in meditations.recordings) {
            console.log('meditation', meditations.recordings[index])
        }
    }

    render() {
        if(meditations.recordings) console.log('recordings', meditations.recordings)
        return (
            <View style={styles.container}>
                {this.state.selectedClass &&  <ModalView type={'meditation'} item={this.state.item}/> }

                <FlatList
                    style={styles.options}
                    data={meditations.recordings}
                    renderItem={({item}) =>
                        <TouchableHighlight onPress={() => this.showMeditationInfo(item)}> 
                            <Text style={styles.option}>{item.key}</Text>
                        </TouchableHighlight>
                    }
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
    options: {
        padding: 10,
    },
    option: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
    }
})
