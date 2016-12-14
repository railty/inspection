import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import DataStore from './dataStore';
import DataActions from './dataActions';

import * as RB from 'react-bootstrap';

class List extends React.Component {
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

  onClick(o) {
    //DataActions.dlInspection(o.id);
    DataActions.readInspection(o.id);
    return false;
  }

  render () {
    if (this.state.inspections instanceof Array){
      var items = this.state.inspections.map((inspection, i) => {
        var id = inspection.id;
        return (<RB.ListGroupItem key={i} onClick={() => this.onClick({id})}>{inspection.location}</RB.ListGroupItem>);
      });

      return (
        <RB.ListGroup>
          {items}
        </RB.ListGroup>
      );
    }
    return (
      <RB.ListGroup>
        <RB.ListGroupItem href="#" active>{this.state.inspections}</RB.ListGroupItem>
      </RB.ListGroup>
    );
  }
}

export default List;
