function generateTable() {
  var d = vm.data;

  /**
   * Generate props object
   * 
   * Data comes in the form of multidimensional arrays
   * Separate the first row containing column names into it's own 'props' object
   */
  var props = [];
  for (var i = 0; i < d[0].length; i++) {
    var prop = d[0][i]
      .replaceAll(" ", "_")
      .replaceAll(")", "")
      .replaceAll("(", "")
      .replaceAll("/", "_")
      .toLowerCase();

    props.push({
      key: prop,
      name: d[0][i]
    });
  }

  // we can remove the first row now
  d.shift();


  /**
   * Transform data rows into key:val pairs
   * 
   * Data comes in the form of multidimensional arrays
   * Let's turn entries into objects for easier data processing
   */
  var dProcessed = [];
  for (var i = 0; i < d.length; i++) {
    var row = d[i];
    dProcessed.push({});

    for (var j = 0; j < row.length; j++) {
      // get the property name from the props object above
      var prop = props[j].key;
      dProcessed[i][prop] = row[j];
    }
  }


  /**
   * Auto-disable Completed and Non-Client View rows
   */
  for (var i = 0; i < dProcessed.length; i++) {
    dProcessed[i]['is_hidden'] = false;

    if (
      dProcessed[i]['completed_at'].length ||
      (dProcessed[i]['tags'] != 'Client View')
    ) {
      dProcessed[i]['is_hidden'] = true;
    };
  }


  console.log(props);
  console.log(dProcessed);

  vm.title = dProcessed[1].projects;
  vm.data = dProcessed;
  vm.props = props;
  vm.sortByDate();
  vm.$forceUpdate();
}

module.exports = generateTable;
