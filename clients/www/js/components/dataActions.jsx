import alt from './alt';
import ServerSource from './serverSource';

class DataActions{
  constructor() {
  }

  tick(){
    return 0;
  }

  setMessage(msg){
    return msg;
  }
  selectPane(pane){
    return pane;
  }

  dlInspection(id){
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      // when this thing return null, or not return at or or return a promise, it will not dispatch, so we need dispatch ourself
      //otherwise the function in dataStore will not be called
      dispatch("inspection");
      ServerSource.dlInspection(id)
      .then((inspection) => {
        this.setInspection(inspection);
      })
      .catch((errorMessage) => {
        this.setMessage(errorMessage);
      });
    }
  }

  dlInspections(){
    return (dispatch) => {
      dispatch("Waiting");
      ServerSource.dlInspections()
      .then((inspections) => {
        this.setInspections(inspections);
      })
      .catch((errorMessage) => {
        this.setMessage(errorMessage);
      });
    }
  }

  setInspection(inspection) {
    return inspection;
  }

  setInspectionProperty(property) {
    return property;
  }

  setInspections(inspections) {
    return inspections;
  }
}

export default alt.createActions(DataActions);
