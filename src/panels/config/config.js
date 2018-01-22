/*
Config of Panels
*/
var crc = 'create-comp';
var mvc = 'move-comp';
var swv = 'sw-visibility';
var expt = 'export-template';
var impt = 'import-template';
var testMail = 'send-test-mail';
var osm = 'open-sm';
var otm = 'open-tm';
var ola = 'open-layers';
var obl = 'open-blocks';
var ful = 'fullscreen';
var prv = 'preview';
var nmt = 'new-merge-tag';
var nci = "new-iteration";

module.exports = {
  stylePrefix: 'pn-',

  // Default panels fa-sliders for features
  defaults: [{
    id: 'commands',
    buttons: [{}],
  }, {
    id: 'options',
    buttons: [{
      active: true,
      id: swv,
      className: 'fa fa-square-o',
      command: swv,
      context: swv,
      attributes: { title: 'View components' },
    }, {
      id: nmt,
      className: 'fa fa-plus-square-o',
      command: nmt,
      context: nmt,
      attributes: { title: 'New Merge Tag' },
    }, {
      id: nci,
      className: 'fa fa-plus',
      command: nci,
      context: nci,
      attributes: { title: 'New Iteration' },
    }, {
      id: prv,
      className: 'fa fa-eye',
      command: prv,
      context: prv,
      attributes: { title: 'Preview' },
    }, {
      id: ful,
      className: 'fa fa-arrows-alt',
      command: ful,
      context: ful,
      attributes: { title: 'Fullscreen' },
    }, {
      id: expt,
      className: 'fa fa-download',
      command: expt,
      attributes: { title: 'View and export template code' },
    }, {
      id: impt,
      className: 'fa fa-folder-open',
      command: impt,
      attributes: { title: 'Import template' },
    }, {
      id: testMail,
      className: 'fa fa-paper-plane',
      command: testMail,
      attributes: { title: 'Sending test Email' },
    }],
  }, {
    id: 'views',
    buttons: [{
      id: osm,
      className: 'fa fa-paint-brush',
      command: osm,
      active: true,
      attributes: { title: 'Open Style Manager' },
    }, {
      id: otm,
      className: 'fa fa-cog',
      command: otm,
      attributes: { title: 'Settings' },
    }, {
      id: ola,
      className: 'fa fa-bars',
      command: ola,
      attributes: { title: 'Open Layer Manager' },
    }, {
      id: obl,
      className: 'fa fa-th-large',
      command: obl,
      attributes: { title: 'Open Blocks' },
    }],
  }],

  // Editor model
  em: null,

  // Delay before show children buttons (in milliseconds)
  delayBtnsShow: 300,
};
