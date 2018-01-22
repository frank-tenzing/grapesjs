const $ = Backbone.$;
const fileSaver = require("file-saver");
// SHA1 hash for file naming (versioning)
const sha1 = require("js-sha1");
const juice = require("juice");

module.exports = {

  run(editor, sender, opts = {}) {

    sender && sender.set && sender.set('active', 0);
    const config = editor.getConfig();
    const modal = editor.Modal;
    const pfx = config.stylePrefix;
    this.cm = editor.CodeManager || null;

    if (!this.$editors) {
      const oHtmlEd = this.buildEditor('htmlmixed', 'hopscotch', 'HTML');
      const oCsslEd = this.buildEditor('css', 'hopscotch', 'CSS');
      this.htmlEditor = oHtmlEd.el;
      this.cssEditor = oCsslEd.el;
      const $editors = $(`<div class="${pfx}export-dl"></div>`);

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
  },

  stop(editor) {
    const modal = editor.Modal;
    modal && modal.close();
  },

  /**
   * 
   * @param {*} codeName 
   * @param {*} theme 
   * @param {*} label 
   */
  buildEditor(codeName, theme, label) {
    const input = document.createElement('textarea');
    !this.codeMirror && (this.codeMirror = this.cm.getViewer('CodeMirror'));

    const el = this.codeMirror.clone().set({
      label,
      codeName,
      theme,
      input,
    });

    const $el = new this.cm.EditorView({
      model: el,
      config: this.cm.getConfig()
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
    let pfx = editor.getConfig().stylePrefix;
    let modal = editor.Modal;
    let htmlContent = editor.getHtml();
    let cssContent = editor.getCss();
    let code = htmlContent + "\n" + "<style>\n" + cssContent + "\n</style>";

    let btn = document.createElement("button"); // <button class="gjs-btn-prim gjs-btn-import">Add the merge tag</button>
    btn.innerHTML = label; // 'Add the merge tag'
    btn.className = pfx + 'btn-prim ' + pfx + 'btn-export';
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
