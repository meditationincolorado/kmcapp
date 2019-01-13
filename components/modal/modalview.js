import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableHighlight} 
from 'react-native';
import {modal, mainColor} from '../../assets/css/constants'

// ios Helpful link: https://github.com/zmxv/react-native-sound/issues/352
import Sound from 'react-native-sound'
Sound.setCategory('Playback')

export default class ModalView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playingMeditation: false,
            introDuration: 0,
            meditationDuration: 0
        }
        
        this.handleAudio = this.handleAudio.bind(this)
    }
    
    displayAudioDuration(totalSeconds) {
        const seconds = Math.round(totalSeconds % 60),
            minutes = Math.floor(totalSeconds / 60)

        return `${minutes}m ${seconds}s`
    }

    getDurations(item) {
        if (this.state.introDuration === 0) {
            const intro = new Sound(item.intro, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    return
                } else {
                    this.setState({ introDuration: intro.getDuration() })
                }
            }) 
        }
        if(this.state.meditationDuration === 0){
            const meditation = new Sound(item.meditation, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    return
                } else {
                    this.setState({ meditationDuration: meditation.getDuration() })
                }
            }) 
        }
    }

    handleAudio(item, type) {
        const { intro, meditation } = item
        if(!intro || !meditation) return

        const audioFile = type === 'intro' ? intro : meditation,
            option = audioFile.includes('https://s3.amazonaws.com') ? null : Sound.MAIN_BUNDLE

        const audio = new Sound(audioFile, option, (error) => {
            if (error) {
                console.log('failed to load the sound', error) 
                return
            } else {
                this.setState({ 
                    playingMeditation: !this.state.playingMeditation 
                }, ()=> {
                    if(this.state.playingMeditation) {
                        audio.play()
                    } else {
                        audio.stop()
                    }
                })
            }
        })
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
                    <Text style={styles.description}>{`${item.books[bookIndex].quotes[quoteIndex].text}`}</Text>
                    <Text style={styles.description}>{`~ ${item.books[bookIndex].author}`}</Text>
                    <Text style={styles.description}>{`${item.books[bookIndex].title}`}</Text>
                </View>
            )
        } else if(this.props.type === 'meditation') {
            const item = this.props.item

            if(item.intro && item.meditation) this.getDurations(item)

            return(
                <View style={styles.container}>
                    <Text style={styles.title}>{item.key}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.description}>with {item.artist}</Text>
                    <TouchableHighlight onPress={() => this.handleAudio(item, 'intro')}> 
                        <Text>Intro {this.displayAudioDuration(this.state.introDuration)}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handleAudio(item, 'meditation')}> 
                        <Text>Meditation {this.displayAudioDuration(this.state.meditationDuration)}</Text>
                    </TouchableHighlight>

                </View>
            )
        } else {
            return null
        }
    }

    componentDidMount() {}

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
