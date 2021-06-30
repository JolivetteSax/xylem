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
    this.handleHalfGallonPrice = this.handleHalfGallonPrice.bind(this);
    this.handleQuartPrice = this.handleQuartPrice.bind(this);
    this.handlePintPrice = this.handlePintPrice.bind(this);

    this.state = {
      bulkPricePerPound: 2.6,
      barrelSize: 40, // in gallons
      numBarrels: 41, // from 70,000G Sap
      
      gallonPriceRetail: 54,
      gallonContainerPrice: 2.37,
      gallonCount: 18,

      halfGallonPriceRetail: 30,
      halfGallonContainerPrice: 1.84,
      halfGallonCount: 15,

      quartPriceRetail: 18,
      quartContainerPrice: 1.43,
      quartCount: 36,

      pintPriceRetail: 10,
      pintContainerPrice: 1.22,
      pintCount: 20,

      halfPintPriceRetail: 6,
      halfPintContainerPrice: 1.17,
      halfPintCount: 8,

      wholeSaleDiscount: .8,

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
  handleHalfGallonPrice(ev) {
    this.setState({ halfGallonPriceRetail: ev.target.value });
  }
  handleQuartPrice(ev) {
    this.setState({ quartPriceRetail: ev.target.value });
  }
  handlePintPrice(ev) {
    this.setState({ pintPriceRetail: ev.target.value });
  }
  handleHalfPintPrice(ev) {
    this.setState({ halfPintPriceRetail: ev.target.value });
  }

  render() {

    const bulkPricePerGallon = this.state.bulkPricePerPound * this.state.syrupWeight;
    const barrelValue = this.state.barrelSize * bulkPricePerGallon;
    const syrupGallons = this.state.barrelSize * this.state.numBarrels;

    const gallonWholesalePrice = this.state.gallonPriceRetail * this.state.wholeSaleDiscount;
    const halfGallonWholesalePrice = this.state.halfGallonPriceRetail * this.state.wholeSaleDiscount;
    const quartWholesalePrice = this.state.quartPriceRetail * this.state.wholeSaleDiscount;
    const pintWholesalePrice = this.state.pintPriceRetail * this.state.wholeSaleDiscount;
    const halfPintWholesalePrice = this.state.halfPintPriceRetail * this.state.wholeSaleDiscount;

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
                              <Form.Group controlId="gallonprice">
                                <Form.Label>Per Gallon</Form.Label>
                                <Form.Control type="text" onChange={this.handleGallonPrice} value={this.state.gallonPriceRetail} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId="halfgal">
                                <Form.Label>Per Half-Gallon</Form.Label>
                                <Form.Control type="text" onChange={this.handleHalfGallonPrice} value={this.state.halfGallonPriceRetail} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId="quart">
                                <Form.Label>Per Quart</Form.Label>
                                <Form.Control type="text" onChange={this.handleQuartPrice} value={this.state.quartPriceRetail} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group controlId="pint">
                                <Form.Label>Per Pint</Form.Label>
                                <Form.Control type="text" onChange={this.handlePintPrice} value={this.state.pintPriceRetail} />
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
                          <tr><td>Gallons of Syrup</td><td>{syrupGallons} gallons</td></tr>
                          <tr><td>Bulk Price per Gallon</td><td>${bulkPricePerGallon.toFixed(2)}</td></tr>
                          <tr><td>Value per Barrel</td><td>${barrelValue.toFixed(2)}</td></tr>
                          <tr><td>Total Bulk Value</td><td>${(barrelValue * this.state.numBarrels).toFixed(2)}</td></tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                </Row>


                <Row style={{ marginTop: '10px' }}>
                  <Col>

                    <Card>
                      <Card.Header>Retail Value</Card.Header>
                      <Table bordered hover>
                        <thead>
                          <tr><th>Size</th><th>Each</th><th>Bulk Margin Per Gallon</th><th>Maximum Profit</th></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Gallon Jugs</td>
                            <td>${this.state.gallonPriceRetail}</td>
                            <td>${(this.state.gallonPriceRetail - bulkPricePerGallon - this.state.gallonContainerPrice).toFixed(2)}</td>
                            <td>${((this.state.gallonPriceRetail - bulkPricePerGallon - this.state.gallonContainerPrice) * syrupGallons).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Half Gallon Jugs</td>
                            <td>${this.state.halfGallonPriceRetail}</td>
                            <td>${(this.state.halfGallonPriceRetail*2 - bulkPricePerGallon - this.state.halfGallonContainerPrice*2).toFixed(2)}</td>
                            <td>${((this.state.halfGallonPriceRetail*2 - bulkPricePerGallon - this.state.halfGallonContainerPrice*2) * syrupGallons).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Quart Jugs</td>
                            <td>${this.state.quartPriceRetail}</td>
                            <td>${(this.state.quartPriceRetail*4 - bulkPricePerGallon - this.state.quartContainerPrice*4).toFixed(2)}</td>
                            <td>${((this.state.quartPriceRetail*4 - bulkPricePerGallon - this.state.quartContainerPrice*4) * syrupGallons).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Pint Jugs</td>
                            <td>${this.state.pintPriceRetail}</td>
                            <td>${(this.state.pintPriceRetail*8 - bulkPricePerGallon - this.state.pintContainerPrice*8).toFixed(2)}</td>
                            <td>${((this.state.pintPriceRetail*8 - bulkPricePerGallon - this.state.pintContainerPrice*8) * syrupGallons).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Half-Pint Jugs</td>
                            <td>${this.state.halfPintPriceRetail}</td>
                            <td>${((this.state.halfPintPriceRetail*16) - bulkPricePerGallon - (this.state.halfPintContainerPrice*16)).toFixed(2)}</td>
                            <td>${(((this.state.halfPintPriceRetail*16) - bulkPricePerGallon - (this.state.halfPintContainerPrice*16)) * syrupGallons).toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                </Row>


                <Row style={{ marginTop: '10px' }}>
                  <Col>

                    <Card>
                      <Card.Header>Wholesale Value</Card.Header>
                      <Table bordered hover>
                        <thead>
                          <tr><th>Size</th><th>Each</th><th>Bulk Margin Per Gallon</th><th>Maximum Profit</th></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Gallon Jugs</td>
                            <td>${gallonWholesalePrice.toFixed(2)}</td>
                            <td>${(gallonWholesalePrice - bulkPricePerGallon - this.state.gallonContainerPrice).toFixed(2)}</td>
                            <td>${((gallonWholesalePrice - bulkPricePerGallon - this.state.gallonContainerPrice) * syrupGallons).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Half Gallon Jugs</td>
                            <td>${halfGallonWholesalePrice.toFixed(2)}</td>
                            <td>${(halfGallonWholesalePrice*2 - bulkPricePerGallon - this.state.halfGallonContainerPrice*2).toFixed(2)}</td>
                            <td>${((halfGallonWholesalePrice*2 - bulkPricePerGallon - this.state.halfGallonContainerPrice*2) * syrupGallons).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Quart Jugs</td>
                            <td>${quartWholesalePrice.toFixed(2)}</td>
                            <td>${(quartWholesalePrice*4 - bulkPricePerGallon - this.state.quartContainerPrice*4).toFixed(2)}</td>
                            <td>${((quartWholesalePrice*4 - bulkPricePerGallon - this.state.quartContainerPrice*4) * syrupGallons).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Pint Jugs</td>
                            <td>${pintWholesalePrice.toFixed(2)}</td>
                            <td>${(pintWholesalePrice*8 - bulkPricePerGallon - this.state.pintContainerPrice*8).toFixed(2)}</td>
                            <td>${((pintWholesalePrice*8 - bulkPricePerGallon - this.state.pintContainerPrice*8) * syrupGallons).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Half-Pint Jugs</td>
                            <td>${halfPintWholesalePrice.toFixed(2)}</td>
                            <td>${((halfPintWholesalePrice*16) - bulkPricePerGallon - (this.state.halfPintContainerPrice*16)).toFixed(2)}</td>
                            <td>${(((halfPintWholesalePrice*16) - bulkPricePerGallon - (this.state.halfPintContainerPrice*16)) * syrupGallons).toFixed(2)}</td>
                          </tr>
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
