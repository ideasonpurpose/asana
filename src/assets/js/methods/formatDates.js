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
      if (isValidDate(new Date(row[prop])) && row[prop] != true && row[prop] != false) {
        if (prop == 'start_date') {
          row[prop] = new Date(row[prop]).toLocaleDateString('en-us', { month: "short", day: "numeric" });
        }
        else {
          row[prop] = new Date(row[prop]).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }); // e.g. 'Feb 10, 2022'
        }
      }
    }
  }
}

module.exports = formatDates;
