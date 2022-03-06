import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native'
import Constants from '../Constant.js'
import backgroundImage from '../../assets/pond-background.png'

const { height } = Dimensions.get('window')

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  onPlayApp () {
    this.props.navigation.navigate('Play')
  }

  onLeaderBoardSelect () {
    this.props.navigate('LeaderBoard')
  }

  render () {
    return (

      <View>

        <Image
          source={ backgroundImage }
          resizeMode='stretch'
        />
        <Animated.View
          style={[ styles.buttonContainer, {opacity: this.buttonOpacity }]}>
          <TouchableOpacity
            style={ styles.button }
            onPress={() => this.onPlayApp()}>
            <Text style={[ styles.buttonText, Styles.fontSmall]}>Play</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}
