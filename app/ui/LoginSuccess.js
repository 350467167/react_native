 import React, {
     Component
 } from 'react';
 import {
     ToolbarAndroid,
     Text,
     ListView,
     View,
     StyleSheet
 } from 'react-native';

 import NetUitl from '../lib/NetUtil';

 export default class LoginSuccess extends Component {
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
         formData.append('pageSize', 1);

         NetUitl.postJson('http://10.0.2.2:8888/api/getListData', formData, (responseText) => {
             this.setState({
                 dataSource: this.state.dataSource.cloneWithRows(responseText),
                 loaded: true
             });
         });
     }

     render() {
         if (!this.state.loaded) {
             return (<Text>加载中...1</Text>);
         }

         return (
             <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.getRowView(rowData)}
                />
            </View>
         );
     }

     getRowView(rowData) {
         return <View style={styles.rowClass}>
            <Text>id : {rowData.id}  name : {rowData.name}</Text>
            </View>;
     }
 }

 var styles = StyleSheet.create({
     rowClass: {
         flexDirection: 'row',
         height: 100,
         padding: 5
     }
 });