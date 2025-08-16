//https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
//https://www.sitepoint.com/community/t/how-to-enable-hidden-form-fields-when-a-radio-button-is-selected/32373/4
// Used above as a reference

//Validation Forms

//Order Page
//Register Page
//None of requried fields aRE BLANK//PASSWORD AT LEAST 9 CHARACTERS//POSTCODE 4 DIGITS
//SHOW ALERT OR INLINE ERRORORTO DISPLAY ALL ERRORS IN INPUT FIELDS
//ALLOW FORM SUBMIT ONLY IF ALL INPUT IS VALID

//I have referenced Lab 9 and 10 in order to create a base for this
//validate form data


function validate() {
    //Maybe add .trim(); to clean up unnessary elements or data?
    var uname = $("#uname").val(); //alt use document.getElementsbyId("uid");
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();
    var email = $("#email-address").val();
    var genM = $("#gen-m").prop("checked");
    var genF = $("#gen-f").prop("checked");
    var genN = $("#gen-n").prop("checked");
    var mint = $("#mint").prop("checked");
    var vanilla = $("#vanilla").prop("checked");
    var neapolitan = $("#neapolitan").prop("checked");
    var rainbow = $("#rainbow").prop("checked");
    var chocCaramel = $("#choc-caramel").prop("checked");
    var hearAbout = $("#hear-about").val();


    //had issue with confirmation and validation mayeb use a let isValid codniton and defien eahc con with isvlaid=false
    var errMsg = ""; //this stores the error messages
    var pwdErrors = []; //this stores the error messages for the must include
    var pwdEmpty = []; //this stores the error messages for the must include
    var result = true; // assume no errors by default

    //ADD A THING TO CHIGHLIGHT THE THING 
    //IF INPUT VALID
    //GLOW GREEN
    //IF INPUT NOT VALID
    //GLOW RED
    if (!hearAbout) {
        errMsg += "<li>Please select how you heard about us.</li>";
        $("#hear-about").attr("required", true);
    }

    //Password conditions 
    if (pwd1 == "") { //is Password empty?

        $("#pwd1").attr("required", true);
        pwdEmpty.push("Password");
    }
    if (pwd2 == "") { //is Retyped Password empty?
        pwdEmpty.push("Retyped Password");
        $("#pwd2").attr("required", true);
    }
    if (pwd1 != "" && pwd2 != "" && pwd1 != pwd2) { //do passwords match?
        errMsg += "Passwords do not match.";
    }

    //check both are at least 9 characters
    if (pwd1.length < 9 || pwd2.length < 9) {
        pwdErrors.push("9 Characters");
    }
    //check both have at least one uppercase 
    if (!/[A-Z]/.test(pwd1) || !/[A-Z]/.test(pwd2)) {
        pwdErrors.push("One Uppercase letter");
    }
    //check both have at least one lowercase
    if (!/[a-z]/.test(pwd1) || !/[a-z]/.test(pwd2)) {
        pwdErrors.push("One Lowercase letter");
    }
    //check both have at least one symbol
    if (!/[^a-zA-Z0-9]/.test(pwd1) || !/[^a-zA-Z0-9]/.test(pwd2)) {
        pwdErrors.push("One Symbol");
    }


    //Validate errors for UserID
    if (uname == "") { //is UserName empty?
        pwdEmpty.push("Username");
        $("#uname").attr("required", true);
    }


    //Validate errors for Email
    if (email == "") { //is Email empty?
        $("#email-address").attr("required", true);
        pwdEmpty.push("Email");
    }
    //Validate errors for Phone Number

    //Validate errors for Gender
    if ((!genM) && (!genF) && (!genN)) { //check whether gender is selected

        pwdEmpty.push("Gender");
    }
    //Validate errors for Favorite Flavour
    if ((!mint) && (!vanilla) && (!neapolitan) && (!rainbow) && (!chocCaramel)) { //check whether gender is selected
        pwdEmpty.push("Favorite Flavour/s");
    }
    //What is empty

    if (pwdEmpty.length > 0) {
        errMsg += "<li>The following cannot be left empty: " + pwdEmpty.join(", ") + ".</li>";
        errMsg += "<br>";
    }
    //Password must include

    if (pwdErrors.length > 0) {
        errMsg += "<li>Password must include at least: " + pwdErrors.join(", ") + ".</li>";
    }

    //If any error/s detected display error message

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
//updated function it from the lab 10 to make it work with new information
function resetForm() {
    //Clear all input
    $("#reg-form")[0].reset();

}

function init() {
    $("#reg-form").submit(function(e) {
        if (!validate()) {
            e.preventDefault();
        }
    }); //Easy testing method
    $("#reset-btn").click(function() {
        resetForm();
    });
}


$(document).ready(init);

//credit card errrors
//16 digit for visa and mastercard
//15 for american

/* execute function init() once the window is loaded
$(document).ready(init);


document.addEventListener("DOMContentLoaded", function() {

    const deliveryRadio = document.getElementById("delivery");
    const pickupRadio = document.getElementById("pickup");
    const payOnline = document.getElementById("pay-online");
    const payPickup = document.getElementById("pay-pickup");

    const addressSection = document.getElementById("address-section");
    const cardSection = document.getElementById("card-section");

    // Handle Delivery
    deliveryRadio.addEventListener("change", function() {
        if (this.checked) {
            addressSection.classList.remove("hidden");
            payPickup.disabled = true; //disabled pay on pickup user cannot select

            payOnline.checked = true;
            showCardSection();
            cardSection.classList.remove("hidden");
        }
    });
    //Handle Pickup Options
    pickupRadio.addEventListener("change", function() {
        if (this.checked) {
            addressSection.classList.add("hidden");
            cardSection.classList.add("hidden");
            cardSection.classList.add("hidden");
        }
    });
    payOnline.addEventListener("change", showCardSection);
    payPickup.addEventListener("change", showCardSection);



    function showCardSection() {
        if (payOnline.checked) {
            cardSection.classList.remove("hidden");
        } else if (payPickup.checked) {
            cardSection.classList.add("hidden");
        } else if (payOnline.checked) {
            cardSection.classList.add("hidden");
        } else {
            cardSection.classList.add("hidden");
        }
    }
});
//Billing address hsould automatically be same as s

//OLDDDD


var ClickCount = 0;
var clickLimit = 0; // Max number of clicks
function check(id) {
    if (id.checked) {
        if (ClickCount <= clickLimit) {
            ClickCount++;
            createTextBox(id);
        } else {
            return;
        }
    }
}

function uncheck() {
    document.getElementById("").checked = false;
}
//https://www.w3schools.com/jsref/prop_radio_checked.asp 

function createTextBox(id) {
    // Create new input
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "gen-unlist");
    input.setAttribute("value", "cheese"); //TEST VALUE

    document.getElementById("unlisted").appendChild(input);
} */