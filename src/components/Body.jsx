import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Connection from './Connection';
import Teleoperation from './Teleoperation';
import Map from './Map';
import Map_new from './Map_new';
import Stop from './Stop';
import Navigation from './Navigation';
import {Row,Col,Button} from 'react-bootstrap';

class Body extends Component{
    render(){
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Connection />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Map_new />
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                        <Stop />
                        <Navigation />
                </Container>
            </div>
        );
    }
}

export default Body;