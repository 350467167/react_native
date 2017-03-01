 import React, {
     Component
 } from 'react';
 import {
     Text,
     View,
     Button,
     Alert
 } from 'react-native';

 import OrderList from '../ui/OrderList';

 export default class OrderDetail extends Component {
     constructor(props) {
         super(props);
         this.state = props;
     }

     componentDidMount() {}

     fetchData() {}

     render() {
         return (
             <View>
                <Text>
                {this.state.rowId}
                </Text>
                <Button
                  onPress={() => {this.onPressCallback()}}
                  title="Return List"
                  color="#841584"
                  accessibilityLabel="Return to List"
                />
            </View>
         );
     }

     onPressCallback() {
         const { navigator } = this.props;

         if (navigator) {
             navigator.push({
                 name: 'OrderList',
                 component: OrderList
             });
         }
     }
 }
