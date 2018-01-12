const $ = Backbone.$;
const fileSaver = require("file-saver");

module.exports = {

  run(editor, sender, opts = {}) {

    console.log("run function in import template");

    sender && sender.set && sender.set('active', 0);
    const config = editor.getConfig();
    const modal = editor.Modal;
    const pfx = config.stylePrefix;


    this.cm = editor.CodeManager || null;

    if (!this.$editors) {

      const dialog = this.buildDialog();

      const $editors = $(`<div class="${pfx}export-dl"></div>`);
      // Build the export button
      const importBtn = this.buildButton("Import");
      $editors.append(dialog).append(importBtn);
      this.$editors = $editors;
    }

    modal.setTitle("Please choose a E-mail template");
    modal.setContent(this.$editors);
    modal.open();
  },

  stop(editor) {
    console.log("Stop function in import template");
    const modal = editor.Modal;
    modal && modal.close();
  },

  /*
  Building the dialog of importing a template
  */
  buildDialog() {

    let container = document.createElement("div"); // <div></div>
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.setAttribute("id", "fileInput");
    // fileInput.setAttribute("onchange", function () { alert("onchange") });
    container.appendChild(fileInput);

    return container;

  },

  buildButton(label) {
    let pfx = editor.getConfig().stylePrefix;
    let modal = editor.Modal;

    let btn = document.createElement("button"); // <button class="gjs-btn-prim gjs-btn-import">Add the merge tag</button>
    btn.innerHTML = label; // 'Add the merge tag'
    btn.className = pfx + 'btn-prim ' + pfx + 'btn-import';
    btn.onclick = () => {
      try {
        if (this.checkFileAPI()) {
          this.readText();
        } else {
          alert('The File APIs are not fully supported by your browser. Fallback required.');
        }
      }
      catch (err) {
        console.log("Download failed!");
        console.log("Exception: ", err);
      }
      modal.close();
    }
    return btn;
  },

  /*
  Read the content of the template
  */
  readText() {

    let fileInput = document.getElementById('fileInput');

    let file = fileInput.files[0];

    var reader = new FileReader();

    reader.onload = function (e) {
      let result = reader.result;
      console.log("reading result");
      console.log(result);
    }

    reader.readAsText(file);
  },

  checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      return true;
    } else {
      return false;
    }
  }
};
