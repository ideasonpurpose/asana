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
   * Sort by date
   * 
   * Create sortDate
   * startDate > due date > last modified date
   */
  for (var i = 0; i < dProcessed.length; i++) {
    var row = dProcessed[i];
    var sortDate = row['start_date'];
    var dueDate = row['due_date'];
    var lastModDate = row['last_modified'];

    if (!sortDate.length) {
      sortDate = dueDate.length ? dueDate : lastModDate;
    }

    dProcessed[i]['sort_date'] = sortDate;
  }

  // we can now sort by sort_date key
  dProcessed.sort(function (a, b) {
    var d1 = new Date(a['sort_date']);
    var d2 = new Date(b['sort_date']);

    return d1 - d2;
  });


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


  /**
   * Insert Month rows at appropriate locations
   * so we can visually group items by month
   */

  var prevMonth = false;

  for (var i = 0; i < dProcessed.length; i++) {
    var row = dProcessed[i];
    var month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(row['sort_date']));

    row['month_name'] = month;
    row['rowstyle'] = "";

    if (prevMonth != month) {
      dProcessed.splice(i, 0, {
        'type': 'month_row',
        'is_hidden': false,
        'month_name': month
      });
    }

    prevMonth = month;
  }

  console.log(props);
  console.log(dProcessed);

  vm.title = dProcessed[1].projects;
  vm.data = dProcessed;
  vm.props = props;
  vm.toggleMonth();
  vm.$forceUpdate();
}

module.exports = generateTable;
