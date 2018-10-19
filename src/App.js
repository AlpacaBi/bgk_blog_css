import React, { Component } from 'react';


import NavbarTop from './contains/NavbarTop/NavbarTop'
import NavbarBottom from "./contains/NavbarBottom/NavbarBottom";
import './css/Home/Home.css'
import './css/NavbarTop/NavbarTop.css'



class App extends Component {
  render() {
    return (
<div>



          <div className={'all'}>
          <NavbarTop/>

          <div className={"section"}>
          {this.props.children}
          </div>

          <NavbarBottom/>
          </div></div>

    );
  }
}

export default App;
