import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Vibration,
    View
} from 'react-native';

import AndroidScanner from 'react-native-barcodescanner';
import LoginButton from './LoginButton';
import OrderList from '../ui/OrderList'
// import IosScanner from 'react-native-camera';

export default class BarcodeScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barcode: '',
            cameraType: 'back',
            text: '扫描二维码',
            torchMode: 'off',
            type: '',
        };
    }

    barcodeReceived(e) {
        if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
        this.setState({
            barcode: e.data,
            text: `${e.data} (${e.type})`,
            type: e.type,
        });
        const { navigator } = this.props;
        if (this.props.getUrl) {
            let url = this.state.text;
            this.props.getUrl(url);
        }
        if (navigator) {
            navigator.pop({
                name: 'barcode'
            })
        }
    }

    render() {
        return (
            <View style={styles.Container}>
                <AndroidScanner
                  onBarCodeRead={this.barcodeReceived.bind(this)}
                  style={{ flex: 1 }}
                  torchMode={this.state.torchMode}
                  cameraType={this.state.cameraType}
                />
                <View style={styles.statusBar}>
                  <Text style={styles.statusBarText}>{this.state.text}</Text>
                </View>
                <LoginButton name='返回' onPressCallback={ () => this.onPressCallback()}/>
            </View>
        );
    }

    onPressCallback() {
        const { navigator } = this.props;
        if (navigator) {
             navigator.jumpBack();
         }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarText: {
        fontSize: 20,
    }
});
