var listItem =
  `<table class="list-item">
        <tr>
          <td class="list-item-cell">
            <table class="list-item-content">
              <tr class="list-item-row">
                <td class="list-cell-left">
                  <img class="list-item-image" src="http://placehold.it/150x150/78c5d6/fff/" alt="Image"/>
                </td>
                <td class="list-cell-right">
                  <h1 class="card-title">Title here</h1>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`;

module.exports = {

  blocks: [
    // Collection Iterations
    {
      id: 'payment-details',
      category: 'Iterations',
      label: 'Payment Details',
      // The `id` will tell the service what data will replace the merge fields
      /*   content: `<span contenteditable="false" id="payment"><div>
      {% for payment in paymentDetails %}
          <div>{{ payment.date }}</div>
          <div>{{ payment.account }}</div>
          <div>{{ payment.ref }}</div>
          {% else %}
          <p> No payment details available against the account number. </p>
      {% endfor %}
      </div></span>`, */
      content: `<div align=center>
    <div style="display: none;">{% block paymentdetails %}</div>
        <div style="display: none;">{% autoescape false %}</div>
            {{ PaymentDetails }}
            <div class="sample-data">The following data is sample of collection iteration only</div>
            <div class="sample-data">Mocked data 1</div>
            <div class="sample-data">Mocked data 2</div>
            <div class="sample-data">Mocked data 3</div>
        <div style="display: none;">{% endautoescape %}</div>
    <div style="display: none;">{% endblock %}</div>
</div>`,
      attributes: { class: 'gjs-fonts gjs-f-text' }
    },
    // Un-Editable Blocks
    {
      id: 'unEditableText',
      label: 'Un-Editable',
      category: 'Un-Editable Blocks',
      content: `<div><span data-gjs-editable="false" data-gjs-removable="false">
      If there are any mistakes or changes required to the above please contact us 
      as soon as possible on</span><span data-gjs-removable="false"> {{CALLCENTRENUMBER}} </span>
      <span data-gjs-editable="false" data-gjs-removable="false">and quote your reference which is </span>
      <span data-gjs-removable="false">{{CUSTOMERREF}}</span>
      <span data-gjs-editable="false" data-gjs-removable="false">
      . You can also contact us via our website at </span>
      <span data-gjs-removable="false">{{OURWEBSITE}}</span>
      <span data-gjs-editable="false" data-gjs-removable="false"> 
      particularly if you should have a change of address or contact 
      phone numbers during the term of your contract.</span></div>`,
      attributes: { class: 'gjs-fonts gjs-f-text' },
    },
    // Default Blocks
    {
      id: 'sect100',
      category: 'Basic',
      label: '1 Section',
      attributes: { class: 'gjs-fonts gjs-f-b1' },
      content: `<table style="height: 150px;margin: 0 auto 10px auto;padding: 5px 5px 5px 5px;width: 100%;">
        <tr>
          <td style="padding: 0;margin: 0;vertical-align: top;"></td>
        </tr>
        </table>`,
    },
    {
      id: 'sect50',
      category: 'Basic',
      label: '1/2 Section',
      attributes: { class: 'gjs-fonts gjs-f-b2' },
      content: `<table style="height: 150px;margin: 0 auto 10px auto;padding: 5px 5px 5px 5px;width: 100%;">
        <tr>
          <td style="padding: 0;margin: 0;vertical-align: top;width: 50%;"></td>
          <td style="padding: 0;margin: 0;vertical-align: top;width: 50%;"></td>
        </tr>
        </table>`,
    },
    {
      id: 'sect30',
      label: '1/3 Section',
      category: 'Basic',
      attributes: { class: 'gjs-fonts gjs-f-b3' },
      content: `<table style="height: 150px;margin: 0 auto 10px auto;padding: 5px 5px 5px 5px;width: 100%;">
        <tr>
          <td style="padding: 0;margin: 0;vertical-align: top;width: 33.3333%;"></td>
          <td style="padding: 0;margin: 0;vertical-align: top;width: 33.3333%;"></td>
          <td style="padding: 0;margin: 0;vertical-align: top;width: 33.3333%;"></td>
        </tr>
        </table>`,
    },
    {
      id: 'sect37',
      label: '3/7 Section',
      category: 'Basic',
      attributes: { class: 'gjs-fonts gjs-f-b37' },
      content: `<table style="height: 150px;margin: 0 auto 10px auto;padding: 5px 5px 5px 5px;width: 100%;">
        <tr>
          <td style="padding: 0;margin: 0;vertical-align: top;width:30%;"></td>
          <td style="padding: 0;margin: 0;vertical-align: top;width:70%;"></td>
        </tr>
        </table>`,
    },
    {
      id: 'divider',
      label: 'Divider',
      category: 'Basic',
      attributes: { class: 'gjs-fonts gjs-f-divider' },
      content: `<table style="width: 100%; margin-top: 10px; margin-bottom: 10px;">
        <tr>
          <td class="divider"></td>
        </tr>
      </table>
      <style>
      .divider {
        background-color: rgba(0, 0, 0, 0.1);
        height: 1px;
      }
      </style>`,
    },
    {
      id: 'text',
      label: 'Text',
      category: 'Basic',
      attributes: { class: 'gjs-fonts gjs-f-text' },
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
      attributes: { class: 'gjs-fonts gjs-f-h1p' },
      content: '<h1 class="heading">Insert title here</h1><p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>',
    },
    {
      id: 'image',
      label: 'Image',
      category: 'Basic',
      attributes: { class: 'gjs-fonts gjs-f-image' },
      content: {
        type: 'image',
        style: { color: 'black' },
        activeOnRender: 1
      },
    },
    {
      id: 'listItems',
      label: 'List Items',
      category: 'Basic',
      attributes: { class: 'fa fa-th-list' },
      content: listItem + listItem,
    },
  ],

  appendTo: '',

};
