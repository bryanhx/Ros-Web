import React, {Component} from "react";
import { Joystick } from 'react-joystick-component';
import Config from "../scripts/config";

class Teleoperation extends Component{
    state = { ros : null};

    constructor() {
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this)
    }

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", ()=>{
            console.log("connection established in Teleoperation!");
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

    handleMove() {
        console.log("handle move")
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/cmd_vel",
            messageType: "geometry_msgs/Twist"
        });

        var twist = new window.ROSLIB.Message({
            linear:{
                x:0,
                y:0,
                z:0,
            },
            angular:{
                x:0,
                y:0,
                z:0,
            },
        })
        cmd_vel.publish(twist)
    }

    handleStop() {
        console.log("handle stop")
    }
    render(){
        return (
            <div>
                <Joystick size={100} baseColor="red" stickColor="blue" move={this.handleMove} stop={this.handleStop}></Joystick>
            </div>
        );
    }
}

export default Teleoperation;