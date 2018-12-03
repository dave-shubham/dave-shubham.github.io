//$('.carousel').carousel({
//    interval: 5000
//})

var toolDiv = $("#toolwrap");
var typeWriterIntroDiv = $("#typeWriterIntro");
var introDivCounter = 0;
var introWordCounter = 0;
var introWordSpeed = 500;
var introWordText = "";
var introDivText = ["Hello!", "Namaste!", "Hola!", "Howdy!", "Guten Tag!", "Bonjour!", "Olà!", "Merhaba!", "Ciao!"];

function type() {
    if (introWordCounter < introWordText.length) {
        document.getElementById("typeWriterIntro").innerHTML += introWordText.charAt(introWordCounter);
        introWordCounter++;
        setTimeout(type, introWordSpeed);
    }
}

function typeWriter() {
    introWordCounter = 0;
    introWordText = introDivText[introDivCounter];
    document.getElementById("typeWriterIntro").innerHTML = "";
    type();
    if (introDivCounter < introDivText.length - 1) {
        introDivCounter++;
    }
    else {
        introDivCounter = 0;
    }
}

function createSkillBar() {
    $('.skill-bar').each(function () {
        var element = $(this).find('.skill-percent');
        element.css("width", "0%");
        element.html("");
        var percentValue = $(this).attr('data-percent');
        element.animate({
            width: percentValue
        }, 750, function () {
            var elementHTML = "<span style='color:#50433B; font-size:110%; font-weight: bold;'>" + percentValue + "</span>"
            element.html(elementHTML);
        });
    });
}

function updateProgressBar() {
    var maxHeight = document.body.clientHeight - screen.height
    var currentTopValue = document.scrollingElement.scrollTop;
    var element = $('.navbar-progressbar');
    var percentValue = currentTopValue >= maxHeight ? "100%" : ((currentTopValue / maxHeight) * 100) + "%";
    element.css("width", percentValue);
}

function fillIntroBar() {
    var topBar = $('.border-bar.up');
    var bottomBar = $('.border-bar.bottom');
    var initialValue = "0%", finalValue = "100%";
    topBar.css("background-color", "#50433B");
    bottomBar.css("background-color", "#50433B");
    topBar.css("width", initialValue);
    bottomBar.css("width", initialValue);
    topBar.css("width", finalValue);
    bottomBar.css("width", finalValue);
}

function clearIntroBar() {
    var topBar = $('.border-bar.up');
    var bottomBar = $('.border-bar.bottom');
    var initialValue = "100%", finalValue = "0%";
    topBar.css("width", initialValue);
    bottomBar.css("width", initialValue);
    topBar.css("width", finalValue);
    bottomBar.css("width", finalValue);
    topBar.css("background-color", "transparent");
    bottomBar.css("background-color", "transparent");
}

function apparatingLetters() {
    var elementArray = $(".apparateLetters");
    elementArray.removeClass("invisible");
    for (var index = 0; index < elementArray.length; index++) {
        var element = elementArray[index];
        //element.removeClass("invisible");
        var elementContent = element.innerText;
        var html = "";
        for (var index2 = 0; index2 < elementContent.length; index2++) {
            if (elementContent[index2] == " ") {
                html += elementContent[index2];
            }
            else {
                html += "<span>" + elementContent[index2] + "</span>";
            }
        }
        element.innerHTML = html;
    }
}

$(document).ready(function () {
    $(".loader").fadeOut(800, function () {
        apparatingLetters();
        createSkillBar();
        checkReturnToTop();
        typeWriter();
        updateProgressBar();
        fillIntroBar();
    });
});


toolDiv.mouseenter(function () {
    createSkillBar();
});

$(".intro").mouseenter(function () {
    clearIntroBar();
});

$(".intro").mouseleave(function () {
    fillIntroBar();
});

function checkNullUndefinedOrEmpty(value) {
    if (value == undefined || value == null || value == "") {
        return true;
    }
    return false;
}

function moveToElement(goToElementName) {
    var elementId = "#" + goToElementName;
    var offset = $(elementId).offset();
    var navMenuHeight = $(".navbar").css("height");
    offset = offset.top - parseFloat(navMenuHeight.substring(0, navMenuHeight.lastIndexOf("px"))) + 1;
    $('html, body').animate({ scrollTop: offset }, 1000);
    $("#navbarSupportedContent").children().find('.active').removeClass('active');
    $(elementId).addClass('active');
    if (elementId == "#tooltech") {
        createSkillBar();
    }
    return false;
};

function initMap() {
    var myGradLocation = { lat: 32.985625, lng: -96.750838 };
    var mapGrad = new google.maps.Map(document.getElementById('map-grad'), {
        zoom: 12,
        center: myGradLocation
    });
    var markerGrad = new google.maps.Marker({
        position: myGradLocation,
        animation: google.maps.Animation.DROP,
        map: mapGrad
    });

    var myUGradLocation = { lat: 23.129832, lng: 72.541336 };
    var mapUGrad = new google.maps.Map(document.getElementById('map-ugrad'), {
        zoom: 15,
        center: myUGradLocation
    });
    var markerUGrad = new google.maps.Marker({
        position: myUGradLocation,
        animation: google.maps.Animation.DROP,
        map: mapUGrad
    });
};

function mobilecheck() {
    if (window.innerWidth <= 800 && window.innerHeight <= 600) {
        return true;
    }
    return false;
}

function checkReturnToTop() {
    var currentTop = document.scrollingElement.scrollTop;
    if (currentTop > 100) {
        if ($("#move-top").css("visibility") == "hidden") {
            $("#move-top").css("visibility", "visible");
        }
    }
    else {
        if ($("#move-top").css("visibility") == "visible") {
            $("#move-top").css("visibility", "hidden");
        }
    }
}

function isNavBarOpen() {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("show");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
        $("#navMenuToggleIcon").click();
    }
}

document.addEventListener('scroll', function () {
    checkReturnToTop();
    isNavBarOpen();
    updateProgressBar();
});

document.addEventListener('click', function () {
    isNavBarOpen();
});

setInterval(typeWriter, 6000);
