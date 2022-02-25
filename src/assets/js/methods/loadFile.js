var Papa = require('papaparse');

function loadFile(e) {
  var file = e.target.files[0];
  var ext = file.name.split('.').pop();

  // CSV
  if (ext == 'csv') {
    Papa.parse(e.target.files[0], {
      complete: function (results) {
        vm.data = results.data;
        vm.generateTable();
      }
    });
  }

  // JSON
  else {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function (evt) {
      var results = JSON.parse(evt.target.result);

      vm.data = results.data;
      vm.title = results.title;
      vm.meta = results.meta;
      vm.description = results.description;
      vm.props = results.props;
      vm.showColumns = results.showColumns;
      vm.tableHeader = results.tableHeader;
    }

    reader.onerror = function (evt) {
      console.error('error reading file')
    }
  }
};

module.exports = loadFile;
