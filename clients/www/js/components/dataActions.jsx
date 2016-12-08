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

  getAjaxInspection(id){
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      // when this thing return null, or not return at or or return a promise, it will not dispatch, so we need dispatch ourself
      //otherwise the function in dataStore will not be called
      dispatch("inspection");
      ServerSource.getAjaxInspection(id)
      .then((inspection) => {
        this.setInspection(inspection);
      })
      .catch((errorMessage) => {
        this.setMessage(errorMessage);
      });
    }
  }

  setInspection(inspection) {
    return inspection;
  }

}

export default alt.createActions(DataActions);
