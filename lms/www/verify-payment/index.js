window.addEventListener("DOMContentLoaded", function() {
    const message = document.querySelector(".message");
    const currentDomain = window.location.origin;
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const reference = params.get("reference");
    const doctype = params.get("doctype").split("_").join(" ");
    const docname = params.get("docname");
    const billingName = params.get("billingname");
    const source = params.get("source");

    frappe.call({
        "method": "lms.lms.utils.verify_paystack_transaction",
        args: {
            reference: reference,
            doctype: doctype,
            docname: docname,
            billing_name: billingName,
            source: source
        },
        callback(r) {
            const response = r.message;

            if(response) {
                message.textContent = response.message;
                message.classList.remove("wait");
                message.classList.add("success");
                window.location.href = `${currentDomain}${response}`;
            } else {
                message.textContent = response.message;
                message.classList.remove("wait");
                message.classList.add("fail");
            }
        }
    })
})