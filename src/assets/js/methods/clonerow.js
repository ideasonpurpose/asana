/**
 * Clone the current row
 */

function clonerow(rowIndex) {
  vm.data.splice(rowIndex, 0, vm.data[rowIndex]);
}

module.exports = clonerow;
