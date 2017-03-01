import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
    Image,
    Dimensions}
from 'react-native';

export default class ImageButton extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    render() {
        return (
            <TouchableHighlight onPress={() => this.props.onPress()} >
            <View style={Styles.button}>
              {this.props.children}
            </View>
            </TouchableHighlight>
        );
    }
}

const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
    button: {
        // width: width / 8
    }
});
