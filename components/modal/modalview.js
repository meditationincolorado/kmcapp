import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableHighlight} 
from 'react-native';
import {modal, mainColor} from '../../assets/css/constants'

export default class ModalView extends Component {
    constructor(props) {
      super(props);
    }
    
    renderModal() {
        if(this.props.type === 'class') {
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.item.title}</Text>
                    <Text style={styles.time}>from {this.props.item.time}</Text>
                    <Text style={styles.description}>{this.props.item.description}</Text>
                    <Text style={styles.address}>{this.props.item.address}</Text>
                </View>
            )
        } else if(this.props.type === 'advice') {
            const item = this.props.item,
            numBooks = item.books.length,
            bookIndex = Math.floor(Math.random() * numBooks),
            numQuotes = item.books[bookIndex].quotes.length,
            quoteIndex = Math.floor(Math.random() * numQuotes)  
            
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>{item.key}</Text>
                    <Text style={styles.description}>{`"${item.books[bookIndex].quotes[quoteIndex].text}"`}</Text>
                    <Text style={styles.description}>{`~ ${item.books[bookIndex].author}, ${item.books[bookIndex].title}`}</Text>
                </View>
            )
        } else if(this.props.type === 'meditation') {
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>{item.key}!!!</Text>
                    <Text style={styles.description}>{`"${item.books[bookIndex].quotes[quoteIndex].text}"`}</Text>
                    <Text style={styles.description}>{`~ ${item.books[bookIndex].author}, ${item.books[bookIndex].title}`}</Text>
                </View>
            )
        } else {
            return null
        }
    }

    componentDidMount() {
        console.log('props', this.props)
    }

    render() {
        return (
            this.renderModal()
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -350,
        padding: modal.padding,
        marginBottom: 10,

    },
    title: {
        fontSize: modal.title.fontSize,
        margin: 10,
        color: mainColor,
    },
    time: {
        fontSize: modal.description.fontSize,
        marginLeft: 10,
    },
    description: {
        fontSize: modal.description.fontSize,
        margin: 10,
    },
    address: {
    fontSize: modal.description.fontSize,
        margin: 10,
    },
});
