const $ = Backbone.$;

module.exports = {

    run(editor, sender, opts = {}) {

        console.log("run function in sending test Email");

        sender && sender.set && sender.set('active', 0);
        const config = editor.getConfig();
        const modal = editor.Modal;
        const pfx = config.stylePrefix;



        if (!this.$editors) {

            const $editors = $(`<div class="${pfx}export-dl"></div>`);
            const container = this.buildDialog(editor);
            // Build the export button
            const sendBtn = this.buildButton("Send", editor);
            $editors.append(container).append(sendBtn);
            this.$editors = $editors;
        }

        modal.setTitle("Please enter the Email address and subject below (As there is no public API to send a test Email by Putsmail(Paid service), sending test email might be implemented in Java): ");
        modal.setContent(this.$editors);
        modal.open();
    },

    stop(editor) {
        console.log("Stop function in import template");
        const modal = editor.Modal;
        modal && modal.close();
    },

    buildDialog(editor) {

        let container = document.createElement("div");
        let divider = document.createElement("br");

        let sendToL = document.createElement("label");
        sendToL.innerHTML = "Send To: &nbsp;&nbsp;";
        let sendTo = document.createElement("input");
        sendTo.setAttribute("type", "text");
        sendTo.setAttribute("id", "sendTo");

        let subjectL = document.createElement("label");
        subjectL.innerHTML = "Subject: &nbsp;&nbsp;";
        let subject = document.createElement("input");
        subject.setAttribute("type", "text");
        subject.setAttribute("id", "subject");

        container.appendChild(sendToL).appendChild(sendTo);
        container.appendChild(divider);
        container.appendChild(subjectL).appendChild(subject);

        return container;
    },

    buildButton(label, editor) {

        let pfx = editor.getConfig().stylePrefix;
        let modal = editor.Modal;

        let btn = document.createElement("button"); // <button class="gjs-btn-prim gjs-btn-import">Add the merge tag</button>
        btn.innerHTML = label; // 'Add the merge tag'
        btn.className = pfx + 'btn-prim ' + pfx + 'btn-import';
        btn.onclick = () => {

            let sendToVal = document.getElementById("sendTo").value;
            let subjectVal = document.getElementById("subject").value;

            alert("Test Email of " + subjectVal + " sent to " + sendToVal + "!");
            let htmlContent = editor.getHtml();
            let cssContent = editor.getCss();
            alert(htmlContent + "\n" + cssContent);

            modal.close();
        }
        return btn;
    },

};
