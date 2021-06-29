import React from 'react';
import '../stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Table, Dropdown } from 'react-bootstrap';
import Header from '../components/generic/Header';

export default class ProductPricing extends React.Component {
  constructor(props) {
    super(props);


    this.state = {

    }
  }



  render() {



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
                  <Card.Header><b>Product Pricing Estimates and Guidance</b></Card.Header>
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

                        </Form>
                      </Col>
                      <Col>
                        <Card>
                          <Card.Header>Estimates</Card.Header>

                          <Table bordered hover>
                            <tbody>
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
                      <Card.Header></Card.Header>
                      <Table bordered hover>
                        <tbody>
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
