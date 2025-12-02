//https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
//https://www.sitepoint.com/community/t/how-to-enable-hidden-form-fields-when-a-radio-button-is-selected/32373/4
// Used above as a reference

//https://www.sitepoint.com/community/t/how-to-enable-hidden-form-fields-when-a-radio-button-is-selected/32373

//ALLOW FORM SUBMIT ONLY IF ALL INPUT IS VALID

//I have referenced Lab 9 and 10 in order to create a base for this
//validate form data

$(document).ready(function() {
    var currentPage = window.location.pathname.split("/").pop();
    $('#nav-menu a').each(function() {
        if ($(this).attr('href') === currentPage) {
            $(this).addClass('active');
        }
    });
    $("#delivery, #pickup, #pay-online, #pay-pickup, #payment-method").change(function() {
        togglePayPickup();
    });
    togglePayPickup();
    //This will force any data selected or entered in the boxes to be put in the bill boxes,
    $("#same-as-delivery-checkbox").on("change", function() {
        if (this.checked) {
            $("#billing-full-name").val($("#full-name").val());
            $("#billing-street-address").val($("#street-address").val());
            $("#billing-postcode").val($("#postcode").val());
            $("#billing-city").val($("#city").val());
            $("#billing-state").val($("#state option:selected").text());
        } else {
            // Clear billing fields when box unchecks
            $("#billing-full-name").val('');
            $("#billing-street-address").val('');
            $("#billing-postcode").val('');
            $("#billing-city").val('');

            //Restatement might be redunant but it is not worth changing
            $("#billing-state").val('');
            $("#billing-state").trigger('change');

        }
    });
});

function validateRegister() {
    //Register varbs
    //Maybe add .trim(); to clean up unnessary elements or data?
    var uname = $("#uname").val().trim();
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();
    var genM = $("#gen-m").prop("checked");
    var genF = $("#gen-f").prop("checked");
    var genN = $("#gen-n").prop("checked"); //Kept gender like this despite how flavour selected ended up being way more effective, to show difference in methods possible and better differatiante the two 
    var flavourSelected = $('input[name="flavour[]"]:checked').length > 0; //This worked better then having indivual ids for each option and doing it like the gender one 
    var hearAbout = $("#hear-about").val();
    //Used by Register 
    var email = $("#email-address").val().trim();

    //had issue with confirmation and validation mayeb use a let isValid codniton and defien eahc con with isvlaid=false
    var errMsg = ""; //this stores the error messages
    var validationErrors = []; //this stores the error messages for  any other issues
    var missingFields = []; //this stores the error messages for the must include
    var result = true; // assume no errors by default aka assume valid

    //ADD A THING TO CHIGHLIGHT THE THING  JO COME BACJK TO THIS


    //Due to unnessary compleication this has been removed/no class aniamtion

    // Clear previous error/valid classes for password fields
    $("#pwd1, #pwd2").removeClass("error valid");

    //Password conditions 
    if (pwd1 == "") { //is Password empty?
        $("#pwd1").attr("required", true);
        missingFields.push("Password");
        $("#pwd1").addClass("error");
    }
    if (pwd2 == "") { //is Retyped Password empty?
        missingFields.push("Retyped Password");
        $("#pwd2").attr("required", true);
        $("#pwd2").addClass("error");
    }
    if (pwd1 != "" && pwd2 != "" && pwd1 != pwd2) { //do passwords match?
        errMsg += "Passwords do not match.";
        $("#pwd1, #pwd2").addClass("error");
    }

    //check both are at least 9 characters
    if (pwd1.length < 9 || pwd2.length < 9) {
        validationErrors.push("9 Characters");
        $("#pwd1, #pwd2").addClass("error");
    }
    //check both have at least one uppercase 
    if (!/[A-Z]/.test(pwd1) || !/[A-Z]/.test(pwd2)) {
        validationErrors.push("One Uppercase letter");
        $("#pwd1, #pwd2").addClass("error");
    }
    //check both have at least one lowercase
    if (!/[a-z]/.test(pwd1) || !/[a-z]/.test(pwd2)) {
        validationErrors.push("One Lowercase letter");
        $("#pwd1, #pwd2").addClass("error");
    }
    //check both have at least one symbol
    if (!/[^a-zA-Z0-9]/.test(pwd1) || !/[^a-zA-Z0-9]/.test(pwd2)) {
        validationErrors.push("One Symbol");
        $("#pwd1, #pwd2").addClass("error");
    }

    // If no errors in password validation, mark as valid
    if (
        pwd1 !== "" && pwd2 !== "" && pwd1 === pwd2 &&
        validationErrors.length === 0 && missingFields.indexOf("Password") === -1 && missingFields.indexOf("Retyped Password") === -1
    ) {
        $("#pwd1, #pwd2").removeClass("error").addClass("valid");
    }

    //Validate errors for Username
    if (uname == "") { //is UserName empty?
        missingFields.push("Username");
        $("#uname").attr("required", true);
        $("#uname").addClass("error"); // fixed to add error class to username field
    } else {
        $("#uname").removeClass("error").addClass("valid");
    }

    //Validate errors for Email
    if (email == "") { //is Email empty?
        $("#email-address").attr("required", true);
        missingFields.push("Email");
        $("#email-address").addClass("error");
    } else {
        $("#email-address").removeClass("error").addClass("valid");
    }

    //Validate errors for Gender


    // Optionally add error class to gender elements if you want here

    if ((!genM) && (!genF) && (!genN)) { //check whether gender is selected
        missingFields.push("Gender");
        $("#gender").removeClass("valid").addClass("error");
    } else {
        $("#gender").removeClass("error").addClass("valid");

    }

    //Validate errors for Favorite Flavour
    if (!flavourSelected) {
        missingFields.push("Favorite Flavour/s");
        // Optionally add error class to flavour checkboxes if you want here
    }

    //What is empty
    if (missingFields.length > 0) {
        errMsg += "<li>The following cannot be left empty: " + missingFields.join(", ") + ".</li>";
        errMsg += "<br>";
    }
    //Password must include
    if (validationErrors.length > 0) {
        errMsg += "<li>Password must include at least: " + validationErrors.join(", ") + ".</li>";
        errMsg += "<br>";
    } //If any errorcs detected display error message

    if (hearAbout === "") {
        errMsg += "<li>Please select how you heard about us.</li>";
        $("#hear-about").removeClass("valid").addClass("error");
    } else {
        $("#hear-about").removeClass("error").addClass("valid");
        $("#hear-about").attr("required", true);
    }

    if (errMsg !== "") {
        result = false;

        if ($("#errWin").length) {
            $("#errWin ul").html(errMsg);
            var numOfItems = ((errMsg.match(/<li>/g)).length) + 6;
            $("#errWin").css('height', numOfItems + 'em');
            $("#errWin").css('margin-top', (-numOfItems / 2) + 'em');
            $("#overlay").show();
            $("#errWin").show();
        } else {
            var errorContainer = "<div id='overlay'></div>" +
                "<section id='errWin' class='window'><ul>" +
                errMsg +
                "</ul><a href='#' id='errBtn' class='button'>Close</a></section>";
            $("body").after(errorContainer);
            var numOfItems = ((errMsg.match(/<li>/g)).length) + 6;
            $("#overlay").css('visibility', 'visible');

            $("#errWin").css('margin-top', (-numOfItems / 2) + 'em');
            $("#errWin").show();
            $("#errBtn").click(function() {
                $("#overlay").remove();
                $("#errWin").remove();
            });
        }

        // control font size on mobile:
        if ($(window).width() <= 600) {
            $("#errWin").css('font-size', '0.8rem'); // smaller font size 
        } else {
            $("#errWin").css('font-size', '1rem'); // default 
        }
    } else {
        // if no errors visible hide popup
        $("#overlay").hide();
        $("#errWin").hide();
    }

    return result;
}
//expanded on part 1 of code by adding specific requiredment rules


//Order Validation
//Issue the valdiate will not mvoe to the current slection
//it stays as the one last submited
function validateOrder() {
    togglePayPickup(); //call the toggle paypickup function it must be called for the delivery and pickup related elements etc paymnet, billing and delivery ads
    var deliverySelected = $("#delivery").prop("checked");
    var pickupSelected = $("#pickup").prop("checked");
    var payOnline = $("#pay-online").prop("checked"); //Differs from togglepayPickup val name to better differantite and assit with debugging
    var payPickup = $("#pay-pickup").prop("checked"); //Differs from togglepayPickup val name to better differantite and assit with debugging
    var contact = $("#contact-number").val().trim();
    var email = $("#email-address").val().trim();

    //Delivery address ifno
    var fullName = $("#full-name").val().trim();
    var streetAddress = $("#street-address").val().trim();
    var postcode = $("#postcode").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val();
    //billing address info
    var billingFullName = $("#billing-full-name").val().trim();
    var billingStreetAddress = $("#billing-street-address").val().trim();
    var billingPostcode = $("#billing-postcode").val().trim();
    var billingCity = $("#billing-city").val().trim();
    var billingState = $("#billing-state").val();
    var selectedCard = $("#payment-method").val().trim();

    //Set these as required by default,
    //Due to other conditions in scripts there is no need to default state some values as default requried aka payonline and pickup
    //In order to access certain areas it requries certain things to be visible so theres no reason to hardcode them as all being requried
    //Aka situational logic chooses who, but the below are defaulted for convience
    $("#delivery").attr("required", true);
    $("#pickup").attr("required", true);
    // $("#billing-full-name").attr("required", true);
    // $("#billing-postcode").attr("required", true);
    /// $("#billing-street-address").attr("required", true);
    //  $("#billing-city").attr("required", true);

    $("#contact-number").attr("required", true);
    $("#email-address").attr("required", true);


    var errMsg = "";
    var validationErrors = [];
    var missingFields = [];
    var missingFieldsBill = [];
    var result = true;
    //condition for if neither radios selected
    if (!deliverySelected && !pickupSelected) {
        missingFields.push("Receive By Option");
        $("#delivery, #pickup").addClass("error");
    } else {
        $("#delivery, #pickup").removeClass("error");
    } // Check Pay Option selection
    if (!payPickup && !payOnline) {
        missingFields.push("Pay Option");
        $("#pay-pickup, #pay-online").addClass("error");
    } else {
        $("#pay-pickup, #pay-online").removeClass("error");
    }

    if (billingFullName === "") {
        missingFieldsBill.push(" Full Name");
        $("#billing-full-name").removeClass("valid").addClass("error");
    } else {
        $("#billing-full-name").removeClass("error").addClass("valid");
    }

    if (billingStreetAddress === "") {
        missingFieldsBill.push(" Street");
        $("#billing-street-address").removeClass("valid").addClass("error");
    } else {
        $("#billing-street-address").removeClass("error").addClass("valid");
    }
    if (billingPostcode === "") {
        missingFieldsBill.push("Postcode");
        $("#billing-postcode").removeClass("valid").addClass("error");
    } else if (billingPostcode.length !== 4 || !/^\d{4}$/.test(billingPostcode)) { //Refer https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html
        validationErrors.push("Postcode must be exactly 4 digits");
        $("#billing-postcode").removeClass("valid").addClass("error");
    } else {
        $("#billing-postcode").removeClass("error").addClass("valid");
    }
    if (billingCity === "") {
        missingFieldsBill.push("City");
        $("#billing-city").removeClass("valid").addClass("error");
    } else {
        $("#billing-city").removeClass("error").addClass("valid");
    }
    //DO NOT QUESTION IT WORKS ITS GOOD ENOUGH
    if (billingState === "") {
        missingFieldsBill.push(" State");
        $("#billing-state").removeClass("valid").addClass("error");
    } else {
        $("#billing-state").removeClass("error").addClass("valid");
    }

    if (deliverySelected) {
        $("#delivery").attr("required", true);
        $("#full-name").attr("required", true);
        $("#postcode").attr("required", true);
        $("#street-address").attr("required", true);
        $("#city").attr("required", true);
        $("#state").attr("required", true);
        if (fullName === "") {
            missingFields.push("Full Name");
            $("#full-name").removeClass("valid").addClass("error");
        } else {
            $("#full-name").removeClass("error").addClass("valid");
        }
        //Street address cannot be empty
        if (streetAddress === "") {
            missingFields.push("Street Address");
            $("#street-address").removeClass("valid").addClass("error");
        } else {
            $("#street-address").removeClass("error").addClass("valid");
        }

        if (postcode === "") {
            missingFields.push("Postcode");
            $("#postcode").removeClass("valid").addClass("error");
        } else if (postcode.length !== 4 || !/^\d{4}$/.test(postcode)) { //Refer https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html
            validationErrors.push("Postcode must be exactly 4 digits");
            $("#postcode").removeClass("valid").addClass("error");
        } else {
            $("#postcode").removeClass("error").addClass("valid");
        }

        if (city === "") {
            missingFields.push("City");
            $("#city").removeClass("valid").addClass("error");
        } else {
            $("#city").removeClass("error").addClass("valid");
        }


        if (state === "") {
            missingFields.push("State");
            $("#state").removeClass("valid").addClass("error");
        } else {
            $("#state").removeClass("error").addClass("valid");
        }
        if (selectedCard === "") {
            missingFields.push("Card Select");
            $("#payment-method").removeClass("valid").addClass("error");
        } else {
            $("#payment-method").removeClass("error").addClass("valid");
        }

    } else {
        $("#full-name, #street-address, #postcode, #city, #state").removeClass("error valid");
    }

    if (missingFields.length > 0) {
        errMsg += "<li>The following cannot be left empty: " + missingFields.join(", ") + ".</li>";
        errMsg += "<br>";
    }
    if (missingFieldsBill.length > 0) {
        errMsg += "<li>The following Billing Fields cannot be Empty: " + missingFieldsBill.join(", ") + ".</li>";
        errMsg += "<br>";
    }
    if (validationErrors.length > 0) {
        errMsg += "<li>" + validationErrors.join("<br>") + "</li>";
        errMsg += "<br>";
    }

    //Phone number EMPTY
    if (contact === "") {
        errMsg += ("<li>You cannot leave Contact Number Empty.</li>");
        $("#contact-number").removeClass("valid").addClass("error");
    } else if (!/^0[2-478]\d{8}$/.test(contact)) {
        validationErrors.push("Contact number must be a valid Australian number");
        $("#contact-number").removeClass("valid").addClass("error");
    } else {
        $("#contact-number").removeClass("error").addClass("valid");
    }

    if (email === "") {
        errMsg += ("<li>You cannot leave Email Empty</li>");
        $("#email-address").removeClass("valid").addClass("error");
    } else {
        $("#email-address").removeClass("error").addClass("valid");
    }
    if (errMsg !== "") {
        result = false;

        if ($("#errWin").length) {
            $("#errWin ul").html(errMsg);
            var numOfItems = ((errMsg.match(/<li>/g)) || []).length + 6;
            $("#errWin").css('height', numOfItems + 'em');
            $("#errWin").css('margin-top', (-numOfItems / 2) + 'em');
            $("#overlay").show();
            $("#errWin").show();
        } else {
            var errorContainer = "<div id='overlay'></div>" +
                "<section id='errWin' class='window'><ul>" +
                errMsg +
                "</ul><a href='#' id='errBtn' class='button'>Close</a></section>";
            $("body").after(errorContainer);
            var numOfItems = ((errMsg.match(/<li>/g)) || []).length + 6;
            $("#overlay").css('visibility', 'visible');
            $("#errWin").css('margin-top', (-numOfItems / 2) + 'em');
            $("#errWin").show();
            $("#errBtn").click(function() {
                $("#overlay").remove();
                $("#errWin").remove();
            });
        }

        if ($(window).width() <= 600) {
            $("#errWin").css('font-size', '0.8rem');
        } else {
            $("#errWin").css('font-size', '1rem');
        }
    } else {
        $("#overlay").hide();
        $("#errWin").hide();
    }

    return result;
}



//
//
//CARD
//
//
//Reset form for testing purposes This will be hid but kept for development purposes
function resetForm() {
    // Clear Register form if it exists
    if ($("#reg-form").length) {
        $("#reg-form")[0].reset();
    }


    // Clear Order form if it exists
    if ($("#order-form").length) {
        $("#order-form")[0].reset();
    }
}
//It was easier just to split it into a seperate functionthen have it run with rest
//Real time check mfor if delivery is selected it should not be possible to select pay in person etc


function togglePayPickup() {
    const deliverySelected = $("#delivery").prop("checked");
    const pickupSelected = $("#pickup").prop("checked");
    const payOnlineSelected = $("#pay-online").prop("checked");
    const payInPersonSelected = $("#pay-pickup").prop("checked"); // Added this to track pay-pickup
    const selectedCard = $("#payment-method").val().trim();
    // Hide card section by def
    $("#card-section").addClass("hidden");
    $("#card-number-input").addClass("hidden");
    $("#card-number").addClass("hidden");

    if ((deliverySelected || pickupSelected) && payOnlineSelected) {
        // shows the pay method sect when pay-online and pickup select or delivery selcte
        $("#payment-method-section").show();
        $("#card-number-input").show();

        if (selectedCard === "visa" || selectedCard === "mastercard" || selectedCard === "amex") {
            $("#card-section").removeClass("hidden");
            $("#card-number-input").removeClass("hidden");
            // Set maxibonlength/minlength and placeholder based on card type
            if (selectedCard === "amex") {
                $("#card-number-input").attr({
                    maxlength: 15,
                    minlength: 15,
                    placeholder: "Enter 15-digit AMEX number"
                });
            } else {
                $("#card-number-input").attr({
                    maxlength: 16,
                    minlength: 16,
                    placeholder: "Enter 16-digit Card Number"
                });
            }
        } else {
            //If No card is select, hide  section and clear input
            $("#card-section").addClass("hidden");
            $("#card-number-input").addClass("hidden");
            $("#card-number-input").removeAttr("maxlength minlength placeholder");
        }
    } else {
        // IF not pay online or no delivery/pick hide pay and card sects
        $("#payment-method-section").hide();
        $("#card-section").addClass("hidden");
        $("#card-number-input").addClass("hidden");
        $("#card-number-input").removeAttr("maxlength minlength placeholder");
    }


    if (deliverySelected) {
        // deliver pay online only
        $("#pay-pickup").prop("checked", false).prop("disabled", true);
        $("#pay-pickup-label").hide();
        $("#pay-pickup").hide();

        $("#pay-online").prop("checked", true).prop("disabled", false);
        $("#pay-online-label").show();
        //card and paymnet
        $("#card-section").show();
        $("#card-number-input").show(); //The card input box
        $("#payment-method-section").show();
        //delivery
        $("#delivery-address").show();
        $("#same-as-delivery").show();
        $("#card-section").addClass("error");
        $("#card-number-input").addClass("error");

        if (selectedCard === "visa" || selectedCard === "mastercard" || selectedCard === "amex" || selectedCard === "") {

            $("#card-section").removeClass("hidden");
            $("#card-number-input").removeClass("hidden");
            $("#card-number-input").removeClass("valid").addClass("error");
            $("#card-number-input").val(""); //Force input val to clear when selection is changed
            // Set maxlength/minlength based on card type again
            if (selectedCard === "amex") {
                $("#card-number-input").attr({ maxlength: 15, minlength: 15, placeholder: "Enter 15-digit AMEX number" });
                $("#card-number-input").removeClass("error").addClass("valid");
            } else if (selectedCard === "mastercard" || selectedCard === "visa") {
                $("#card-number-input").attr({ maxlength: 16, minlength: 16, placeholder: "Enter 16-digit Card Number" });
                $("#card-number-input").removeClass("error").addClass("valid");
            } else { //This is the empty box condition
                $("#card-number-input").attr({ maxlength: 0, minlength: 0, placeholder: "" }).val("");
                $("#card-number-input").addClass("error");
            } // allow only numbers input
            $("#card-number-input").off("input").on("input", function() {
                this.value = this.value.replace(/\D/g, ''); //Refer https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html
            })
        } else {
            $("#card-section").addClass("hidden");
            $("#card-number-input").removeAttr("maxlength minlength placeholder").val("");
        }

        $("#delivery-address").show();
        $("#same-as-delivery").show();
    } else if (pickupSelected) {
        // Pickup allow both  organs
        $("#pay-pickup").prop("disabled", false);
        $("#pay-pickup-label").show();
        $("#pay-pickup").show();

        $("#pay-online").prop("disabled", false);
        $("#pay-online-label").show();

        $("#delivery-address").hide(); //HIDE the deliv ad
        $("#same-as-delivery").hide();

        $("#payment-method-section").hide();

        if (payOnlineSelected) {
            $("#card-section").show();
            $("#card-number-input").show();
            $("#payment-method-section").show();

            if (selectedCard === "visa" || selectedCard === "mastercard" || selectedCard === "amex" || selectedCard === "") {
                $("#card-section").removeClass("hidden");
                $("#card-number-input").val(""); //Force input val to clear when selection is changed
                if (selectedCard === "amex") {
                    $("#card-number-input").attr({ maxlength: 15, minlength: 15, placeholder: "Enter 15-digit AMEX number" });
                } else if (selectedCard === "mastercard" || selectedCard === "visa") {
                    $("#card-number-input").attr({ maxlength: 16, minlength: 16, placeholder: "Enter 16-digit Card Number" });
                } else { //This is the empty box condition
                    $("#card-number-input").attr({ maxlength: 0, minlength: 0, placeholder: "" }).val("");
                } // allow only numbers input
                $("#card-number-input").off("input").on("input", function() {
                    this.value = this.value.replace(/\D/g, ''); //Refer https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html
                });
            } else {
                $("#card-section").addClass("hidden");
                $("#card-number-input").removeAttr("maxlength minlength placeholder").val("");
            }
        } else {
            // PAY IN PERSON, CODE HIDES CARD NUM INPUT COMPLETELY
            if (payInPersonSelected) {
                $("#card-section").addClass("hidden");
                $("#card-number-input").addClass("hidden");
                $("#card-number-input").hide(); //This line hides it all
                $("#payment-method-section").hide();
                $("#card-number-input").removeAttr("maxlength minlength placeholder").val("");
            } else {
                $("#card-section").addClass("hidden");
                $("#card-number-input").addClass("hidden");
                $("#payment-method-section").hide();
                $("#card-number-input").removeAttr("maxlength minlength placeholder").val("");
            }
        }
    } else {
        // Not either select======hide payment and address sections
        $("#pay-pickup, #pay-online").prop("checked", false).prop("disabled", false).show();
        $("#pay-pickup-label, #pay-online-label").show();
        $("#card-number-input").hide();
        $("#payment-method-section").hide();
        $("#card-section").addClass("hidden");
        $("#delivery-address").hide();
        $("#same-as-delivery").hide(); // Hide checkbox if no selected
        $("#card-number-input").removeAttr("maxlength minlength placeholder").val("");
    }
}
//ADD CONDITION IF A CARD TYPE IS SELECTED SHOW THE TINY INPUT BPOX


function init() {
    //Run register
    $("#reg-form").submit(function(e) {
        if (!validateRegister()) {
            e.preventDefault();
        }
    });
    $("#order-form").submit(function(e) {
        if (!validateOrder()) {
            e.preventDefault();
        }
    });
    //To hide the Reset Btn for launch purposes
    //$("#reset-btn").hide();
    //Easy testing method
    $("#reset-btn").click(function(e) {
        e.preventDefault(); // prevent form from submitting if it's a <button type="submit">
        resetForm();
    });
    togglePayPickup();
    //This is a event listerner for the order page with delivery and pickup
    $("#delivery, #pickup").change(function() {
        togglePayPickup();
    });

    $("#pay-online, #pay-pickup").change(function() {
        togglePayPickup();
    });
}



$(document).ready(init);
//Inspired by Wheel Handler example in https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
document.addEventListener('DOMContentLoaded', function() {

    var slides = document.querySelectorAll('.flavor-slide');
    var prev = document.querySelector('.carousel-btn.prev');
    var next = document.querySelector('.carousel-btn.next');
    var current = 0;
    const featureToPage = { //Vital must ensure it stays object initalizer or else beef
        feature1: 'features.html',
        feature2: 'order.html',
        feature3: 'order.html',
        feature4: 'order.html'
    };
    $('.menu-box li').on('click', function() {
        const clickedId = $(this).attr('id');
        const slideId = clickedId.replace('menu-', '');
        const newIndex = Array.from(slides).findIndex(slide => slide.id === slideId);
        if (newIndex !== -1) {
            current = newIndex;
            updateSlide();
        }
    });

    function updateSlide() {
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.toggle('active', i === current);
        }
        slides[current].focus(); // for keyboard accessibility
    }

    prev.addEventListener('click', function() {
        current = (current - 1 + slides.length) % slides.length;
        updateSlide();
    });

    next.addEventListener('click', function() {
        current = (current + 1) % slides.length;
        updateSlide();
    });

    document.getElementById('flavors').addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prev.click();
        } else if (e.key === 'ArrowRight') {
            next.click();
        }
    });

    // Remove all highlights
    //



    // When you click any feature link, highlight that feature and run example fill if needed

    //Simplest way to achieve reused website reference,
    //https://www.w3schools.com/jsref/met_document_queryselectorall.asp



});