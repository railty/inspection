import alt from './alt';

import DataActions from './dataActions';
import ServerSource from './serverSource';

class DataStore {
  constructor() {
    this.seconds = 0;
    this.message = "Ready"
    this.inspection = '';
    this.inspections = '';
    this.selectedPane = 'list';

    this.bindListeners({
      tick: DataActions.tick,
      setMessage: DataActions.setMessage,
      selectPane: DataActions.selectPane,

      dlInspection: DataActions.dlInspection,
      setInspection: DataActions.setInspection,
      dlInspections: DataActions.dlInspections,
      setInspections: DataActions.setInspections,
    });
  }

  tick(){
    this.seconds = this.seconds + 1;
  }

  setMessage(msg){
    this.message = msg;
  }

  selectPane(pane){
    console.log(pane);
    this.selectedPane = pane;
  }

  setInspection(inspection){
    this.inspection = inspection;
    this.selectedPane = 'inspection';
    this.setMessage("Ready");
  }

  dlInspection(msg){
    this.setMessage("Loading " + msg);
  }

  dlInspections(inspections){
    this.inspections = inspections;
  }

  setInspections(inspections){
    this.inspections = inspections;
    this.setMessage("Ready");
  }
}

export default alt.createStore(DataStore, 'DataStore');
