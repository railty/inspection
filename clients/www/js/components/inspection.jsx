import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import DataStore from './dataStore';
import DataActions from './dataActions';

import * as RB from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';

import BootstrapSwitch from 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.css';

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
    var v = e.target.text;
    DataActions.setInspectionProperty({name: k, value: v});
  }

  onSelect(n, e) {
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
              items: property.type.items,
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
                  items: property.type.items,
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
          if (property.items){
            /*
            var items = property.items.map((item, n)=>{
              return (
                <RB.MenuItem eventKey={n} key={n}>{item}</RB.MenuItem>
              );
            });
            return (
              <tr key={j}>
                <td width='200px'>{property.name}</td>
                <td>
                  <RB.DropdownButton bsStyle='default' title={property.value} id={j} k={property.id} onSelect={this.onSelect}>
                    {items}
                  </RB.DropdownButton>
                </td>
              </tr>
            );
            */

            var options = property.items.map((item, n)=>{
              return (
                <option key={n} value={item}>{item}</option>
              );
            });
            return (
              <tr key={j}>
                <td width='200px'>{property.name}</td>
                <td>
                <RB.FormControl componentClass="select" placeholder="select" k={property.id} onSelect={this.onSelect}>
                  {options}
                </RB.FormControl>
                </td>
              </tr>
            );

          }
          else{
            return (
              <tr key={j}>
                <td width='200px'>{property.name}</td>
                <td><RB.FormControl type="text" value={property.value} k={property.id} onChange={this.onInput} /></td>
              </tr>
            );
          }
        }

        console.log(property.datatype);

        if (property.datatype == 'boolean'){
          return (
            <tr key={j}>
              <td width='200px'>{property.name}</td>
              <td><Switch /></td>
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
