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
        console.log('Advice did mount', advice)

        for(const index in advice.delusions) {
            console.log('delusion', advice.delusions[index].name)
        }
    }

    render() {
      return (
        <View style={styles.container}>
            {this.state.item && <ModalView type={'advice'} item={this.state.item} />}

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
