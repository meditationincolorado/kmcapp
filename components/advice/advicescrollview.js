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
        item: null
      };

      this.showAdviceInfo = this.showAdviceInfo.bind(this);
    }
    
    generateAdviceArray() { // strucuture is diff and needs tweaking
        const hasKey = (key) => {
            let keyFound = false
            for(let i = 0; i < advice.delusions.length; i++) {
                // const delusion = advice.delusions[i].key   
                const keyFound = advice.delusions[i].key  === key

            }
            return keyFound
        }/*, hasTitle = (key,title) => {
            let titleFound = false
            for(let i = 0; i < advice.delusions[key].books.length; i++) {
                if (advice.delusions[key].books[i].title == title) titleFound = true
            }
            return titleFound
        }*/

        if(this.props.apiResult != null) {
            const importedAdvice = this.props.apiResult.delusions
        
            console.log('generated advice array --------')
            console.log(advice)
            console.log(importedAdvice)
            for(let i = 0; i < importedAdvice.length; i++) {
                const key = importedAdvice[i].key

                if(hasKey(key)) {
                    console.log('has key!!!')
                    advice.delusions.push(importedAdvice[i].text)
                } else {
                    advice.delusions.push(importedAdvice[i])
                }
            }
        }

        attemptedNetwork = true
    }

    showAdviceInfo(item) {
        this.setState({ item: item})
    }

    componentDidMount() {
        // if(!attemptedNetwork) this.generateAdviceArray()
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
