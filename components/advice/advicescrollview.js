import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet,
    Text ,
    TouchableHighlight,
    Dimensions} 
from 'react-native';
import advice from './advice.json'
import ModalView from '../modal/modalview'
import {scrollview, mainColor} from '../../assets/css/constants'

let dim = Dimensions.get('screen')

export default class AdviceScrollView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedDelusion: null,
        item: null
      };

      this.showAdviceInfo = this.showAdviceInfo.bind(this);
    }
    
    showAdviceInfo(item) {
        this.setState({ item: item})
        setTimeout(()=> {
            console.log('showAdviceInfo--', this.state.item)
        }, 300)
    }

    componentDidMount() {
    }

    render() {
      return (
        <View style={styles.container}>
            {this.state.item && <ModalView type={'advice'} item={this.state.item} />}

            <View style={styles.header}>
                <Text style={styles.headerText}>Overcoming</Text>
            </View>
            <FlatList
                style={styles.options}
                data={advice.delusions}
                renderItem={({item}) =>
                    <TouchableHighlight onPress={() => this.showAdviceInfo(item)}> 
                        <Text style={styles.option}>{item.key}</Text>
                    </TouchableHighlight>
                }
             />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    header: {
        height: dim.height*scrollview.header.viewHeightFactor,
        backgroundColor: scrollview.header.bkgColor,
    },
    headerText: {
        fontSize: scrollview.fontSize,
        textAlign: 'center',
        paddingTop: scrollview.header.padding,
    },
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
    options: {
        padding: 0,
    },
    option: {
        color: scrollview.textColor,
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        height: scrollview.optionHeight,
    }
})
