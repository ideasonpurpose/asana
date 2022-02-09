/**
 * Handle month visibility logic
 * 
 * In essence, if there is at least one visible entry
 * show the respective month row.
 * 
 * At this point, results are already ordered by date,
 * so it's safe to simply loop over the data.
 */

function toggleMonth() {
  var monthrow;

  for (var i = 0; i < vm.data.length; i++) {
    var row = vm.data[i];

    // Disable the month row by default
    if (row['type'] == 'month_row') {
      monthrow = row;
      monthrow.is_hidden = true;
    } 
    // If there's at least one visible task below the current month,
    // then show the month row
    else if (!row.is_hidden) {
      monthrow.is_hidden = false;
    }
  }
};

module.exports = toggleMonth;
