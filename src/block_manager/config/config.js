module.exports = {

  blocks: [
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
    {
      id: 'unEditableText', 
      label: 'Un-Editable',
      category: 'Un-Editable Blocks',
      content: `<span contenteditable="false">If there are any mistakes or changes required to the above please 
      contact us as soon as possible on</span><span> {{CALLCENTRENUMBER}} </span><span contenteditable="false">
      and quote your reference which is </span><span>{{CUSTOMERREF}}</span><span contenteditable="false">
      . You can also contact us via our website at </span><span>{{OURWEBSITE}}</span><span contenteditable="false"> 
      particularly if you should have a change of address or contact phone numbers during the term of your contract.</span>`,
      attributes: {class:'gjs-fonts gjs-f-text'},
    },
    {
      id:'h1-block', 
      category: 'Featured',
      label: 'Heading', 
      content:'<h1>...</h1>'
    }
  ],

  appendTo: '',

};
