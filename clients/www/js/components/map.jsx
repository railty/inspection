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

  onDownload(e) {
    DataActions.dlInspections();
  }
  onDelete(e) {
    DataActions.deleteInspections();
  }

  render () {
    return (
      <div>
       <RB.Button bsStyle="primary" onClick={this.onDownload}>Download</RB.Button>
       <RB.Button bsStyle="primary" onClick={this.onDelete}>Delete</RB.Button>
       <RB.FormControl componentClass="textarea" placeholder={this.state.message} />
      </div>
    );
  }
}

export default Map;
