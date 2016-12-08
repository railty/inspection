import alt from './alt';

import DataActions from './dataActions';
import ServerSource from './serverSource';

class DataStore {
  constructor() {
    this.seconds = 0;
    this.message = "Ready"
    this.inspection = '';

    this.bindListeners({
      tick: DataActions.tick,
      setMessage: DataActions.setMessage,
      setInspection: DataActions.setInspection,
      getAjaxInspection: DataActions.getAjaxInspection,
    });
  }

  tick(){
    this.seconds = this.seconds + 1;
  }

  setMessage(msg){
    this.message = msg;
  }

  setInspection(inspection){
    this.inspection = inspection;
    this.setMessage("Ready");
  }

  getAjaxInspection(msg){
    this.setMessage("Loading " + msg);
  }

}

export default alt.createStore(DataStore, 'DataStore');
