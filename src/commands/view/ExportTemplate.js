const $ = Backbone.$;
// File saver
const fileSaver = require("file-saver");
// Archive the html and css files into zip 
const JSZip = require("jszip");
// Inline css properties into the style attribute
const juice = require("juice");
// SHA1 hash for file naming (versioning)
const sha1 = require("js-sha1");

module.exports = {

  run(editor, sender) {
    sender && sender.set('active', 0); // Turn off the button

    const config = editor.getConfig();
    const pfx = config.stylePrefix;

    let result = '';
    let md = editor.Modal;
    let modalContent = md.getContentEl();
    let codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
    // Init code viewer
    codeViewer.set({
      codeName: 'htmlmixed',
      theme: 'material',
      readOnly: 1
    });

    let container = document.createElement("div");
    let viewer = codeViewer.editor;
    md.setTitle("Export Template");
    // Init code viewer if not yet instantiated
    if (!viewer) {
      let txtarea = document.createElement('textarea');
      // let labelEl = document.createElement('div');
      // labelEl.className = pfx + 'export-label'; // todo
      // labelEl.innerHTML = "Export";
      // container.appendChild(labelEl);
      container.appendChild(txtarea);
      codeViewer.init(txtarea);
      viewer = codeViewer.editor;
      viewer.setOption('lineWrapping', 1);
    }
    md.setContent(container);
    const tmpl = editor.getHtml() + `<style>${editor.getCss()}</style>`;
    codeViewer.setContent(1 ? juice(tmpl) : tmpl); // todo
    md.open();
    viewer.refresh();
    sender && sender.set && sender.set('active', 0);
  },

  /* run(editor, sender) {

    // sender && sender.set && sender.set('active', 0);
    const config = editor.getConfig();
    console.log("in Export template");
    console.log(editor);
    console.log(sender);
    const modal = editor.Modal;
    let modalConent = modal.getContentEl();
    this.pfx = config.stylePrefix; // "gjs-""
    this.codeManager = editor.CodeManager || null;

    if (!this.$editors) {
      const oHtmlEd = this.buildEditor('htmlmixed', 'hopscotch', 'HTML');
      const oCsslEd = this.buildEditor('css', 'hopscotch', 'CSS');
      this.htmlEditor = oHtmlEd.el;
      this.cssEditor = oCsslEd.el;
      const $editors = $(`<div class="${this.pfx}export-dl"></div>`);

      // Build the export button
      const exportBtn = this.buildButton("Export", editor);

      $editors.append(oHtmlEd.$el).append(oCsslEd.$el).append(exportBtn);

      this.$editors = $editors;
    }

    modal.setTitle(config.textViewCode);
    modal.setContent(this.$editors);
    modal.open();
    this.htmlEditor.setContent(editor.getHtml());
    this.cssEditor.setContent(editor.getCss());
  }, */


  /**
   * 
   * @param {*} codeName 
   * @param {*} theme 
   * @param {*} label 
   */
  buildEditor(codeName, theme, label) {
    const input = document.createElement('textarea');
    !this.codeMirror && (this.codeMirror = this.codeManager.getViewer('CodeMirror'));

    const el = this.codeMirror.clone().set({
      label,
      codeName,
      theme,
      input,
    });

    const $el = new this.codeManager.EditorView({
      model: el,
      config: this.codeManager.getConfig()
    }).render().$el;

    el.init(input);

    return { el, $el };
  },

  /**
   * ClientName-UsePurpose-Date
   * @param {*} clientName 
   * @param {*} usePurpose 
   */
  getFileName(clientName, usePurpose) {
    let currentDate = new Date();
    let salt = usePurpose + "-" + clientName + "-" + currentDate;
    return sha1(salt);
  },

  /**
   * 
   * @param {*} label 
   * @param {*} editor 
   */
  buildButton(label, editor) {
    let modal = editor.Modal;
    let htmlContent = editor.getHtml();
    let cssContent = editor.getCss();
    let code = htmlContent + "\n" + "<style>\n" + cssContent + "\n</style>";

    let btn = document.createElement("button"); // <button class="gjs-btn-prim gjs-btn-import">Add the merge tag</button>
    btn.innerHTML = label; // 'Add the merge tag'
    btn.className = this.pfx + 'btn-prim ' + this.pfx + 'btn-export';
    btn.onclick = () => {
      try {
        // Naming the file with version
        var fileName = "Invoice-CityFitness-" + this.getFileName("CityFitness", "Invoice") + ".html";
        var blobData = new Blob([code], { type: "text/plain;charset=utf-8" });

        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(blobData, fileName);
        } else {
          fileSaver.saveAs(blobData, fileName);
        }
      }
      catch (err) {
        console.log("Download failed!");
        console.log("Exception: ", err);
      }
      alert("Template: " + fileName + " is saved for further approval!");
      modal.close();
    }
    return btn;
  }
};
