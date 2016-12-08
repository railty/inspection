var formData = null;
$(function() {
  console.log("ready!");

  $('form#template').submit(function(e){
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

  $('#template #file').change(function(){
    var file = this.files[0];
    if (file){
      var filename = file.name;
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(filename);
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(e.target.result, "text/xml");
        var hTemplates = [];
        var templates = xmlDoc.querySelectorAll("RedlineDocument > NamedSketch");

        for (var iTemplate = 0; iTemplate < templates.length; iTemplate++) {
          var template = templates[iTemplate];
          var hTemplate = {name: template.getAttribute('Name')};
          var hProperties = {};
          var properties = template.querySelectorAll("Symbol > Properties > Property");
          for (iProperty = 0; iProperty < properties.length; iProperty++) {
            var property = properties[iProperty];
            var strName = property.getAttribute('Name');
            hProperties[strName] = {value: property.getAttribute('Value'), type: property.getAttribute('Type')}
          }
          hTemplate['properties'] = hProperties;
          hTemplates.push(hTemplate);
        }

        //hFeatures = hFeatures.slice(hFeatures.length - 1);
        //console.log(hFeatures);

        formData = new FormData();
        formData.append("authenticity_token", $("input[name='authenticity_token']").val());

        var blob = new Blob([JSON.stringify(hTemplates)], {type: "text/json"});
        var fileOfBlob = new File([blob], filename.replace(/\.xml$/i, ".json"));
        formData.append("file", fileOfBlob);
        $('input[type="submit"]').prop('disabled', false);
      };

      reader.readAsText(file, 'UTF-8')
    }
  });

  $('input[type="submit"]').prop('disabled', true);
});
