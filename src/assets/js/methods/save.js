/**
 * Save as json data, so edits can be restored later
 */


function save() {
  var appdata = {
    title: vm.title,
    meta: vm.meta,
    description: vm.description,
    props: vm.props,
    data: vm.data,
    showColumns: vm.showColumns,
    tableHeader: vm.tableHeader,
  }

  var link = document.createElement('a');

  link.download = 'Project_Data';
  link.href = 'data:application/json,' + encodeURIComponent(JSON.stringify(appdata));
  link.click();
};

module.exports = save;
