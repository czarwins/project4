import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Col } from 'reactstrap';
import styled from 'styled-components'
import Map from './Map'

const SidebarStyles = styled.div`
    background-image: url('../../images/sidebarbg.webp');
    /* background-repeat: no-repeat; */
    background-size: cover;
    height: 100vh;
    /* width: 100vw; */
`

class Sidebar extends Component {
    render() {
        return (
            <React.Fragment>
            <SidebarStyles>
            <Col xs="3">
                {this.props.children}
            </Col>
            <Map/>
            </SidebarStyles>
            </React.Fragment>
        );
    }
}

export default withRouter(Sidebar);        