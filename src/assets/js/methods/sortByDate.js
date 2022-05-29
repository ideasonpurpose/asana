/**
 * Sort by date
 * 
 * Create sortDate fielda
 * startDate > due date > last modified date
 */

function sortByDate() {
  vm.data = vm.data.filter(function (val, i, arr) {
    return val.type != 'month_row';
  });

  for (var i = 0; i < vm.data.length; i++) {
    var row = vm.data[i];
    var start_date = row['start_date'] || '';
    var dueDate = row['due_date'] || '';
    var lastModDate = row['last_modified'] || '';

    var sortDate = start_date.length ? start_date : dueDate.length ? dueDate : lastModDate;
    row['sort_date'] = new Date(sortDate.replace(/-/g, "/") + ',00:00:00');
  }

  // we can now sort by sort_date key
  vm.data.sort(function (a, b) {
    var d1 = new Date(a['sort_date']);
    var d2 = new Date(b['sort_date']);

    return d1 - d2;
  });


  /**
   * Insert Month rows at appropriate locations
   * so we can visually group items by month
   */

  var prevMonth = false;

  for (var i = 0; i < vm.data.length; i++) {
    var row = vm.data[i];
    var month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(row['sort_date']));

    row['month_name'] = month;

    if (prevMonth != month) {
      vm.data.splice(i, 0, {
        'type': 'month_row',
        'is_hidden': false,
        'month_name': month
      });
    }

    prevMonth = month;
  }

  vm.toggleMonth();
};

module.exports = sortByDate;
