/**
 * Format all table data dates to MMM dd, yyyy
 * Feb 28, 2022
 */

function formatDates() {
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  for (var i = 0; i < vm.data.length; i++) {
    var row = vm.data[i];

    for (var prop in row) {
      if (
        isValidDate(new Date(row[prop])) &&
        row[prop] != true &&
        row[prop] != false) {
        if (prop == 'start_date') {
          // e.g. 'Feb 10'
          row[prop] = new Date(row[prop] + ':00:00:00').toLocaleDateString('en-US', { month: "short", day: "numeric" });
        }
        if (prop == 'completed_at') {
          // e.g. 'Feb 10, 2022'
          row[prop] = new Date(row[prop] + ':00:00:00').toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" });
        }
        if (prop == 'due_date') {
          // e.g. 'Feb 10, 2022'
          row[prop] = new Date(row[prop] + ':00:00:00').toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" });
        }
      }
    }
  }
}

module.exports = formatDates;
