import React, { Component } from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet,
    Text ,
    TouchableHighlight,
    Dimensions} 
from 'react-native'
import {scrollview, mainColor} from '../../assets/css/constants'

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
        const { slogan } = this.props.center

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{slogan}</Text>
                </View>
                <FlatList
                    style={styles.options}
                    data={[{key: 'Classes'}, {key: 'Meditations'}, {key: 'Good Advice'}]}
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
    },
    option: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 20,
        padding: 20,
        height: scrollview.optionHeight,
    }
})
