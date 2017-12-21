module.exports = {
    
      getPanels(editor) {


        let pfx = 'gjs-';
    
        /* Init the container */
        var container = document.createElement("div"); // <div></div>
    
          let labelEl = document.createElement('div');
          labelEl.className = pfx + 'new-mt';
          labelEl.innerHTML = opt.modalLabelAddMergeTag;
          container.appendChild(labelEl);
    
        /* Init the labels and text-inputs */
        let tb_key = document.createElement("input");
        tb_key.setAttribute("type", "text");
        let label_key = document.createElement("label");
        let text_key = document.createTextNode("Tag Key: ");
        label_key.appendChild(text_key);
    
        let tb_value = document.createElement("input");
        tb_value.setAttribute("type", "text");
        let label_value = document.createElement("label");
        let text_value = document.createTextNode("Tag Value: ");
        label_value.appendChild(text_value);
    
        /* Init add merge tag button */
        let btnImp = document.createElement("button"); // <button class="gjs-btn-prim gjs-btn-import">Add the merge tag</button>
        btnImp.innerHTML = opt.modalBtnAddMT; // 'Add the merge tag'
        btnImp.className = pfx + 'btn-prim ' + pfx + 'btn-new-mt';
    
        let br_1 = document.createElement("br");
        let br_2 = document.createElement("br");
        let br_3 = document.createElement("br");
        let br_4 = document.createElement("br");
        let br_5 = document.createElement("br");
        let br_6 = document.createElement("br");
        container.appendChild(label_key);
        container.appendChild(br_1);
        container.appendChild(tb_key);
        container.appendChild(br_2);
        container.appendChild(br_3);
        container.appendChild(label_value);
        container.appendChild(br_4);
        container.appendChild(tb_value);
        container.appendChild(br_5);
        container.appendChild(br_6);
        container.appendChild(btnImp);
    
        btnImp.onclick = () => {
          let kVal = tb_key.value;
          let vVal = "{{ " + tb_value.value + " }}";
          
          // todo: Saving the merge tag
          alert("New merge tag -  " + kVal + ": " + vVal + " is saved!");
    
          editor.Modal.close();
        };
      },
    
      tglPointers(editor, v) {

      },
    
      run(editor, sender) {
        console.log("logging the editor in return block");
        console.log(editor);
        console.log("logging the sender in return block");
        console.log(sender);

        let md = editor.Modal;

        md.setTitle('Add new merge tag'); // 'Add new merge tag'

        let modalContent = md.getContentEl(); // The container

        md.setContent('');
        var container = document.createElement("div");
        md.setContent(container);
        md.open();
        sender && sender.set('active', 0);
      },
    
      stop(editor, sender) {
      }
    };
    