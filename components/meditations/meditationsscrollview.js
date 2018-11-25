import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet,
    Text ,
    TouchableHighlight,
    Dimensions} 
from 'react-native';
import {scrollview, mainColor} from '../../assets/css/constants'
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
            console.log('show meditation--',item)
        }, 300)
    }

    componentDidMount() {
        const temp = this.props.apiResult
        console.log('Meditations did mount', temp)

        for(const index in temp.recordings) {
            console.log('meditation', temp.recordings[index])
        }
    }

    render() {
        const meditations = this.props.apiResult

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
