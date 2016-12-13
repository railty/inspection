import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import DataStore from './dataStore';
import DataActions from './dataActions';
import Bottom from './bottom';
import List from './list';
import Inspection from './inspection';

import * as RB from 'react-bootstrap';

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
    //DataActions.dlInspections();
    DataActions.readInspections();
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

  render () {
    var pane;
    if (this.state.selectedPane == 'list') pane = <List/> ;
    if (this.state.selectedPane == 'inspection') pane = <Inspection/> ;

    return (
      <div>
        <Bottom />
        {pane}
      </div>
    );

  }
}

export default App;
