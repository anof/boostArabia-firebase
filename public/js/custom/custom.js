var firebaseConfig = {
    apiKey: "AIzaSyAewmtn_CmG8V0CqyDgDA1NqtVbjzV-J8Y",
    authDomain: "boostarabia-e1ecf.firebaseapp.com",
    databaseURL: "https://boostarabia-e1ecf.firebaseio.com",
    projectId: "boostarabia-e1ecf",
    storageBucket: "boostarabia-e1ecf.appspot.com",
    messagingSenderId: "593016973448",
    appId: "1:593016973448:web:28bc2a33b0df364d"
};
var currentBooster = null;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {
    /* Custom image size in index.html */
    $(".article-thumbnail").each(function () {
        var height = $(this).height();
        $(this).children('img').height(height);
    });

    $("input[type='number']").inputSpinner();


    /* ---------------------------------------- Price Calculations ---------------------------------------- */


    /* ------------------------------------ Start Fortnite ------------------------------------ */
    if (top.location.pathname === '/boost_fortnite') {

        /* ------------------ Challenges ------------------ */
        var $challengesInput = $("#fort_challenges");

        // init page
        price = fort_challenges_price($challengesInput.val());
        $("#price").html(price);

        // on click price
        $("#challenges-tab").on("click", function () {
            price = fort_challenges_price($challengesInput.val());
            $("#price").html(price);
        });

        //on change price
        $($challengesInput).on("change", function () {
            price = fort_challenges_price($challengesInput.val());
            $("#price").html(price);
        });

        /* ------------------ Wins ------------------ */
        var $winsInput = $("#fort_wins");
        // on click price
        $("#wins-tab").on("click", function () {
            price = fort_wins_price($winsInput.val());
            $("#price").html(price);
        });

        //on change price
        $($winsInput).on("change", function () {
            price = fort_wins_price($winsInput.val());
            $("#price").html(price);
        });

        /* ------------------ Arena ------------------ */
        var $arenaInputC = $("#fort_arena_c");
        var $arenaInputD = $("#fort_arena_d");
        var $queue = $("#queue_arena");
        // on click price
        $("#arena-tab").on("click", function () {
            price = fort_arena_price($arenaInputC.val(), $arenaInputD.val(), $queue.val());
            $("#price").html(price);
        });
        //on change price
        $($arenaInputC).on("change", function () {
            if ($arenaInputD.val() <= $arenaInputC.val())
                $($arenaInputD.val(parseInt($arenaInputC.val()) + 1));

            price = fort_arena_price($arenaInputC.val(), $arenaInputD.val(), $queue.val());
            $("#price").html(price);
        });

        $($arenaInputD).on("change", function () {
            if ($arenaInputD.val() <= $arenaInputC.val())
                $($arenaInputD.val(parseInt($arenaInputC.val()) + 1));

            price = fort_arena_price($arenaInputC.val(), $arenaInputD.val(), $queue.val());
            $("#price").html(price);
        });

        $($queue).on("change", function () {
            price = fort_arena_price($arenaInputC.val(), $arenaInputD.val(), $queue.val());
            $("#price").html(price);
        });
    }// end if
    /* ------------------------------------ End Fortnite ------------------------------------ */

    /* ------------------------------------ Start Overwatch ------------------------------------ */

    if (top.location.pathname === '/boost_overwatch') {
        /* ------------------ Level ------------------ */
        var $levelsInput = $("#overwatch_levels");

        // init page
        price = overwatch_levels_price($levelsInput.val());
        $("#price").html(price);

        // on click price
        $("#levels-tab").on("click", function () {
            price = overwatch_levels_price($levelsInput.val());
            $("#price").html(price);
        });

        //on change price
        $($levelsInput).on("change", function () {
            price = overwatch_levels_price($levelsInput.val());
            $("#price").html(price);
        });

        /* ------------------ Rank ------------------ */
        var $rankInputC = $("#overwatch_rank_c");
        var $rankInputD = $("#overwatch_rank_d");
        // on click price
        $("#rank-tab").on("click", function () {
            price = overwatch_rank_price($rankInputC.val(), $rankInputD.val());
            $("#price").html(price);
        });
        //on change price
        $($rankInputC).on("change", function () {
            if (parseInt($rankInputD.val()) <= parseInt($rankInputC.val()))
                $($rankInputD.val(parseInt($rankInputC.val()) + 100));

            price = overwatch_rank_price($rankInputC.val(), $rankInputD.val());
            $("#price").html(price);
        });

        $($rankInputD).on("change", function () {
            if (parseInt($rankInputD.val()) <= parseInt($rankInputC.val()))
                $($rankInputD.val(parseInt($rankInputC.val()) + 100));

            price = overwatch_rank_price($rankInputC.val(), $rankInputD.val());
            $("#price").html(price);
        });

        /* ------------------ Placement ------------------ */
        var $placementInput = $("#overwatch_placement");
        var $seasonRank = $("#overwatch_prev_rank");
        // on click price
        $("#placement-tab").on("click", function () {
            price = overwatch_placement_price($placementInput.val(), $seasonRank.val());
            $("#price").html(price);
        });

        //on change price
        $($placementInput).on("change", function () {
            price = overwatch_placement_price($placementInput.val(), $seasonRank.val());
            $("#price").html(price);
        });

        $($seasonRank).on("change", function () {
            price = overwatch_placement_price($placementInput.val(), $seasonRank.val());
            $("#price").html(price);
        });

    } // end if
    /* ------------------------------------ End Overwatch ------------------------------------ */

    /* ------------------------------------ Start Apex ------------------------------------ */

    if (top.location.pathname === '/boost_apex') {
        /* ------------------ Level ------------------ */
        var $levelsInput = $("#apex_levels");

        // init page
        price = apex_levels_price($levelsInput.val());
        $("#price").html(price);

        // on click price
        $("#levels-tab").on("click", function () {
            price = apex_levels_price($levelsInput.val());
            $("#price").html(price);
        });

        //on change price
        $($levelsInput).on("change", function () {
            price = apex_levels_price($levelsInput.val());
            $("#price").html(price);
        });

        /* ------------------ Wins ------------------ */
        var $winsInput = $("#apex_wins");
        // on click price
        $("#wins-tab").on("click", function () {
            price = apex_wins_price($winsInput.val());
            $("#price").html(price);
        });

        //on change price
        $($winsInput).on("change", function () {
            price = apex_wins_price($winsInput.val());
            $("#price").html(price);
        });

        /* ------------------ Kills ------------------ */
        var $killsInput = $("#apex_kills");
        // on click price
        $("#kills-tab").on("click", function () {
            price = apex_kills_price($killsInput.val());
            $("#price").html(price);
        });

        //on change price
        $($killsInput).on("change", function () {
            price = apex_kills_price($killsInput.val());
            $("#price").html(price);
        });

    }//end if 
    /* ------------------------------------ End Apex ------------------------------------ */


});// End Ready


/* Start Fortnite Prices */
function fort_challenges_price(value) {
    price = value * 2;
    return parseFloat(price).toFixed(2);
}

function fort_wins_price(value) {
    price = value * 3;
    return parseFloat(price).toFixed(2);
}

function fort_arena_price(valueC, valueD, queue) {
    var price;

    switch (parseInt(valueD)) {
        case 2:
        case 3:
            price = (valueD - valueC) * 10;
            break;
        case 4:
            price = ((valueD - valueC) * 10) + 15;
            break;
        case 5:
            price = ((valueD - valueC) * 10) + 25;
            break;
        case 6:
            price = ((valueD - valueC) * 10) + 35;
            break;
        case 7:
            price = ((valueD - valueC) * 10) + 40;
            break;
        default:
            price = 0;
    }

    return parseFloat(price * parseInt(queue)).toFixed(2);
}
/* End Fortnite Prices */

/* Start Overwatch prices */
function overwatch_levels_price(value) {
    price = value * 2;
    return parseFloat(price).toFixed(2);
}


function overwatch_rank_price(valueC, valueD) {
    var current = parseInt(valueC);
    var desired = parseInt(valueD);
    var price;

    if (desired <= 1000) {
        price = (desired - current) * 0.025;
    }
    else if (desired <= 1500) {
        price = (desired - current) * 0.040;
    }
    else if (desired <= 2000) {
        price = (desired - current) * 0.045;
    }
    else if (desired <= 2500) {
        price = (desired - current) * 0.060;
    }
    else if (desired <= 3000) {
        price = (desired - current) * 0.085;
    }
    else if (desired <= 3500) {
        price = (desired - current) * 0.095;
    }
    else if (desired <= 4000) {
        price = (desired - current) * 0.110;
    }
    else if (desired <= 4500) {
        price = (desired - current) * 0.170;
    }

    return parseFloat(price).toFixed(2);
}

function overwatch_placement_price(value, seasonRank) {
    var prevRank = parseInt(seasonRank);
    var price;

    switch (prevRank) {
        case 1:
            price = value * 3;
            break;
        case 2:
            price = value * 2.5;
            break;
        case 3:
            price = value * 2.9;
            break;
        case 4:
            price = value * 3.2;
            break;
        case 5:
            price = value * 3.6;
            break;
        case 6:
            price = value * 4;
            break;
        case 7:
            price = value * 4.6;
            break;
        case 8:
            price = value * 5.1;
            break;
        default:
            price = 0;
    }

    return parseFloat(price).toFixed(2);
}
/* End Overwatch Prices */
function apex_levels_price(value) {
    price = value * 2;
    return parseFloat(price).toFixed(2);
}

function apex_wins_price(value) {
    price = value * 3;
    return parseFloat(price).toFixed(2);
}

function apex_kills_price(value) {
    price = value * 0.5;
    return parseFloat(price).toFixed(2);
}


function resendVerify(email, displayName) {
    email = email.trim();
    displayName = displayName.trim();
    data = {
        email: email,
        displayName: displayName
    };

    $.ajax({
        url: '/verifyAgain',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (response) => {
            $("#anotherEmail").children("p").html("Done!<br/> Sent another verification email to:<br/> <span style='color:#6bd8db'>" + email + "</span>");
        }
    });

}


if (top.location.pathname === '/signout')
    signOutRedirect();

function signOutRedirect() {
    let delay = 3000;
    url = "/";
    setTimeout(function () { window.location = url; }, delay);
}


/*firebase*/
// login
function login() {
    preventFormDefault();
    let email = $("#login_form #email").val();
    let password = $("#login_form #password").val();

    $("#login_errors").addClass("hidden");
    $("#login_button").addClass("buttonAnimation");
    $("#login_button").html("Logging In ..");

    firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
        console.log("Success!");
        window.location.replace("/");
    }).catch(function (error) {
        errors = error;
        // Handle Errors here.
        var errorCode = error.code;

        if (errorCode.search("email") != -1 || errorCode.search("user") != -1) {
            $("div #login_errors").html("The email you’ve entered doesn’t match any account!");

        } else if (errorCode.search("password") != -1) {
            $("div #login_errors").html("The password you’ve entered is incorrect!");
        }
        else {
            $("div #login_errors").html("An error occurred! Please try again later ..");
        }

        $("#login_errors").removeClass("hidden");
        $("#login_button").removeClass("buttonAnimation");
        $("#login_button").html("Log In");

    });

}

function preventFormDefault() {
    $("#login_form").submit(function (e) {
        e.preventDefault();
    });
    $("#reset_form").submit(function (e) {
        e.preventDefault();
    });
}

// signout
function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}

function resetPassword() {
    preventFormDefault();
    $("#reset_button").addClass("buttonAnimation");
    let email = $("#reset_form #email").val();

    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Success
        $(".form-text .container").html("<h2 class='centered_text'>A reset link has been successfully sent to <br/>"
            + email + "<br/></h2>");

    }).catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        console.log(errorCode)

        $("#reset_errors").removeClass("hidden");
        if (errorCode.search("email") != -1 || errorCode.search("user") != -1) {
            $("#reset_errors").html("The email you’ve entered doesn’t match any account!");

        } else if (errorCode.search("many") != -1) {
            $("#reset_errors").html("You are trying too many times! Please check your inbox befor trying again!");
        }
        else {
            $("#reset_errors").html("An error occurred! Please try again later ..");
        }

        $("#reset_button").removeClass("buttonAnimation");
    });
}

// keeping track of user
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        $("#username_display").html(displayName);
        $("#login_btn").attr("href", "#");
        $("#login_area_btn").addClass("dropdown");
        $("#arrow_down").removeClass("hidden");


        if (user) {
            let loc = window.location.pathname;
            if (loc == "/login" || loc == "/register")
                window.location.replace("/");

        }




    } else {
        // User is signed out.
        // ...
    }
});




function checkout() {
    $(".checkout").fadeIn().removeClass("hidden");

    $([document.documentElement, document.body]).animate({
        scrollTop: $(".checkout").offset().top
    }, 1000);
}

function hideCheckout() {
    $(".checkout").fadeOut().addClass("hidden");
}

// On Choose Booster Click
$('button[name="booster_choose_btn"]').on("click", function () {
    $('button[name="booster_choose_btn"]').removeClass("booster-choosen");
    $(this).addClass("booster-choosen");

    currentBooster = $(this).attr('option')
});

function continueCheckout() {
    if (currentBooster) {
        $(".choose-booster").fadeOut().addClass("hidden");
        $(".continue-checkout").fadeIn().removeClass("hidden")
        // a hack to be changed later
        $("#boost_container").height(1450);
    }
    else
        alert("Please choose a Booster first!");



}

// on contact method value change 

$(".contact_info_type").change(function () {
    let input = $("#contact-info-type-input");
    let description = "";
    let placeholder = ""

    switch (this.value) {
        case "WhatsApp":
            description = "Enter WhatsApp phone number here";
            placeholder = "Example: +962xxxxxxxxx";
            break;
        case "Instagram":
            description = "Enter Instagram account username here";
            placeholder = "Example: @boostarabia";
            break;
        case "Facebook Messenger":
            description = "Enter Messenger account username/phone number here"
            placeholder = "Example: @boostarabia"
            break;
        case "Email":
            description = "Enter Email address here"
            placeholder = "Example: @boostarabia@gmail.com"
            break;
        default:
            description = "Enter WhatsApp phone number here"
            placeholder = "Example: +962xxxxxxxxx"
            break;
    }

    input.attr("placeholder", placeholder)
    $(".contact-info-type-description").html(description)

});


function finishCheckout() {
    alert("currently disabled")
}