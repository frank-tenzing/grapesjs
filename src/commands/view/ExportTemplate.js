const $ = Backbone.$;
const fileSaver = require("file-saver");

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
      let htmlContent = editor.getHtml();
      let cssContent = editor.getCss();
      const exportBtn = this.buildButton("Export", htmlContent, cssContent);
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

  buildButton(label, htmlContent, cssContent) {
    let pfx = editor.getConfig().stylePrefix;
    let modal = editor.Modal;
    let code = htmlContent + "\n" + "<style>\n" + cssContent + "\n</style>";

    let btn = document.createElement("button"); // <button class="gjs-btn-prim gjs-btn-import">Add the merge tag</button>
    btn.innerHTML = label; // 'Add the merge tag'
    btn.className = pfx + 'btn-prim ' + pfx + 'btn-export';
    btn.onclick = () => {
      try {
        var fileName = "page.txt";
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

      modal.close();
    }
    return btn;
  }
};
