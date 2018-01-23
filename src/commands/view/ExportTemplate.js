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

    let codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
    let container = document.createElement("div");
    // Init code viewer
    codeViewer.set({
      codeName: 'htmlmixed',
      theme: 'material',
      readOnly: 1
    });

    let result = '';
    let md = editor.Modal;
    let modalContent = md.getContentEl();
    let viewer = codeViewer.editor;
    md.setTitle("Export Template");

    // Init code viewer if not yet instantiated
    if (!viewer) {
      let txtarea = document.createElement('textarea');
      let btn = this.buildButton("Export", editor);
      container.appendChild(txtarea);
      container.append(btn);
      codeViewer.init(txtarea);
      viewer = codeViewer.editor;
      viewer.setOption('lineWrapping', 1);
    }
    md.setContent(container);
    const tmpl = editor.getHtml() + `<style>${editor.getCss()}</style>`;
    codeViewer.setContent(juice(tmpl));
    md.open();
    viewer.refresh();
    sender && sender.set && sender.set('active', 0);
  },

  /**
   * ClientName-UsePurpose-Date
   * @param {*} clientName 
   * @param {*} usePurpose 
   */
  fileName(clientName, usePurpose) {
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
    let code = editor.getHtml() + `<style>${editor.getCss()}</style>`
    code = juice(code);

    let btn = document.createElement("button"); // <button class="gjs-btn-prim gjs-btn-import">Add the merge tag</button>
    btn.innerHTML = label; // 'Add the merge tag'
    btn.className = this.pfx + 'btn-prim ' + this.pfx + 'btn-export';
    btn.onclick = () => {
      try {
        // Naming the file with version
        var fileName = "Invoice-CityFitness-" + this.fileName("CityFitness", "Invoice") + ".html";
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
