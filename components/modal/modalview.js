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
            const item = this.props.item

            return(
                <View style={styles.container}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{item.day} {item.start} - {item.end}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.address}>{item.location}</Text>
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
            const item = this.props.item

            return(
                <View style={styles.container}>
                    <Text style={styles.title}>{item.key}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.description}>Duration: {item.duration}</Text>
                    <Text style={styles.description}>with {item.artist}</Text>
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
        backgroundColor: modal.bkgColor,
    },
    title: {
        fontSize: modal.title.fontSize,
        margin: 10,
        fontWeight: 'bold',
        color: mainColor,
    },
    date: {
        fontSize: modal.description.fontSize,
        fontWeight: 'bold',
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
