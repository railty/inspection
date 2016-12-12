import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import DataStore from './dataStore';
import DataActions from './dataActions';

import * as RB from 'react-bootstrap';

class Bottom extends React.Component {
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

  selectPane(pane){
    DataActions.selectPane(pane);
    return false;
  }

  render () {
    return (
      <RB.Navbar collapseOnSelect fixedBottom>
        <RB.Navbar.Header>
          <RB.Navbar.Toggle />
        </RB.Navbar.Header>

        <RB.Navbar.Collapse>
          <RB.Nav bsStyle="tabs" justified activeKey={this.state.selectedPane}>
            <RB.NavItem eventKey='list' onSelect={() => this.selectPane('list')}>List</RB.NavItem>
            <RB.NavItem eventKey='map' onSelect={() => this.selectPane('map')}>Map</RB.NavItem>
            <RB.NavItem eventKey='inspection' onSelect={() => this.selectPane('inspection')}>Inspection</RB.NavItem>
          </RB.Nav>
        </RB.Navbar.Collapse>
      </RB.Navbar>
    );
  }
}

export default Bottom;
