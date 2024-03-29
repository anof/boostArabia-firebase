function get_needed_values() {
    let purchase_details = {}

    // get all needed values
    let purchase_details_names = []
    let purchase_details_values = []

    let contact_type = $("#contact_info_type").val()
    let contact_type_input = $('#contact-info-type-input').val()
    let additional_info = $('#contact-additional-info').val()
    let active_tab_name = $("a[aria-selected='true']").attr("id")
    let active_selection_names = $("div[aria-labelledby='" + active_tab_name + "'] label")
    let price = $("#price").html()

    active_selection_names.each(function () {
        purchase_details_names.push($(this).html().trim())
    })

    let active_selection_values = $("div[aria-labelledby='" + active_tab_name + "'] :input").not(".form-control")
    active_selection_values.each(function () {
        if ($(this).val() != "") {
            purchase_details_values.push($(this).val())
        }
    })

    // fill values into one variable
    for (let i = 0; i < purchase_details_names.length; i++) {
        purchase_details[purchase_details_names[i]] = purchase_details_values[i]
    }

    purchase_details["Contact Info"] = contact_type
    purchase_details["Contact Number"] = contact_type_input
    purchase_details["Additional Info"] = additional_info
    purchase_details["Price"] = price


    return purchase_details
}

// checks if paypal button exists in page
if ($("#paypal-button-container").length) {
    paypal.Buttons({
        createOrder: function (data, actions) {
            let price = $("#price").html()
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                let purchase_details = get_needed_values()
                let booster = currentBooster
                let game_name = $(".boost_form").attr("gameName")
                // Call your server to save the transaction
                fetch('/paypal-transaction-complete', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        orderID: data.orderID,
                        // sending purchase details
                        purchase_details: purchase_details,
                        booster: booster,
                        game_name: game_name
                    })
                }).then(()=>{
                    console.log("working")
                    window.location.replace("purchase_complete")
                });
            });
        }
    }).render('#paypal-button-container');
}