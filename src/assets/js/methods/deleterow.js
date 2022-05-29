/**
 * Delete the current row
 */

function deleterow(rowIndex) {
  if (rowIndex > -1) {
    vm.data.splice(rowIndex, 1);
    vm.sortByDate();
  }
}

module.exports = deleterow;
