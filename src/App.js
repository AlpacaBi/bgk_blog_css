import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Row} from 'react-bootstrap'
import NavbarTop from './contains/NavbarTop/NavbarTop'
import NavbarBottom from "./contains/NavbarBottom/NavbarBottom";



class App extends Component {
  render() {
    return (
      <div>
<Row>
          <NavbarTop/>
</Row>

<Row>
          {this.props.children}
</Row>

          <Row>
              <NavbarBottom/>
          </Row>



      </div>
    );
  }
}

export default App;
