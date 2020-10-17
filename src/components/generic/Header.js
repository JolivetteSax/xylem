import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import {Badge} from 'react-bootstrap';
import '../../stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Header extends Component {

  render() {
    
    return (
        <header className="App-header">
          <div className='App-header-controls'>
            <Link to="/">
              <img style={{height:'100%'}} src='/img/header_logo.svg' alt='logo'/>
            </Link>
            <div style={{float:'right'}}>
              {(!process.env.REACT_APP_NAME) &&
                <Badge pill variant='danger'>beta</Badge>
              }
            </div>
           </div>
        </header>
    );
  }
}

