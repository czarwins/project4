import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap';
import styled from 'styled-components'


const LandingPageStyle = styled.div`
    text-align: center;
    padding: 250px;
    `;


class LandingPage extends Component {

    render() {
        return (

     <Container>
     
         <LandingPageStyle>
                <Link to="/projects">
                
                    
                <img src={"./images/logo.ico"} height={150} width={150} alt=''/>
                <h1>Projectile </h1>
                </Link>
                </LandingPageStyle>
            </Container>
           
        );
    }
}

export default LandingPage;