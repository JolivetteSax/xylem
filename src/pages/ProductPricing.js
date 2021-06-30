import React from 'react';
import '../stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Table } from 'react-bootstrap';
import Header from '../components/generic/Header';

export default class ProductPricing extends React.Component {
  constructor(props) {
    super(props);
    this.handleBulkPrice = this.handleBulkPrice.bind(this);
    this.handleBarrelCount = this.handleBarrelCount.bind(this);
    this.handleGallonPrice = this.handleGallonPrice.bind(this);
    this.state = {
      bulkPricePerPound: 2.6,
      barrelSize: 40, // in gallons
      numBarrels: 41, // from 70,000G Sap
      gallonPriceRetail: 54,
      gallonContainerPrice: 2.37,
      gallonCount: 10,
      syrupWeight: 11.358, // XXX 67 brix according to USDA? previously 11.128
    };
  }

  handleBarrelCount(ev) {
    this.setState({ numBarrels: ev.target.value });
  }
  handleBulkPrice(ev) {
    this.setState({ bulkPricePerPound: ev.target.value });
  }
  handleGallonPrice(ev) {
    this.setState({ gallonPriceRetail: ev.target.value });
  }

  render() {

    const bulkPricePerGallon = this.state.bulkPricePerPound * this.state.syrupWeight;
    const barrelValue = this.state.barrelSize * bulkPricePerGallon;

    return (
      <div>
        <Header />
        <div className="App">
          <Container style={{ width: "100%", marginTop: '5px' }}>
            <Row>
              <Col md={3}>
                <img src='/img/tubing.png' alt="Placeholder" />
              </Col>
              <Col md={8} lg={9}>
                <Card>
                  <Card.Header><b>Product Pricing Estimates</b></Card.Header>
                  <Card.Body>

                    <Row>
                      <Col>
                        <Form style={{ textAlign: 'left' }} onSubmit={event => event.preventDefault()}>
                          <Col>
                            <Form.Group controlId="barrelcount">
                              <Form.Label>Number of 40 Gallon Barrels</Form.Label>
                              <Form.Control type="text" onChange={this.handleBarrelCount} value={this.state.numBarrels} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group controlId="bulkPrice">
                              <Form.Label>Bulk price per pound</Form.Label>
                              <Form.Control type="text" onChange={this.handleBulkPrice} value={this.state.bulkPricePerPound} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </Col>
                        </Form>
                      </Col>
                      <Col>
                        <Card>
                          <Card.Header>Retail Prices</Card.Header>
                          <Form style={{ textAlign: 'left' }} onSubmit={event => event.preventDefault()}>
                            <Col>
                              <Form.Group controlId="barrelcount">
                                <Form.Label>Per Gallon</Form.Label>
                                <Form.Control type="text" onChange={this.handleGallonPrice} value={this.state.gallonPriceRetail} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </Col>

                          </Form>

                        </Card>
                      </Col>
                    </Row>



                  </Card.Body>
                </Card>
                <Row style={{ marginTop: '10px' }}>
                  <Col>

                    <Card>
                      <Card.Header>Bulk</Card.Header>
                      <Table bordered hover>
                        <tbody>
                          <tr><td>Barrel Size</td><td>{this.state.barrelSize} gallons</td></tr>
                          <tr><td>Bulk Price per Gallon</td><td>${bulkPricePerGallon.toFixed(2)}</td></tr>
                          <tr><td>Value per Barrel</td><td>${barrelValue.toFixed(2)}</td></tr>
                          <tr><td>Total Bulk Value</td><td>${(barrelValue * this.state.numBarrels).toFixed(2)}</td></tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                </Row>



              </Col>

            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
