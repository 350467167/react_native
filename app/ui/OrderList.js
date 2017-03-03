 import React, {
     Component
 } from 'react';
 import {
     Text,
     ListView,
     View,
     StyleSheet,
     Dimensions,
     TouchableHighlight,
     Image,
     Alert
 } from 'react-native';

 import NetUitl from '../lib/NetUtil';
 import OrderDetail from './OrderDetail'
 import Login from './main';
 import ToolBar from '../lib/ToolBar';
 import ImageButton from '../lib/ImageButton';
 import BarcodeScanner from '../lib/BarcodeScanner';
 // import BarcodeScanner from 'react-native-barcodescanner'
 // import BarcodeScanner from 

 export default class OrderList extends Component {
     constructor(props) {
         super(props);
         const dataSource = new ListView.DataSource({
             rowHasChanged: (r1, r2) => r1 !== r2
         });
         this.state = {
             dataSource: dataSource,
             loaded: false
         };

         this.fetchData = this.fetchData.bind(this);
     }

     componentDidMount() {
         this.fetchData();
     }

     fetchData() {
         let formData = new FormData();
         formData.append('pageSize', 10);

         // 下拉 时间比lastDate小
         // 上拉 时间比firstDate大
         //formData.append();

         NetUitl.postJson('http://10.0.2.2:8888/api/getListData', formData, (responseData) => {
             this.setState({
                 dataSource: this.state.dataSource.cloneWithRows(responseData),
                 loaded: true
             });
         });
     }

     render() {
         if (!this.state.loaded) {
             return (<Text>加载中...</Text>);
         }

         return (
             <View>
                <ToolBar
                    navigator={this.props.navigator}
                    title="订单管理"
                    icon={require('../resources/img/search.png')} 
                    iconOnPress={() => this.callCamera()} />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.getRowView(rowData)}
                />
            </View>
         );
     }

     getRowView(rowData) {
         return (
             <TouchableHighlight onPress={() => this.pressRow(rowData.id)}>
             <View style={styles.rowClass}>
             <Text style={styles.columnClass}>id : {rowData.id}</Text>
             <Text> name: {rowData.name}</Text>
             </View>
             </TouchableHighlight>);
     }

     pressRow(rowId) {
         const { navigator } = this.props;
         if (navigator) {
             navigator.push({
                 name: 'OrderDetail',
                 component: OrderDetail,
                 params: {
                     rowId: rowId
                 }
             });
         }
     }

     callCamera() {
         const { navigator } = this.props;
         const self = this;
         if (navigator) {
             navigator.push({
                 name: 'BarcodeScanner',
                 component: BarcodeScanner,
                 params: {
                     barcodeCallback: (code) => {
                         Alert.alert(
                             'Alert Title',
                             code
                         )
                     }
                 }
             })
         }
     }
 }

 var width = Dimensions.get('window').width;
 var styles = StyleSheet.create({
     rowClass: {
         flexDirection: 'row',
         height: 100,
         paddingTop: 5
     },
     redClass: {
         width: 5,
         backgroundColor: 'red'
     },
     columnClass: {
         width: width * 0.5
     },
     toolbar: {
         backgroundColor: '#e9eaed',
         height: 50,
     },
     titleView: {
         flexDirection: 'column',
         alignItems: 'center',
         backgroundColor: 'red'
     },
     titleName: {
         alignSelf: "center",
         backgroundColor: 'green'
     }
 });
