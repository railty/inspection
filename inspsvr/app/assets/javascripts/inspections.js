var formData = null;
$(function() {
  console.log("ready!");

  $('form#inspection').submit(function(e){
    e.preventDefault();
    if (formData){
      //console.log(formData);
      var request = new XMLHttpRequest();
      request.open("POST", "upload.json");
      request.responseType = 'json';
      request.onload = function(e) {
        if (request.status == 200) {
          $("#msg").text("Uploaded: " + request.response.count);
        } else {
          $("#msg").text("Error " + request.status);
        }
      };

      request.send(formData);
    }
    formData = null;
    $('input[type="submit"]').prop('disabled', true);
  });

  $('#inspection #file').change(function(){
    var file = this.files[0];
    if (file){
      var filename = file.name;
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(filename);
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(e.target.result, "text/xml");
        var hFeatures = [];
        var features = xmlDoc.querySelectorAll("RedlineDocument > Category > Redlines > Symbol > Properties > Property[Name='Feature Key']");

        for (var iFeature = 0; iFeature < features.length; iFeature++) {
          var feature = features[iFeature].parentNode.parentNode;
          var properties = features[iFeature].parentNode.childNodes;
          var hFeature = {};

          for (iProperty = 0; iProperty < properties.length; iProperty++) {
            var property = properties[iProperty];
            var strName = property.getAttribute('Name');
            hFeature[strName] = {value: property.getAttribute('Value'), type: property.getAttribute('Type')}
          }
          hFeatures.push(hFeature);
        }

        //hFeatures = hFeatures.slice(hFeatures.length - 1);
        //console.log(hFeatures);

        formData = new FormData();
        formData.append("authenticity_token", $("input[name='authenticity_token']").val());

        var blob = new Blob([JSON.stringify(hFeatures)], {type: "text/json"});
        var fileOfBlob = new File([blob], filename.replace(/\.xml$/i, ".json"));
        formData.append("file", fileOfBlob);
        $('input[type="submit"]').prop('disabled', false);
      };

      reader.readAsText(file, 'UTF-8')
    }
  });

  $('input[type="submit"]').prop('disabled', true);
});
