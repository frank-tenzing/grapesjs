module.exports = {

  blocks: [
    // Collection Iterations
    {
      id:'payment-details', 
      category: 'Iterations', 
      label: 'Payment Details', 
      content:`<span contenteditable="false"><div>
    {% for payment in paymentDetails %}
        <div>{{ payment.date }}</div>
        <div>{{ payment.account }}</div>
        <div>{{ payment.ref }}</div>
        {% else %}
        <p> No payment details available against the account number. </p>
    {% endfor %}
    </div></span>`, 
      attributes: {}
    },
    // Un-Editable Blocks
    {
      id: 'unEditableText', 
      label: 'Un-Editable',
      category: 'Un-Editable Blocks',
      content: `<div><span contenteditable="false">If there are any mistakes or changes required to the above please 
      contact us as soon as possible on</span><span> {{CALLCENTRENUMBER}} </span><span contenteditable="false">
      and quote your reference which is </span><span>{{CUSTOMERREF}}</span><span contenteditable="false">
      . You can also contact us via our website at </span><span>{{OURWEBSITE}}</span><span contenteditable="false"> 
      particularly if you should have a change of address or contact phone numbers during the term of your contract.</span></div>`,
      attributes: {class:'gjs-fonts gjs-f-text'},
    },
    // Default Blocks
    {
      id: 'sect100', 
      category: 'Basic',
      label: '1 Section',
      attributes: {class:'gjs-fonts gjs-f-b1'},
      content: `<table>
        <tr>
          <td></td>
        </tr>
        </table>`,
    },
    {
      id: 'sect50', 
      category: 'Basic',
      label: '1/2 Section',
      content: `<table>
        <tr>
          <td style="width: 50%"></td>
          <td style="width: 50%"></td>
        </tr>
        </table>`,
      attributes: {class:'gjs-fonts gjs-f-b1'},
    },
    {
      id: 'sect30', 
      label: '1/3 Section',
      category: 'Basic',
      attributes: {class:'gjs-fonts gjs-f-b3'},
      content: `<table>
        <tr>
          <td style="width: 33.3333%"></td>
          <td style="width: 33.3333%"></td>
          <td style="width: 33.3333%"></td>
        </tr>
        </table>`,
    },
    {
      id: 'text',
      label: 'Text',
      category: 'Basic',
      attributes: {class:'gjs-fonts gjs-f-text'},
      content: {
       type: 'text',
       content: 'Insert your text here',
       style: { padding: '10px' },
       activeOnRender: 1
      },
    },
    {
      id: 'text-sect',
      label: 'Text Section',
      category: 'Basic',
      content: '<h1 class="heading">Insert title here</h1><p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>',
      attributes: {class:'gjs-fonts gjs-f-h1p'}
    },
    {
      id: 'image',
      label: 'Image',
      category: 'Basic',
      attributes: {class:'gjs-fonts gjs-f-image'},
      content: {
        type:'image',
        style: {color:'black'},
        activeOnRender: 1
      },
    }
  ],

  appendTo: '',

};
