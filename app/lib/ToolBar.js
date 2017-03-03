import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text
} from 'react-native';

import ImageButton from './ImageButton'

export default class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <View style={Styles.toolBar}>
                <ImageButton onPress={() => this.onPress()} >
                    <Image style={Styles.buttonView} source={require('../resources/img/back.png')} />
                </ImageButton>
                <View style={Styles.titleView}>
                <Text>
                    {this.props.title}
                </Text>
                </View>
                <ImageButton onPress={this.props.iconOnPress} >
                    <Image style={Styles.buttonView} source={this.props.icon} />
                </ImageButton>
            </View>
        );
    }

    onPress() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.jumpBack()
        }
    }
}

const width = Dimensions.get('window').width;
const Styles = StyleSheet.create({
    toolBar: {
        backgroundColor: '#e9eaed',
        flexDirection: "row",
        height: 35
    },
    buttonView: {
        width: width / 8,
        height: 35
    },
    titleView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        flex: 1
    }
});
