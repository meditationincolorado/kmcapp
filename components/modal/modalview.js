import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableHighlight} 
from 'react-native';
import constants from '../../assets/css/constants'

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
        } else if(this.props.type === 'mediation') {
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
        top: -250,
        padding: constants.modal.padding,
        marginBottom: 10,

    },
    title: {
        fontSize: constants.modal.title.fontSize,
        margin: 10,
        color: 'blue',
    },
    time: {
        fontSize: constants.modal.description.fontSize,
        marginLeft: 10,
    },
    description: {
        fontSize: constants.modal.description.fontSize,
        margin: 10,
    },
    address: {
    fontSize: constants.modal.description.fontSize,
        margin: 10,
    },
});
