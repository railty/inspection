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

  onInput(e) {
    var k = e.target.getAttribute('k');
    var v = e.target.value;
    DataActions.setInspectionProperty({name: k, value: v});
  }

  render () {
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
              id: property.id,
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
                  id: property.id,
                }
              ]
            }
            tabs.push(tab);
          }
        }
      });
    }

    var ctrlTabs = tabs.map((tab, i)=>{
      var ctrls = tab.properties.map((property, j)=>{
        if (property.datatype == 'string'){
          return (
            <tr key={j}>
              <td width='200px'>{property.name}</td>
              <td><RB.FormControl type="text" value={property.value} k={property.id} onChange={this.onInput} /></td>
            </tr>
          );
        }

        console.log(property.datatype);

        if (property.datatype == 'boolean'){
          return (
            <tr key={j}>
              <td width='200px'>{property.name}</td>
              <td><RB.FormControl type="text" value={property.value} k={property.id} onChange={this.onInput} /></td>
            </tr>
            );
        }
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

    return (<RB.Tabs id="tabs_inspection">{ctrlTabs}</RB.Tabs>);
  }
}

export default Inspection;
