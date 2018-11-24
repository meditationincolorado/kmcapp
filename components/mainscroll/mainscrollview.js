import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet,
    Text ,
    TouchableHighlight,
    Dimensions} 
from 'react-native';

let dim = Dimensions.get('screen')

export default class MainScrollView extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedFeature: null
      };

      this.openFeature = this.openFeature.bind(this);
    }
    
    openFeature(feature) {
        this.props.onClick(feature.key)
    }

    componentDidMount() {

    }

    render() {
      return (
        <View style={styles.container}>
            <FlatList
                style={styles.options}
                data={[{key: 'Upcoming Classes'}, {key: 'Guided Meditations'}, {key: 'Dharma (Good Advice)'}]}
                renderItem={({item}) => 
                    <TouchableHighlight onPress={() => { this.openFeature(item)}}>
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
            backgroundColor: 'transparent',
            height: dim.height*.4,
        },
        options: {
        },
        option: {
            textAlign: 'center',
            fontSize: 20,
            padding: 20,
        }
})
