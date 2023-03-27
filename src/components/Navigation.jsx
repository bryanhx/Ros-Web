import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Config from "../scripts/config";

class Navigation extends Component{

    state = { ros : null};

    constructor() {
        super();
        this.init_connection();
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)
    }

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", ()=>{
            console.log("connection established in Navigation!");
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

    handleClick1() {
        console.log("Navigate to A")
        var actionClient = new window.ROSLIB.ActionClient({
            ros : this.state.ros,
            serverName : '/move_base',
            actionName : 'move_base_msgs/MoveBaseAction'
          });
        
          
          var positionVec3 = new window.ROSLIB.Vector3(null);
          var orientation = new window.ROSLIB.Quaternion({x:0, y:0, z:0, w:1.0});
          
          positionVec3.x = 0.895;
          positionVec3.y = -0.136;
        
          var pose = new window.ROSLIB.Pose({
            position : positionVec3,
            orientation : orientation
          });
        
          var goal = new window.ROSLIB.Goal({
              actionClient : actionClient,
              goalMessage : {
                target_pose : {
                  header : {
                    frame_id : '/map'
                  },
                  pose : pose
                }
              }
            });

            goal.send();
    }

    handleClick2() {
        console.log("Navigate to B")
        var actionClient = new window.ROSLIB.ActionClient({
            ros : this.state.ros,
            serverName : '/move_base',
            actionName : 'move_base_msgs/MoveBaseAction'
          });
        
          
          var positionVec3 = new window.ROSLIB.Vector3(null);
          var orientation = new window.ROSLIB.Quaternion({x:0, y:0, z:0, w:1.0});
          
          positionVec3.x = 0.846;
          positionVec3.y = 0.326;
        
          var pose = new window.ROSLIB.Pose({
            position : positionVec3,
            orientation : orientation
          });
        
          var goal = new window.ROSLIB.Goal({
              actionClient : actionClient,
              goalMessage : {
                target_pose : {
                  header : {
                    frame_id : '/map'
                  },
                  pose : pose
                }
              }
            });

            goal.send();
    }

    render(){
        return (
            <div>
            <Button variant="outline-primary" onClick={this.handleClick1}>Location A</Button>
            <Button variant="outline-primary" onClick={this.handleClick2}>Location B</Button>
            </div>
        );
    }
}

export default Navigation;