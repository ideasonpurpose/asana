/**
 * main.js - JS entry point
 * 
 * Compiles to bundle.js
 */

var Vue = require('./lib/vue.min.js');
var Papa = require('papaparse');

// Vue methods
var loadFile = require('./methods/loadFile.js');
var download = require('./methods/download.js');
var generateTable = require('./methods/generateTable.js');
var toggleMonth = require('./methods/toggleMonth.js');
var print = require('./methods/print.js');
var save = require('./methods/save.js');
var setTitle = require('./methods/setTitle.js');
var sortByDate = require('./methods/sortByDate.js');
var isValidDate = require('./methods/isValidDate.js');

window.vm = new Vue({
  el: '#app',

  data: {
    title: '',
    meta: new Date().toLocaleString().split(',')[0],
    description: 'NOTE: This is a high-level milestones schedule. As needed, we will make adjustments throughout the process.',
    props: [],
    orig_data: [],
    data: [],
    showColumns: ['name', 'start_date', 'due_date', 'owner'],
    viewAll: false,
    editMode: false,
    tableHeader: false,
  },

  methods: {
    loadFile,
    download,
    generateTable,
    toggleMonth,
    print,
    save,
    setTitle,
    sortByDate,
    isValidDate
  },

  filters: {
    fullDate: function (val) {
      // e.g. 'Feb 10, 2022'
      return vm.isValidDate(val) ? new Date(val.replace(/-/g, "/") + ',00:00:00').toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }) : '';
    },
    // e.g. 'Feb 10'
    shortDate: function (val) {
      return vm.isValidDate(val) ? new Date(val.replace(/-/g, "/") + ',00:00:00').toLocaleDateString('en-US', { month: "short", day: "numeric" }) : '';
    }
  },

  watch: {
    title() {
      this.setTitle();
    }
  }
});
