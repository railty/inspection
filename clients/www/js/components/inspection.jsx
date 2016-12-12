import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import DataStore from './dataStore';
import DataActions from './dataActions';

import * as RB from 'react-bootstrap';

class Inspection extends React.Component {
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
  onClick(id) {
    DataActions.selectInspection(id);
    return false;
  }

  render () {
    var divs = '';
    var inspection = this.state.inspection;
    if (inspection){
      var properties = inspection.properties;
      var tabs = [];
      properties.forEach((property) => {
        if (property.type&&property.type.datatype&&property.type.tab){
          var tab = tabs.find((tab)=>{
            return tab.name == property.type.tab;
          });

          if (tab) {
            tab.properties.push({
              name: property.name,
              datatype: property.type.datatype,
              value: property.value,
            });
          }
          else{
            tab = {
              name: property.type.tab,
              properties: [
                {
                  name: property.name,
                  datatype: property.type.datatype,
                  value: property.value,
                }
              ]
            }
            tabs.push(tab);
          }
        }
      });
    }

    var ctrlTabs = tabs.map((tab, i)=>{

      var ctrls = tab.properties.map((property, k)=>{
        if (property.type.datatype == 'string')
          return (
            <tr key={k}>
              <td width='200px'>{property.name}</td>
              <td><RB.FormControl type="text" value={property.value} /></td>
            </tr>
          );
        if (property.type.datatype == 'boolean')
          return (
            <tr key={k}>
              <td width='200px'>{property.name}</td>
              <td><RB.FormControl type="text" value={property.value} /></td>
            </tr>
            );
      });

       return (
         <RB.Tab key={i} eventKey={i} title={tab.name}>
          <RB.Table striped bordered condensed hover>
            <tbody>
            {ctrls}
            </tbody>
          </RB.Table>
        </RB.Tab>);
    });

    return (
      <RB.Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        {ctrlTabs}
      </RB.Tabs>
    );
  }
}

export default Inspection;
