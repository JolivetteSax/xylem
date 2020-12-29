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
    }
  }
  handleTrees(ev) {
    this.setState({ trees: ev.target.value });
  }
  handleLaterals(ev) {
    this.setState({ lats: ev.target.value });
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
                  <Card.Header><b>Cost of putting up maple tubing</b></Card.Header>
                  <Card.Body>

                    <Row>
                      <Form >
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
                    </Row>

              
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
