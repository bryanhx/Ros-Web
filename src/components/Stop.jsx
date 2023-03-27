import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Config from "../scripts/config";

class Stop extends Component{

    state = { ros : null};

    constructor() {
        super();
        this.init_connection();
        this.handleClick = this.handleClick.bind(this)
    }

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", ()=>{
            console.log("connection established in Stop!");
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

    handleClick() {
        console.log("Stop")
        var cancel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/move_base/cancel",
            messageType: "actionlib_msgs/GoalID"
        });

        var goalid = new window.ROSLIB.Message({
            stamp:"",
            id:"",
        })
        cancel.publish(goalid)
    }

    render(){
        return (
            <Button variant="danger" onClick={this.handleClick}>Stop</Button>
        );
    }
}

export default Stop;