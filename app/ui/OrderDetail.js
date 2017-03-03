 import React, {
     Component
 } from 'react';
 import {
     Text,
     View,
     Button,
     Alert,
     Image
 } from 'react-native';

 import OrderList from '../ui/OrderList';
 import ToolBar from '../lib/ToolBar';
 import ImageButton from '../lib/ImageButton';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext 
} from 'react-native-popup-menu';

 export default class OrderDetail extends Component {
     constructor(props) {
         super(props);
         this.state = props;

         this.state.language = "java";
     }

     componentDidMount() {}

     fetchData() {}

     render() {
         return (
                
                
                <MenuContext>
                <ToolBar
                    navigator={this.props.navigator}
                    title="订单管理"
                    icon={require('../resources/img/menu.png')} 
                    iconOnPress={() => this.callMenu()} />
                <Menu onSelect={value => alert(`Selected number: ${value}`)}>
      <MenuTrigger text='Select option' />
      <MenuOptions>
        <MenuOption value={1} text='One' />
        <MenuOption value={2}>
          <Text style={{color: 'red'}}>Two</Text>
        </MenuOption>
        <MenuOption value={3} disabled={true} text='Three' />
      </MenuOptions>
    </Menu>
    <Text>
                订单ID: {this.state.rowId}
                </Text>
     </MenuContext>
         );
     }

     callMenu() {
        // Alert.alert('aaa')
     }
 }
