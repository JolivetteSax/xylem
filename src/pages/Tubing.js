import React from 'react';
import '../stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Table } from 'react-bootstrap';
import Header from '../components/generic/Header';

export default class Tubing extends React.Component {
  constructor(props) {
    super(props);
    this.handleTrees = this.handleTrees.bind(this);
    this.handleLaterals = this.handleLaterals.bind(this);
    this.state = {
      trees: 120,
      lats: 12,
      spouts: true,
      checkValve: true,
      black: true,
      saddlePrice: 2.95,
      spoutPrice: .39,
    }
  }
  handleTrees(ev) {
    this.setState({ trees: ev.target.value });
  }
  handleLaterals(ev) {
    this.setState({ lats: ev.target.value });
  }

  render() {
    /* TODO move to state */
    let treesPerAcre = this.state.trees; //B3= 120;
    let treesPerLine = this.state.lats; //B4 = 12;


    const avgTreeDistance = Math.sqrt(43560 / treesPerAcre);
    const avgLenLateralLine = avgTreeDistance * (treesPerLine - 0.5);
    const latLinesPerAcre = treesPerAcre / treesPerLine; // B3/B410.0,
    const mainLineLenPerAcre = latLinesPerAcre * avgTreeDistance; // B7 * B5 190.5,
    const lateralLineTotalLength = latLinesPerAcre * avgLenLateralLine; 	// B7 * B6 2191.0,


    const spoutSubTot = this.state.spoutPrice * this.state.trees;

    /** 
Length of 5/16 lines end tree loop (3' each)	30.0
Length of 5/16 in drop lines (30" each)	300.0
Number of wire ties (one every 18")	127.0
Length of side tie wire	41.0

    */
   const totalCost = 466.69;

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
                      <Form style={{textAlign:'left'}}>
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

                      </Form>
                      </Col>
                      <Col>
                      <Table striped bordered hover>
                      <tr><td>Spouts: </td><td>{spoutSubTot.toFixed(2)}</td></tr>
                      <tr><td>Total per acre: </td><td>{totalCost}</td></tr>
                      </Table>
                      </Col>
                    </Row>


                  </Card.Body>
                </Card>
                <Row style={{ marginTop: '10px' }}>
                  <Col>

                    <Card>
                      <Card.Header>Tubing Calculations</Card.Header>
                      <Table striped bordered hover>
                      <tr><td>avgTreeDistance (ft)</td><td>{avgTreeDistance.toFixed(2)}</td></tr>
                      <tr><td>lateralLineTotalLength</td><td>{lateralLineTotalLength.toFixed(2)}</td></tr>
                      
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
