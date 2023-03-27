import React, {Component} from "react";
import Alert from "react-bootstrap/Alert";
import Config from "../scripts/config";


class Connection extends Component{
    state = {connected : false , ros : null }

    constructor() {
        super();
        this.init_connection();
    }

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", ()=>{
            console.log("connection established!");
            this.setState({connected : true});
        });

        this.state.ros.on("close", ()=>{
            console.log("connection closed!");
            this.setState({connected : false});
            // Try to reconnect every 3 seconds
            setTimeout(()=>{
                this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT+"");
            },3000)
        });

        this.state.ros.connect("ws://"+Config.ROSBRIDGE_SERVER_IP+":"+Config.ROSBRIDGE_SERVER_PORT+"");
    }

    render(){
        return (
            <div>
                <Alert variant={this.state.connected?"success":"danger"}>
                    {this.state.connected?"Robot Connected":"Robot Disconnected"}
                </Alert>
            </div>
        );
    }
}

export default Connection;