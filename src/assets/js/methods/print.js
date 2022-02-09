/**
 * This is basically here so it removes the URL from the print document footer
 * (the generated window has no URL)
 */

function print() {
  var panel = document.getElementsByTagName('html')[0];
  var printWindow = window.open(false, false, 'height=400,width=800');
  printWindow.document.write(panel.innerHTML);

  setTimeout(function () {
    printWindow.document.title = vm.title;
    printWindow.print();
    printWindow.close();
  }, 500);

  return false;
};

module.exports = print;
