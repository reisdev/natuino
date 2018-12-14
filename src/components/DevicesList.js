import React, { Component } from 'react';

import { ListView } from "react-native"

export default class DevicesList extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource()
        this.state = {
            devices : ds
        }
    }
    render(){
        return (
            <ListView dataSource={this.state.devices}/>
        )
    }
}