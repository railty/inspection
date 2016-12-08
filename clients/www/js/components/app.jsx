import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import DataStore from './dataStore';
import DataActions from './dataActions';

import { Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DataStore.getState();
  }

  componentDidMount() {
    this.timer = setInterval(function(){
      DataActions.tick();
    }.bind(this), 1000000);
    this.unlisten = DataStore.listen(this.onChange.bind(this));

    DataActions.getAjaxInspection(1060);
  }

  componentWillUnmount() {
    this.unlisten();
    clearInterval(this.timer);
  }

  onChange(state) {
    this.setState(state);
  }

  onClick(e){
    DataActions.setMessage("bla bla");
    return false;
  }

  onClick2(e){
    DataActions.getAjaxInspection(800);
    return false;
  }

  render () {
    var divs = null;
    if (this.state.inspection != ''){
      divs = this.state.inspection.properties.filter((property) => {
        if ((property.type)&&(property.type.datatype)&&property.type.tab&&property.type.tab=='TX Info'){
          return (property.type.datatype == 'string');
        }
        return false;
      }).map((property, i) => {
        return (<div key={i}> {property.name} </div>);
      });
      console.log(divs);
      //debugger;
    }

    return (
      <div>
        <h1 id='date'>{this.state.seconds}</h1>
        <Button bsStyle="success" bsSize="small" onClick={this.onClick2.bind(this)}>
          Something
        </Button>

        <input type="button" onClick={this.onClick.bind(this)} value="Test" />
        <input type="button" onClick={this.onClick2.bind(this)} value="Test2" />
        {divs}
        <div>{this.state.inspection.inspector}</div>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default App;
