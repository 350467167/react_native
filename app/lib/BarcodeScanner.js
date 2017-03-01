import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';

import AndroidScanner from 'react-native-barcodescanner';
import LoginButton from './LoginButton';
import OrderList from '../ui/OrderList'
import OrderDetail from '../ui/OrderDetail'
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
            this.props.barcodeCallback(e.data);
        }

        if (navigator) {
            navigator.pop({
                name: 'BarcodeScanner'
            })
        }
    }

    render() {
        return (
            <AndroidScanner
                  onBarCodeRead={this.barcodeReceived.bind(this)}
                  style={{ flex: 1 }}
                  torchMode={this.state.torchMode}
                  cameraType={this.state.cameraType}
                >
                <Text>{this.state.text}</Text>
                <LoginButton name='返回' onPressCallback={ () => this.onPressCallback()}/>
            </AndroidScanner>
        );
    }

    onPressCallback() {
        const { navigator } = this.props;
        if (navigator) {
            // navigator.jumpBack();
            navigator.pop({
                name: 'BarcodeScanner'
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
