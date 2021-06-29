import React from 'react';
import '../stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Table, Dropdown } from 'react-bootstrap';
import Header from '../components/generic/Header';

export default class Tubing extends React.Component {
  constructor(props) {
    super(props);
    this.handleTrees = this.handleTrees.bind(this);
    this.handleLaterals = this.handleLaterals.bind(this);
    this.toggleSpoutsStubs = this.toggleSpoutsStubs.bind(this);
    this.toggleBlackBlue = this.toggleBlackBlue.bind(this);

    this.state = {
      trees: 120,
      lats: 12,
      spouts: true,
      checkValve: true,
      black: true,
      saddlePrice: 2.95,
      spoutPrice: .39,
      stubPrice: .29,
      adapterPrice: .21,
      tPrice: .24,
      yPrice: .77,
      hookedPrice: .33,
      lateralEndPrice: .09,
      dropLinePrice: .09,
      latLinePrice: .09,
      blueMainPrice: .42,
      blackMainPrice: .38,

      mainWirePrice: .06,
      tiesPrice: .01,
      gripsPrice: 1.75,
      hooksPrice: 3.50,
      tensionersPrice: 5.95,
      sideTiePrice: .07,
      mainValves: 52,
    }
  }

  toggleBlackBlue(key) {
    let black = false;
    if (key === 'black') {
      black = true;
    }
    this.setState({ black });
  }

  toggleSpoutsStubs(key) {
    let spouts = false;
    console.log(key);
    if (key === 'spouts') {
      spouts = true;
    }
    this.setState({ spouts });
  }

  handleTrees(ev) {
    this.setState({ trees: ev.target.value });
  }
  handleLaterals(ev) {
    this.setState({ lats: ev.target.value });
  }

  render() {

    let treesPerAcre = this.state.trees; //B3= 120;
    let treesPerLine = this.state.lats; //B4 = 12;

    const avgTreeDistance = Math.sqrt(43560 / treesPerAcre);
    const avgLenLateralLine = avgTreeDistance * (treesPerLine - 0.5);
    const latLinesPerAcre = treesPerAcre / treesPerLine; // B3/B410.0,
    const mainLineLenPerAcre = latLinesPerAcre * avgTreeDistance; // B7 * B5 190.5,
    const lateralLineTotalLength = latLinesPerAcre * avgLenLateralLine; 	// B7 * B6 2191.0,

    const loopLength = latLinesPerAcre * 3;// 5/16 lines end tree loop
    const dropLineLength = treesPerAcre * 2.5; //  5/16th in drop lines 30 foot each

    const wireTieCount = mainLineLenPerAcre / 1.5; // b8 / 1.5;

    let spoutSubTot = this.state.spoutPrice * this.state.trees;
    let stubSubTot = this.state.stubPrice * this.state.trees;
    let adapterSubTot = this.state.adapterPrice * this.state.trees;
    if (this.state.spouts) {
      stubSubTot = 0;
      adapterSubTot = 0;
    }
    else {
      spoutSubTot = 0;
    }

    const saddlesSubTot = this.state.saddlePrice * latLinesPerAcre;
    const tSubTot = this.state.tPrice * (treesPerAcre - latLinesPerAcre);  //=(B3-B7)*B26
    const ySubTot = this.state.yPrice * (latLinesPerAcre);
    const hookedSubTot = this.state.hookedPrice * latLinesPerAcre;
    const loopSubTot = this.state.lateralEndPrice * loopLength;

    const fittingsSubTot = saddlesSubTot + tSubTot + ySubTot + hookedSubTot + loopSubTot;

    const dropLinesSubTot = this.state.dropLinePrice * dropLineLength;
    const lateralLineSubTot = this.state.latLinePrice * lateralLineTotalLength;
    let mainLineSubTot = mainLineLenPerAcre * this.state.blueMainPrice;// b8 * price

    if (this.state.black) {
      mainLineSubTot = mainLineLenPerAcre * this.state.blackMainPrice;
    }

    const tubingSubTot = dropLinesSubTot + lateralLineSubTot + mainLineSubTot;

    const mainLineWireSubTot = mainLineLenPerAcre * this.state.mainWirePrice;
    const wireTieSubTot = this.state.tiesPrice * wireTieCount;
    const gripsSubTot = this.state.gripsPrice * 3; // XXX: magic!
    const hooksSubTot = this.state.hooksPrice * 2;
    const tensionersSubTot = this.state.tensionersPrice * 1;
    const sideTieSubTot = this.state.sideTiePrice * 76.14; // seems to be erroneous in the spreadsheet
    const valveSubTot = 17.33; // Predetermined?

    const wireSubTot = mainLineWireSubTot + wireTieSubTot + gripsSubTot + hooksSubTot + tensionersSubTot + sideTieSubTot + valveSubTot;

    const totalCost = spoutSubTot + stubSubTot + adapterSubTot + fittingsSubTot + tubingSubTot + wireSubTot;
    const costPerTap = totalCost / treesPerAcre;

    return (
      <div>
        <Header />
        <div className="App">
          <Container style={{ width: "100%", marginTop: '5px' }}>
            <Row>
              <Col md={3}>
                <img src='/img/tubing.png' alt="Placeholder for tubing image" />
              </Col>
              <Col md={8} lg={9}>
                <Card>
                  <Card.Header><b>Cost of putting up maple tubing</b></Card.Header>
                  <Card.Body>

                    <Row>
                      <Col>
                        <Form style={{ textAlign: 'left' }}>
                          <Col>
                            <Form.Group controlId="formTapCount">
                              <Form.Label>Number of Trees per acre</Form.Label>
                              <Form.Control type="text" onChange={this.handleTrees} value={this.state.trees} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group controlId="formSapAmount">
                              <Form.Label>Number of trees per lateral line</Form.Label>
                              <Form.Control type="text" onChange={this.handleLaterals} value={this.state.lats} />
                              <Form.Text className="text-muted">
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Row>
                            <Col><hr /></Col>
                          </Row>
                          <Row>
                            <Col><p>Options:</p></Col>
                          </Row>

                          <Row>
                            <Col>
                              <Form.Group controlId="spoutsstubs">
                                <Form.Label>Spouts Vs Stubs</Form.Label>

                                <Dropdown onSelect={this.toggleSpoutsStubs}>
                                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.spouts ? 'Spouts' : 'Stubs'}
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item eventKey="spouts">Spouts</Dropdown.Item>
                                    <Dropdown.Item eventKey="stubs">Stubs</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </Form.Group>
                            </Col>

                            <Col>
                              <Form.Group controlId="formblackblue">
                                <Form.Label>Main Lines</Form.Label>

                                <Dropdown onSelect={this.toggleBlackBlue}>
                                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.black ? 'Black' : 'Blue'}
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item eventKey="black">Black</Dropdown.Item>
                                    <Dropdown.Item eventKey="blue">Blue</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </Form.Group>
                            </Col>

                          </Row>
                        </Form>
                      </Col>
                      <Col>
                        <Card>
                          <Card.Header>Estimated Costs</Card.Header>

                          <Table bordered hover>
                            <tbody>
                              <tr><td>Spouts/Stubs: </td><td>${(spoutSubTot + stubSubTot).toFixed(2)}</td></tr>
                              <tr><td>Fittings: </td><td>${fittingsSubTot.toFixed(2)}</td></tr>
                              <tr><td>Tubing: </td><td>${tubingSubTot.toFixed(2)}</td></tr>
                              <tr><td>Hardware: </td><td>${wireSubTot.toFixed(2)}</td></tr>
                              <tr><td><b>Total per acre: </b></td><td><b>${totalCost.toFixed(2)}</b></td></tr>
                              <tr><td><b>Cost per tap: </b></td><td><b>${costPerTap.toFixed(2)}</b></td></tr>
                            </tbody>
                          </Table>
                        </Card>
                      </Col>
                    </Row>



                  </Card.Body>
                </Card>
                <Row style={{ marginTop: '10px' }}>
                  <Col>

                    <Card>
                      <Card.Header>Length Calculations</Card.Header>
                      <Table bordered hover>
                        <tbody>
                          <tr><td>Average Tree Distance</td><td>{avgTreeDistance.toFixed(2)}</td></tr>
                          <tr><td>Lateral Lines Per Acre</td><td>{latLinesPerAcre.toFixed(2)}</td></tr>
                          <tr><td>Main Line Length per acre</td><td>{mainLineLenPerAcre.toFixed(2)}</td></tr>
                          <tr><td>Lateral Line Total Length</td><td>{lateralLineTotalLength.toFixed(2)}</td></tr>
                          <tr><td>Loop Length</td><td>{loopLength.toFixed(2)}</td></tr>
                          <tr><td>Drop Line Length</td><td>{dropLineLength.toFixed(2)}</td></tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                </Row>


                <Row style={{ marginTop: '10px' }}>
                  <Col>
                    {this.state.spouts &&
                      <Card>
                        <Card.Header>Spouts</Card.Header>
                        <Table bordered hover>
                          <tbody>
                            <tr><td>Spouts: </td><td>${this.state.spoutPrice.toFixed(2)}</td><td>${spoutSubTot.toFixed(2)}</td></tr>

                          </tbody>
                        </Table>
                      </Card>
                    }
                    {!this.state.spouts &&
                      <Card>
                        <Card.Header>Stubs</Card.Header>
                        <Table bordered hover>
                          <tbody>
                          <tr><td>Stubs: </td><td>${this.state.stubPrice.toFixed(2)}</td><td>${stubSubTot.toFixed(2)}</td></tr>
                          <tr><td>Adapters: </td><td>${this.state.adapterPrice.toFixed(2)}</td><td>${adapterSubTot.toFixed(2)}</td></tr>

                          </tbody>
                        </Table>
                      </Card>
                    }
                    
                  </Col>

                </Row>

                <Row style={{ marginTop: '10px' }}>
                  <Col>

                    <Card>
                      <Card.Header>Fittings</Card.Header>
                      <Table bordered hover>
                        <tbody>
                          <tr><td>Saddles: </td><td>${this.state.saddlePrice.toFixed(2)}</td><td>${saddlesSubTot.toFixed(2)}</td></tr>
                          <tr><td>T's: </td><td>${this.state.tPrice.toFixed(2)}</td><td>${tSubTot.toFixed(2)}</td></tr>
                          <tr><td>Y's: </td><td>${this.state.yPrice.toFixed(2)}</td><td>${ySubTot.toFixed(2)}</td></tr>
                          <tr><td>Hooked Connector: </td><td>${this.state.hookedPrice.toFixed(2)}</td><td>${hookedSubTot.toFixed(2)}</td></tr>
                          <tr><td>Lateral End Loop: </td><td>${this.state.lateralEndPrice.toFixed(2)}</td><td>${loopSubTot.toFixed(2)}</td></tr>

                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                </Row>


                <Row style={{ marginTop: '10px' }}>
                  <Col>

                    <Card>
                      <Card.Header>Lines</Card.Header>
                      <Table bordered hover>
                        <tbody>
                          <tr><td>Drop Lines: </td><td>${this.state.dropLinePrice.toFixed(2)}</td><td>${dropLinesSubTot.toFixed(2)}</td></tr>
                          <tr><td>Lateral Lines: </td><td>${this.state.latLinePrice.toFixed(2)}</td><td>${lateralLineSubTot.toFixed(2)}</td></tr>
                          {this.state.black &&
                            <tr><td>Main Lines (black): </td><td>${this.state.blackMainPrice.toFixed(2)}</td><td>${mainLineSubTot.toFixed(2)}</td></tr>
                          }
                          {!this.state.black &&
                            <tr><td>Main Lines (blue): </td><td>${this.state.blueMainPrice.toFixed(2)}</td><td>${mainLineSubTot.toFixed(2)}</td></tr>
                          }

                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                </Row>

                <Row style={{ marginTop: '10px' }}>
                  <Col>

                    <Card>
                      <Card.Header>Hardware (Wire/Misc)</Card.Header>
                      <Table bordered hover>
                        <tbody>
                          <tr><td>Main Line Wire: </td><td>${this.state.mainWirePrice.toFixed(2)}</td><td>${mainLineWireSubTot.toFixed(2)}</td></tr>
                          <tr><td>Wire Ties: </td><td>${this.state.tiesPrice.toFixed(2)}</td><td>${wireTieSubTot.toFixed(2)}</td></tr>
                          <tr><td>Wire Grips: </td><td>${this.state.gripsPrice.toFixed(2)}</td><td>${gripsSubTot.toFixed(2)}</td></tr>
                          <tr><td>Tree Hooks: </td><td>${this.state.hooksPrice.toFixed(2)}</td><td>${hooksSubTot.toFixed(2)}</td></tr>
                          <tr><td>Tensioners: </td><td>${this.state.tensionersPrice.toFixed(2)}</td><td>${tensionersSubTot.toFixed(2)}</td></tr>
                          <tr><td>Side Tie Wire: </td><td>${this.state.sideTiePrice.toFixed(2)}</td><td>${sideTieSubTot.toFixed(2)}</td></tr>
                          <tr><td>Main Line Valves: </td><td></td><td>${valveSubTot.toFixed(2)}</td></tr>

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
