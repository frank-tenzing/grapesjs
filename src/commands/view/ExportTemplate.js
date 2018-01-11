const $ = Backbone.$;
const fileSaver = require("file-saver");

module.exports = {

  run(editor, sender, opts = {}) {

    var pfx = editor.getConfig().stylePrefix;
    var modal = editor.Modal;
    var cmdm = editor.Commands;
    var codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
    var pnm = editor.Panels;
    var container = document.createElement('div');
    var btnEdit = document.createElement('button');

    codeViewer.set({
      codeName: 'htmlmixed',
      readOnly: 0,
      theme: 'hopscotch',
      autoBeautify: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      styleActiveLine: true,
      smartIndent: true,
      indentWithTabs: true
    });

    btnEdit.innerHTML = 'Edit';
    btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import';
    btnEdit.onclick = function () {
      // Get the HTML and CSS
      var code = codeViewer.editor.getValue();

      // Save the template: begin
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
    };

    cmdm.add('html-edit', {
      run: function (editor, sender) {
        sender && sender.set('active', 0);
        var viewer = codeViewer.editor;
        modal.setTitle('Edit code');
        if (!viewer) {
          var txtarea = document.createElement('textarea');
          container.appendChild(txtarea);
          container.appendChild(btnEdit);
          codeViewer.init(txtarea);
          viewer = codeViewer.editor;
        }
        var InnerHtml = editor.getHtml();
        var Css = editor.getCss();
        modal.setContent('');
        modal.setContent(container);
        codeViewer.setContent(InnerHtml + "<style>" + Css + '</style>');
        modal.open();
        viewer.refresh();
      }
    });

    
    pnm.addButton('options',
      [
        {
          id: 'edit',
          className: 'fa fa-edit',
          command: 'html-edit',
          attributes: {
            title: 'Edit'
          }
        }
      ]
    );
    // sender && sender.set && sender.set('active', 0);
    // const config = editor.getConfig();
    // const modal = editor.Modal;
    // const pfx = config.stylePrefix;
    // this.cm = editor.CodeManager || null;


    // if (!this.$editors) {
    //   const oHtmlEd = this.buildEditor('htmlmixed', 'hopscotch', 'HTML');
    //   const oCsslEd = this.buildEditor('css', 'hopscotch', 'CSS');
    //   this.htmlEditor = oHtmlEd.el;
    //   this.cssEditor = oCsslEd.el;
    //   const $editors = $(`<div class="${pfx}export-dl"></div>`);
    //   $editors.append(oHtmlEd.$el).append(oCsslEd.$el);
    //   this.$editors = $editors;
    // }

    // modal.setTitle(config.textViewCode);
    // modal.setContent(this.$editors);
    // modal.open();
    // this.htmlEditor.setContent(editor.getHtml());
    // this.cssEditor.setContent(editor.getCss());
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
};
