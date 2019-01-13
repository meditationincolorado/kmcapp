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

let dim = Dimensions.get('screen'),
    attemptedNetwork = false

export default class AdviceScrollView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedDelusion: null,
        item: null,
        adviceArray: advice
      };

      this.showAdviceInfo = this.showAdviceInfo.bind(this);
    }
    
    generateAdviceArray() {
        if(this.props.apiResult != null) {
            const importedAdvice = this.props.apiResult.delusions,
                temp = advice.delusions.concat(importedAdvice)

            for(let i = 0; i < temp.length; i++) {
                for(let j = i + 1; j < temp.length - 1; j++) {
                    if(temp[i].key === temp[j].key) {
                        const concatedArr = temp[i].books.concat(temp[j].books)
                        temp[i].books = concatedArr
                        temp.splice(j, 1)
                    }
                }
            }

            this.setState({
                adviceArray: { 
                    'delusions': temp 
                }
            })
        }

        attemptedNetwork = true
    }

    showAdviceInfo(item) {
        this.setState({ item: item})
    }

    componentDidMount() {
        if(!attemptedNetwork) this.generateAdviceArray()
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
                    data={this.state.adviceArray.delusions}
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
