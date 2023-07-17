/**
 * main.js - JS entry point
 * 
 * Compiles to bundle.js
 */

var Vue = require('./lib/vue.min.js');
//var Fusse = require('./lib/fusse.js');

// Vue methods
var loadFile = require('./methods/loadFile.js');
var generateTable = require('./methods/generateTable.js');
var toggleMonth = require('./methods/toggleMonth.js');
var print = require('./methods/print.js');
var save = require('./methods/save.js');
var save_xlsx = require('./methods/save_xlsx.js');
var setTitle = require('./methods/setTitle.js');
var sortByDate = require('./methods/sortByDate.js');
var isValidDate = require('./methods/isValidDate.js');
var clonerow = require('./methods/clonerow.js');
var deleterow = require('./methods/deleterow.js');

window.vm = new Vue({
  el: '#app',

  data: {
    title: '',
    meta: new Date().toLocaleString().split(',')[0],
    description: 'NOTE: This is a high-level milestones schedule. As needed, we will make adjustments throughout the process.',
    props: [],
    data: [],
    showColumns: ['name', 'start_date', 'due_date', 'owner'],
    viewAll: false,
    editMode: false,
    tableHeader: false,
  },

  methods: {
    loadFile,
    generateTable,
    toggleMonth,
    print,
    save,
    save_xlsx,
    setTitle,
    sortByDate,
    isValidDate,
    clonerow,
    deleterow
  },

  filters: {
    fullDate: function (val) {
      // e.g. 'Feb 10, 2022'
      return vm.isValidDate(val) ? new Date(val.replace(/-/g, "/") + ',00:00:00').toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric", weekday: 'short' }) : '';
    },
    // e.g. 'Feb 10'
    shortDate: function (val) {
      return vm.isValidDate(val) ? new Date(val.replace(/-/g, "/") + ',00:00:00').toLocaleDateString('en-US', { month: "short", day: "numeric", weekday: 'short' }) : '';
    }
  },

  watch: {
    title() {
      this.setTitle();
    }
  }
});


/**
 * Presentation table
 */
window.vm2 = new Vue({
  el: '#presentation',

  data: window.pdata,

  filters: {
    fullDate: function (val) {
      // e.g. 'Feb 10, 2022'
      return vm.isValidDate(val) ? new Date(val.replace(/-/g, "/") + ',00:00:00').toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric", weekday: 'short' }) : '';
    },
    // e.g. 'Feb 10'
    shortDate: function (val) {
      return vm.isValidDate(val) ? new Date(val.replace(/-/g, "/") + ',00:00:00').toLocaleDateString('en-US', { month: "short", day: "numeric", weekday: 'short' }) : '';
    }
  },
});
