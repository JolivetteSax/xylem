import React from 'react';
import '../stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Table } from 'react-bootstrap';
import Header from '../components/generic/Header';

export default class FuelCosts extends React.Component {
  constructor(props) {
    super(props);
    this.handleSapInput = this.handleSapInput.bind(this);
    this.handleBrixInput = this.handleBrixInput.bind(this);
    this.handleROBrixInput = this.handleROBrixInput.bind(this);
    this.handleCompressorBrixInput = this.handleCompressorBrixInput.bind(this);

    this.handlePricePerCord = this.handlePricePerCord.bind(this);
    this.handlePricePerTonCoal = this.handlePricePerTonCoal.bind(this);
    this.handlePricePerGalOil = this.handlePricePerGalOil.bind(this);
    this.handlePricePerTherm = this.handlePricePerTherm.bind(this);
    this.handlePricePerLPGal = this.handlePricePerLPGal.bind(this);
    this.handlePricePerKWH = this.handlePricePerKWH.bind(this);

    this.state = {
      sapGallons: 70000,
      brix: 2.01,
      roBrix: 6,
      compressorBrix: 14.5,

      pricePerCord: 95.00,
      pricePerTonCoal: 140.00,
      pricePerGalOil: 1.89,
      pricePerTherm: .82,
      pricePerLPGal: 1.42,
      pricePerKWH: .08,

      //Btu's per gallon of water evaporated 					 9,396
      //Btu's per gallon of water frozen					 1,187
      btuPerGallonEvap: 9396,
      btuPerGallonFrozen: 1187,

      //kWh/gallon of water removed
      kwhPerGalRO: 0.012,
      kwhPerGalVac: 0.12,
      kwhPerGalVaporComp: .110,
      kwhPerGalFreeze: .245,
      kwhPerGalMicro: .9,

      woodEfficiency: .40,
      coalEfficiency: .40,
      oilEfficiency: .75,
      gasEfficiency: .75,
      archEfficiency: .65,
      preheaterEfficiency: .15,
      steamAwayEfficiency: .65, 
      electricEfficiency: 1, // XXX - i think?
    }
  }

  handleSapInput(ev) {
    this.setState({ sapGallons: ev.target.value });
  }

  handleBrixInput(ev) {
    this.setState({ brix: ev.target.value });
  }
  handleROBrixInput(ev) {
    this.setState({ roBrix: ev.target.value });
  }
  handleCompressorBrixInput(ev) {
    this.setState({ compressorBrix: ev.target.value });
  }
  handlePricePerCord(ev) {
    this.setState({ pricePerCord: ev.target.value });
  }
  handlePricePerTonCoal(ev) {
    this.setState({ pricePerTonCoal: ev.target.value });
  }
  handlePricePerGalOil(ev) {
    this.setState({ pricePerGalOil: ev.target.value });
  }
  handlePricePerTherm (ev) {
    this.setState({ pricePerTherm: ev.target.value });
  }
  handlePricePerLPGal(ev) {
    this.setState({ pricePerLPGal: ev.target.value });
  }
  handlePricePerKWH (ev) {
    this.setState({ pricePerKWH: ev.target.value });
  }

  render() {

    const mBTUWood = this.state.pricePerCord / (23000000 / 1000000); //=(F22/(C22/1000000))
    const mBTUCoal = this.state.pricePerTonCoal / (24000000 / 1000000) ; // =F23/(C23/1000000)
    const mBTUOil =  (1000000 / 138000) * this.state.pricePerGalOil ; //=(1000000/C24)*F24
    const mBTUGas = (1000000 / 100000) * this.state.pricePerTherm ; //=(1000000/C25)*F25
    const mBTULP = (1000000 / 93000) * this.state.pricePerLPGal ;  //=(1000000/C26)*F26
    const mBTUElec =  (1000000 / 3412) * this.state.pricePerKWH ; //=(1000000/C27)*F27

    const syrupGallons = this.state.sapGallons / (86 / this.state.brix); // =E10/(86/E7);

    /* Open Pan calculations 
       These compute cost per gallon water removed
       =(             F29/  C22         ) * (       F22 / G14)
       ( btuPerGallonEvap / magicNumber ) * (unit price / efficiency)
       the cost pergallon of syrup and total cost can calculate in a loop since they are all the same
       cost per gal of syrup =((86/ brix )-1) * ( cost per gallon water removed )
    */
    const base = {
      Wood: (this.state.btuPerGallonEvap / 23000000) * (this.state.pricePerCord / this.state.woodEfficiency),  
      Coal: (this.state.btuPerGallonEvap / 24000000) * (this.state.pricePerTonCoal / this.state.coalEfficiency),
      "Fuel Oil": (this.state.btuPerGallonEvap / 138000) * (this.state.pricePerGalOil / this.state.oilEfficiency),  
      "Natural Gas": (this.state.btuPerGallonEvap / 100000) * (this.state.pricePerTherm / this.state.gasEfficiency),
      "LP Gas": (this.state.btuPerGallonEvap / 93000 ) * (this.state.pricePerLPGal / this.state.gasEfficiency ),
      "Wood (air-tight arch)": (this.state.btuPerGallonEvap / 23000000 ) * (this.state.pricePerCord / this.state.archEfficiency), 
      "Coal (air-tight arch)": (this.state.btuPerGallonEvap / 24000000 ) * (this.state.pricePerTonCoal / this.state.archEfficiency), 
      "Electricity": (this.state.btuPerGallonEvap / 3412 ) * (this.state.pricePerKWH / this.state.electricEfficiency), 
    }

    //
    const openPan = {
       base, 
    }

    const descriptions = {
      base: "Base"
    }

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
                  <Card.Header><b>Fuel Cost Analysis</b></Card.Header>
                  <Card.Body>

                    <Row>
                      <Col>
                      <Card>
                            <Card.Header>Inputs</Card.Header>
                      
                        <Form style={{ textAlign: 'left' }} onSubmit={event => event.preventDefault()}>
                          <Col>
                            <Form.Group controlId="formGallons">
                              <Form.Label>Gallons of sap (input number)</Form.Label>
                              <Form.Control type="text" onChange={this.handleSapInput} value={this.state.sapGallons} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </Col>

                          <Col>
                            <Form.Group controlId="formTapCount">
                              <Form.Label>Brix of sap (input Number)</Form.Label>
                              <Form.Control type="text" onChange={this.handleBrixInput} value={this.state.brix} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group controlId="formSapAmount">
                              <Form.Label> Brix of sap conc. Reverse Osmosis</Form.Label>
                              <Form.Control type="text" onChange={this.handleROBrixInput} value={this.state.roBrix} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group controlId="formSapAmount">
                              <Form.Label>Brix of sap conc. Vapor Compressor</Form.Label>
                              <Form.Control type="text" onChange={this.handleCompressorBrixInput} value={this.state.compressorBrix} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </Col>
                        </Form>
                        </Card>
                      </Col>
                      <Col>
                        <Card>
                          <Card.Header>Fuel Costs</Card.Header>
                          <Form style={{ textAlign: 'left' }} onSubmit={event => event.preventDefault()} >
                            <Col>
                              <Form.Group controlId="pricePerCord">
                                <Form.Label>Wood Price (per cord)</Form.Label>
                                <Form.Control type="text" onChange={this.handlePricePerCord} value={this.state.pricePerCord} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </Col>


                            <Col>
                              <Form.Group controlId="pricePerton">
                                <Form.Label>Coal Price (per ton)</Form.Label>
                                <Form.Control type="text" onChange={this.handlePricePerTonCoal} value={this.state.pricePerTonCoal} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </Col>


                            <Col>
                              <Form.Group controlId="pricePergaloil">
                                <Form.Label>Fuel Oil (per Gallon)</Form.Label>
                                <Form.Control type="text" onChange={this.handlePricePerGalOil} value={this.state.pricePerGalOil} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </Col>


                            <Col>
                              <Form.Group controlId="pricePertherm">
                                <Form.Label>Natural Gas (per Therm)</Form.Label>
                                <Form.Control type="text" onChange={this.handlePricePerTherm} value={this.state.pricePerTherm} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </Col>

                            <Col>
                              <Form.Group controlId="pricePertherm">
                                <Form.Label>LP Gas (Per Gallon)</Form.Label>
                                <Form.Control type="text" onChange={this.handlePricePerLPGal} value={this.state.pricePerLPGal} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                              </Form.Group>
                            </Col>


                            <Col>
                              <Form.Group controlId="pricePertherm">
                                <Form.Label>Electricity (per KWH)</Form.Label>
                                <Form.Control type="text" onChange={this.handlePricePerKWH} value={this.state.pricePerKWH} />
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
                      <Card.Header>Calculations</Card.Header>
                      <Row>
                        <Col>
                          <h4>Est Syrup Yield: {syrupGallons.toFixed(0)} gallons</h4>


                          <Card>
                            <Card.Header>Fuel Comparison (Dollars per million BTU)</Card.Header>
                            <Row>
                              <Col>

                                <Table bordered hover>
                                  <tbody>
                                  <tr><td>Wood</td><td>${mBTUWood.toFixed(2)}</td></tr>
                                  <tr><td>Coal</td><td>${mBTUCoal.toFixed(2)}</td></tr>
                                  <tr><td>Fuel Oil</td><td>${mBTUOil.toFixed(2)}</td></tr>
                                  <tr><td>Natural Gas</td><td>${mBTUGas.toFixed(2)}</td></tr>
                                  <tr><td>LP Gas</td><td>${mBTULP.toFixed(2)}</td></tr>
                                  <tr><td>Electricity</td><td>${mBTUElec.toFixed(2)}</td></tr>
                                  </tbody>
                                </Table>
                              </Col>
                            </Row>
                          </Card>


                        {Object.keys(openPan).map((key) => 
                          <Card style={{marginTop:'10px'}}>
                          <Card.Header>Open Pan Evaporation {descriptions[key]}</Card.Header>
                          <Row>
                            <Col>
                              <Table bordered hover>
                                <thead>
                                <tr>
                                  <th>Fuel</th>
                                  <th>Cost per gallon of water removed</th>
                                  <th>Cost per gallon of Syrup</th>
                                  <th>Total Cost</th>
                                </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(openPan[key]).map((fuel) => 
                                    <tr>
                                      <td>{fuel}</td>
                                      <td>${openPan[key][fuel].toFixed(3)}</td>
                                      <td>${(((86 / this.state.brix) - 1 )*openPan[key][fuel]).toFixed(2)}</td> {/** =((86/E7)-1)*E78*/}
                                      <td>${(((86 / this.state.brix) - 1 )*openPan[key][fuel] * syrupGallons).toFixed(2)}</td> {/** times sap */}
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                        </Card>

                        )}


                        </Col>
                      </Row>
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
