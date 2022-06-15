/**
 * Clone the current row
 */

function clonerow(rowIndex) {
  // Object.assign is there to prevent reactivity with the cloned row
  vm.data.splice(rowIndex, 0, Object.assign({}, vm.data[rowIndex]));
}

module.exports = clonerow;
