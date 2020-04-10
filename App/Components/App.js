import React, {Componet, Component} from "react";
import { TextInput, View, Text,Button, TouchableOpacity, Alert } from "react-native";
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';

export default class App extends Component{
    state = {
        name: 'App',
        text: '...',
        mess : []
    }

    constructor(props){
        super(props);
        this.socket = io('http://192.168.100.11:3000', {jsonp:true});

        this.socket.on('data-web', msg => {
            this.setState({mess: [...this.state.mess, msg] });
        })
    }

    clickme(){
        var data = this.state.name + ':' + this.state.text;
        this.socket.emit("app-send-data" , data);
    }

    render(){
    const mess = this.state.mess.map(mess => <Text key={mess}>{mess}</Text>)

        return(
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(name) =>this.setState({name})}
                    value={this.state.name}
                    />
                 <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) =>this.setState({text})}
                    value={this.state.text}
                    />
                <Button
                    title="Press me"
                    onPress={() => {this.clickme()}}
                    />

                 {mess}   
            </View>
        );
    }
}

