import React from 'react';
import '../stylesheets/App.css';

import { Container, Row, Col, Card, Table, Form } from 'react-bootstrap';
import Header from '../components/generic/Header';

export default class SapPricing extends React.Component {
  constructor(props) {
    super(props);
    this.handlePercent = this.handlePercent.bind(this);
    this.state = {
      percentBulk: 50,
      pricePerList: [1.40, 1.60, 1.80, 2.00, 2.40, 2.60, 2.80, 3.00, 3.20, 3.60, 3.80, 4.00],
      sapSugarList: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1,
        3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4],
    }
  }

  handlePercent(ev) {
    this.setState({ percentBulk: ev.target.value });

  }
  render() {

    const percent = this.state.percentBulk / 100;
    return (
      <div>
        <Header />
        <div className="App">
          <Container style={{ width: "100%", marginTop: '5px' }}>
            <Row>
              <Col md={3}>
                <img src='/img/sap_collection.png' alt="information about rule of 86" />
              </Col>
              <Col md={9} lg={9}>
                <Card>
                  <Card.Header>Sap Pricing</Card.Header>
                  <Card.Body>
                    <Row>
                      <p>
                        The following table presents suggested prices per gallon of sap for a maple producer to purchase sap from  someone else.
                        The variables that affect sap prices in this table are sap sugar content, bulk syrup price, and the percentage of  bulk syrup price provided to the sap seller.
                        If the percentage of bulk syrup price provided to the sap seller differs from 50%, users can change that value in the yellow highlighted cell below (G8) and the sap prices will change.
                        </p>
                    </Row>
                    <Row>

                      <Form >
                        <Col>
                          <Form.Group controlId="formTapCount">
                            <Form.Label>Percent Bulk Sap</Form.Label>
                            <Form.Control type="text" onChange={this.handlePercent} value={this.state.percentBulk} />
                              <Row>
                            <Form.Text className="text-muted">
                            </Form.Text>
                          </Form.Group>
                        </Col>


                      </Form>
                    </Row>

                    <Row>

                      <Table striped bordered hover>
                        <thead>
                          <tr key={`hrow`}>
                            <th>&nbsp;</th>
                            {this.state.pricePerList.map((price, indPrice) =>
                              <th key={`hrow_col_${indPrice}`}>${price.toFixed(2)}</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.sapSugarList.map((sugar, index) =>
                            <tr key={`row_${index}`}>
                              <td>{sugar}</td>
                              {this.state.pricePerList.map((price, indPrice) =>
                                <td key={`row_${index}_col_${indPrice}`}>
                                  ${(((1 / (87.1 / sugar)) * 11.1382) * percent * price).toFixed(2)}
                                </td>
                              )}
                            </tr>
                          )}
                        </tbody>
                      </Table>

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
