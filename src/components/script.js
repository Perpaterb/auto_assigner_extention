// function trySetTheAssignee() { 

//     if (typeof g_form == 'undefined') {
//         try { //get if in iframe
//             g_form =
//                 (document.querySelector("#gsft_main") || document.querySelector("[component-id]")
//                     .shadowRoot.querySelector("#gsft_main")).contentWindow.g_form;
//         } catch (e) { }
//     }

//     g_form.setValue('assigned_to', 'a182e1ed6fc67100089be4021c3ee434')
// }


window.addEventListener("MyEventType", function(evt) {
    

    var g_form=new GlideForm(); // I have added this
    alert("Validating");  
    g_form.addErrorMessage('This is an error');  

    console.log("This is the script", typeof g_form);
    }, false);