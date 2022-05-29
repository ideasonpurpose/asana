/**
 * Save as xlsx file
 */

let XLSX = require("xlsx");

function save_xlsx() {
  /**
   * Let's construct the object we'll turn into data
   */
  var rows = [];

  for (var key in vm.data) {
    var row = vm.data[key];

    // Exclude hidden and Month type rows
    if (row['is_hidden'] === true || row['type'] === 'month_row') continue;

    rows.push({});

    for (var prop in vm.props) {
      var p = vm.props[prop]['key'];
      var name = vm.props[prop]['name']; // use the prettified name of it

      if (vm.showColumns.includes(p)) { // only include keys that are selected as visible
        rows[rows.length - 1][name] = row[p];
      }
    }
  }

  /**
   * Prepare the workbook and save as a file
   */
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
  XLSX.writeFile(workbook, vm.title + ".xlsx");
};

module.exports = save_xlsx;
