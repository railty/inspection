const ServerSource = {
  getAjaxInspection: function(id) {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });
    var http = new XMLHttpRequest();
  	http.open("GET", 'http://nings.ca:56789/inspections/' + id + '.json', true);
  	http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	http.setRequestHeader("Accept", "application/json");
  	http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        promise_resolve(JSON.parse(http.response).data);
      }
  	};
  	var data = {'employee': 111};
  	var params = JSON.stringify(data);
  	http.send(params);

    return p;
  }
};

export default ServerSource;
