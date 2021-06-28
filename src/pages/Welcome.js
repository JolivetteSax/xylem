import React, { Component } from 'react';

import Header from '../components/generic/Header';
import '../stylesheets/Welcome.css';

import { Container, Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
export default class Welcome extends Component {

  render() {

    return (
      <div>
        <Header />

        <div className="hero">
          <div className="hero-inner">
            <aside style={{ padding: '32px' }}>
              <div className="hero-text">
                <h2 style={{ fontSize: '48px', fontWeight: '700' }}>
                  Welcome to Xylem
                </h2>
                <br />
                <p>
                  The Xylem project is funded in partnership with Future Generations University
                </p>
                <p>
                  Browse the source code <b><a href="https://github.com/JolivetteSax/xylem">here</a></b>
                </p>
                <p>
                  Visit the University homepage at <b><a href="https://www.future.edu/">future.edu</a></b>
                </p>
              </div>
            </aside>
          </div>
        </div>

        <div>
          <Container style={{ width: "100%", marginTop: '5px' }}>
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Header>Cost Calculations</Card.Header>
                  <Card.Body>
                  <Link to='/calc/vacuum'>Vacuum Pump</Link>
                  <br/>
                  <Link to='/calc/tubing'>Tubing Costs</Link>
                  <br/>
                  <Link to='/calc/sapPricing'>Sap Pricing</Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

      </div>
    )
  }
}

