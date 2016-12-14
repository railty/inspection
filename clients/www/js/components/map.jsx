import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import DataStore from './dataStore';
import DataActions from './dataActions';

import * as RB from 'react-bootstrap';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = DataStore.getState();
  }

  componentDidMount() {
    this.unlisten = DataStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    this.unlisten();
    clearInterval(this.timer);
  }

  onChange(state) {
    this.setState(state);
  }

  onClick(e) {
    DataActions.dlInspections();
  }

  render () {
    return (
       <RB.Button bsStyle="primary" onClick={this.onClick}>Download</RB.Button>
    );
  }
}

export default Map;
