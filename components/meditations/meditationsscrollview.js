import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet,
    Text ,
    TouchableHighlight,
    Dimensions
} 
from 'react-native'
import {scrollview, mainColor} from '../../assets/css/constants'
import ModalView from '../modal/modalview'
import meditations from './meditations'

let dim = Dimensions.get('screen'),
    attemptedNetwork = false

export default class MeditationsScrollView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedMeditation: null,
        item: null
      };

      this.showMeditationInfo = this.showMeditationInfo.bind(this);
    }

    generateMeditationsArray() {
        if(this.props.apiResult != null) {
            const importedRecordings = this.props.apiResult.recordings
        
            for(let i = 0; i < importedRecordings.length; i++) {
                meditations.recordings.push(importedRecordings[i])
            }
        }

        attemptedNetwork = true
    }
    
    showMeditationInfo(item) {
        this.setState({ item: item})
    }

    componentDidMount() {
        if(!attemptedNetwork) this.generateMeditationsArray()
    }

    render() {

        return (
            <View style={styles.container}>
                {this.state.item &&  <ModalView type={'meditation'} item={this.state.item}/> }

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
        backgroundColor: scrollview.bkgColor,
        height: dim.height*scrollview.viewHeightFactor,
    },
    options: {
        padding: 0,
    },
    option: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
    }
})
