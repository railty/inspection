const ServerSource = {
  dlInspection: function(id) {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });
    var http = new XMLHttpRequest();
  	http.open("GET", 'http://nings.ca/inspections/' + id + '.json', true);
    //http.open("GET", 'http://localhost:3000/inspections/' + id + '.json', true);
    //http.open("GET", 'http://192.168.86.162:3000/inspections/' + id + '.json', true);

  	http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	http.setRequestHeader("Accept", "application/json");
  	http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        //promise_resolve(JSON.parse(http.response));
        promise_resolve(http.response);
      }
  	};
  	var data = {'employee': 111};
  	var params = JSON.stringify(data);
  	http.send(params);

    return p;
  },

  dlInspections: function() {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });
    var http = new XMLHttpRequest();
    http.open("GET", 'http://nings.ca/inspections.json', true);
    //http.open("GET", 'http://192.168.86.162:3000/inspections.json', true);
  	http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	http.setRequestHeader("Accept", "application/json");
  	http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200) {
        //promise_resolve(JSON.parse(http.response));
        promise_resolve(http.response);
      }
  	};
  	var data = {'employee': 111};
  	var params = JSON.stringify(data);
  	http.send(params);

    return p;
  },

  onError: function(e){
    debugger;
    console.log("error:" + e);
  },

  saveInspections: function(strInspections) {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
      //console.log('file system open: ' + fs.name);
      fs.root.getFile("inspections.json", { create: true, exclusive: false}, function (fileEntry) {
        //console.log("fileEntry is file?" + fileEntry.isFile.toString());
        fileEntry.createWriter(function (fileWriter) {
          fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            promise_resolve(JSON.parse(strInspections));
          }.bind(this);

          fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
          };

          var dataObj = new Blob([strInspections], {type: 'text/plain'});
          fileWriter.write(dataObj);
        });
      }.bind(this), this.onError);
    }.bind(this), this.onError);
    return p;
  },

  saveInspection: function(id, strInspection) {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
      //console.log('file system open: ' + fs.name);
      fs.root.getFile(id + ".json", { create: true, exclusive: false}, function (fileEntry) {
        //console.log("fileEntry is file?" + fileEntry.isFile.toString());
        fileEntry.createWriter(function (fileWriter) {
          fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            promise_resolve(JSON.parse(strInspection));
          }.bind(this);

          fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
          };

          var dataObj = new Blob([strInspection], {type: 'text/plain'});
          fileWriter.write(dataObj);
        });
      }.bind(this), this.onError);
    }.bind(this), this.onError);
    return p;
  },

  readInspections: function() {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
      //console.log('file system open: ' + fs.name);
      fs.root.getFile("inspections.json", { create: true, exclusive: false}, function (fileEntry) {
        //console.log("fileEntry is file?" + fileEntry.isFile.toString());
        fileEntry.file(function (file) {
          var reader = new FileReader();
          reader.onloadend = function() {
            //console.log("Successful file read: " + this.result);
            promise_resolve(JSON.parse(this.result));
          };

          reader.readAsText(file);
        }, this.onError);
      }.bind(this), this.onError);
    }.bind(this), this.onError);
    return p;
  },

  readInspection: function(id) {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
      //console.log('file system open: ' + fs.name);
      fs.root.getFile(id + ".json", { create: true, exclusive: false}, function (fileEntry) {
        //console.log("fileEntry is file?" + fileEntry.isFile.toString());
        fileEntry.file(function (file) {
          var reader = new FileReader();
          reader.onloadend = function() {
            //console.log("Successful file read: " + this.result);
            promise_resolve(JSON.parse(this.result));
          };

          reader.readAsText(file);
        }, this.onError);
      }.bind(this), this.onError);
    }.bind(this), this.onError);
    return p;
  },

  deleteInspections: function() {
    var promise_resolve, promise_reject, p = new Promise(function (resolve, reject) { promise_resolve = resolve; promise_reject = reject; });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
      //console.log('file system open: ' + fs.name);
      fs.root.getFile("inspections.json", {create: false, exclusive: true}, function (fileEntry) {
        //console.log("fileEntry is file?" + fileEntry.isFile.toString());
        fileEntry.remove(function (file) {
          promise_resolve();
        }, this.onError);
      }.bind(this), this.onError);
    }.bind(this), this.onError);
    return p;
  },

};

export default ServerSource;
