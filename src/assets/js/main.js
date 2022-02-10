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
var formatDates = require('./methods/formatDates.js');

window.vm = new Vue({
  el: '#app',

  data: {
    title: '',
    meta: new Date().toLocaleString().split(',')[0],
    description: 'NOTE: This is a high-level milestones schedule. As needed, we will make adjustments throughout the process.',
    props: [],
    data: [],
    showColumns: ['name', 'start_date', 'owner', 'due_date'],
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
    formatDates
  },

  watch: {
    title() {
      this.setTitle();
    }
  }
});
