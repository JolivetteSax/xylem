import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Table } from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTaps = this.handleTaps.bind(this);
    this.handleSaps = this.handleSaps.bind(this);
    this.state = {
      taps: 1000,
      saps: 10,
    }
  }
  handleTaps(ev) {
    this.setState({ taps: ev.target.value });
  }
  handleSaps(ev) {
    this.setState({ saps: ev.target.value });
  }

  render() {

    let yield0 = this.state.taps * this.state.saps;
    let cfm0 = 0;
    let val0 = (yield0 / 43) * 33
    let cost0 = (cfm0 * 100) / 10;
    let net0 = val0 - cost0;


    let yield15 = yield0 * 1.75
    let cfm15 = this.state.taps * .01;
    let val15 = (yield15 / 43) * 33;
    let cost15 = ((cfm15 * 200) / 5) * 1.2;
    let net15 = val15 - cost15;
    let diff15 = net15 - net0;

    let yield20 = yield0 * 2.00
    let cfm20 = cfm15 / (1 - 5 * 0.08);
    let val20 = (yield20 / 43) * 33;
    let cost20 = ((cfm20 * 200) / 5) * 1.2;
    let net20 = val20 - cost20;
    let diff20 = net20 - net0;

    let yield25 = yield0 * 2.25
    let cfm25 = cfm15 / (1 - 10 * 0.08);
    let val25 = (yield25 / 43) * 33;
    let cost25 = ((cfm25 * 200) / 5) * 1.2;
    let net25 = val25 - cost25;
    let diff25 = net25 - net0;


    return (
      <div className="App">
        <Container style={{ marginTop: '5px' }}>
          <Row>
            <Col md={3}>
              <img src='/img/sap_collection.png' alt="information about rule of 86" />
            </Col>
            <Col md={8}>
              <Card>
                <Card.Header>Yield Calculator - Vacuum costs</Card.Header>
                <Card.Body>
                  <Row>
                    <Form >
                      <Col>
                        <Form.Group controlId="formTapCount">
                          <Form.Label>Number of Taps</Form.Label>
                          <Form.Control type="text" onChange={this.handleTaps} value={this.state.taps} />
                          <Form.Text className="text-muted">
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formSapAmount">
                          <Form.Label>Sap per tap(in gallons)</Form.Label>
                          <Form.Control type="text" onChange={this.handleSaps} value={this.state.saps} />
                          <Form.Text className="text-muted">
                          </Form.Text>
                        </Form.Group>
                      </Col>

                    </Form>
                  </Row>

                  <Row style={{ marginTop: '20px' }}>
                    <Col md={12}>
                      <Card>
                        <Card.Title>No Vacuum</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Assuming a market value of 3$/Gal</Card.Subtitle>

                        Sap Yield {yield0} gallons<br />
                        Market Value ${val0.toFixed(2)}
                      </Card>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '10px' }}>
                    <Col>

                      <Card>
                        <Card.Header>Vacuum 15"</Card.Header>
                        <Table striped bordered hover>
                          <tr><td>Sap Yield</td><td>{yield15}</td></tr>
                          <tr><td>CFM req'd</td><td>{cfm15}</td></tr>
                          <tr><td>Market Value</td><td>${val15.toFixed(2)}</td></tr>
                          <tr><td>Pump costs</td><td> ${cost15.toFixed(2)}</td></tr>
                          <tr><td>Net Return</td><td>${net15.toFixed(2)}</td></tr>
                          <tr><td>Difference</td><td><b>${diff15.toFixed(2)}</b></td></tr>
                        </Table>
                      </Card>
                    </Col>

                    <Col>

                      <Card>
                        <Card.Header>Vacuum 20"</Card.Header>
                        <Table striped bordered hover>
                        <tr><td>Sap Yield</td><td>{yield20}</td></tr>
                          <tr><td>CFM req'd</td><td>{cfm20.toFixed(1)}</td></tr>
                          <tr><td>Market Value</td><td>${val20.toFixed(2)}</td></tr>
                          <tr><td>Pump costs</td><td>${cost20.toFixed(2)}</td></tr>
                          <tr><td>Net Return</td><td>${net20.toFixed(2)}</td></tr>
                          <tr><td>Difference</td><td><b>${diff20.toFixed(2)}</b></td></tr>
                        </Table>
                      </Card>


                    </Col>

                    <Col>
                      <Card>
                        <Card.Header>Vacuum 25"</Card.Header>
                        <Table striped bordered hover>
                        <tr><td>Sap Yield</td><td>{yield25}</td></tr>
                     
                          <tr><td>CFM req'd</td><td>{cfm25.toFixed(1)}</td></tr>
                          <tr><td>Market Value</td><td>${val25.toFixed(2)}</td></tr>
                          <tr><td>Pump costs</td><td>${cost25.toFixed(2)}</td></tr>
                          <tr><td>Net Return</td><td>${net25.toFixed(2)}</td></tr>
                          <tr><td>Difference</td><td><b>${diff25.toFixed(2)}</b></td></tr>
                        </Table>

                      </Card>
                    </Col>

                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={1}>
              <a href="https://github.com/JolivetteSax/xylem">π</a>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
