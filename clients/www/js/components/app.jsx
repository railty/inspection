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
    //DataActions.getAjaxInspection(1052);
    DataActions.dlInspections();
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

  writeFile(fileEntry, dataObj) {
      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function (fileWriter) {

          fileWriter.onwriteend = function() {
              console.log("Successful file write...");
              this.readFile(fileEntry);
          }.bind(this);

          fileWriter.onerror = function (e) {
              console.log("Failed file write: " + e.toString());
          };

          // If data object is not passed in,
          // create a new Blob instead.
          if (!dataObj) {
              dataObj = new Blob(['some file data'], { type: 'text/plain' });
          }

          fileWriter.write(dataObj);
      }.bind(this));
  }

  readFile(fileEntry) {
    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
        };

        reader.readAsText(file);

    }, this.onError);
  }
  onError(e){
    console.log("error:" + e);
  }

  onClick2(e){
    debugger;

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
      console.log('file system open: ' + fs.name);
      fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {

          console.log("fileEntry is file?" + fileEntry.isFile.toString());
          // fileEntry.name == 'someFile.txt'
          // fileEntry.fullPath == '/someFile.txt'
          this.writeFile(fileEntry, null);

      }.bind(this), this.onError);

    }.bind(this), this.onError);

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
