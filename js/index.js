//$('.carousel').carousel({
//    interval: 5000
//})

$(window).load(function() {
    $(".loader").fadeOut("slow");
});

var toolDiv = $("#toolwrap");

function createSkillBar() {
    $('.skill-bar').each(function () {
        var element = $(this).find('.skill-percent');
        element.css("width", "0%");
        element.html("");
        var percentValue = $(this).attr('data-percent');
        element.animate({
            width: percentValue
        }, 4000, function () {
            var elementHTML = "<span style='color:white; font-size:75%;'>" + percentValue + "</span>"
            element.html(elementHTML);
        });
        
    });
}

$(document).ready(function () {
    createSkillBar();
});


toolDiv.mouseenter(function () {
    createSkillBar();
});

function checkNullUndefinedOrEmpty(value) {
    if (value == undefined || value == null || value == "") {
        return true;
    }
    return false;
}

function moveToElement(elementName) {
    var href = elementName.href;
    var elementId = "#" + href.substring(href.lastIndexOf("#") + 1);
    var offset = $(elementId).offset();
    var currentTopValue = document.scrollingElement.scrollTop;
    var navMenuBar = $("#gn-menu").css("height");
    offset = offset.top - navMenuBar.substr(0, navMenuBar.indexOf("px"));
    if (Math.abs(currentTopValue - offset) < 100)
    {
        $('html, body').animate({ scrollTop: offset }, 10000);
    }
    else
    {
        $('html, body').animate({ scrollTop: offset }, 1000);
    }
    if (elementId == "#tooltech") {
        createSkillBar();
    }
    return false;
};

function initMap() {
    var myGradLocation = { lat: 32.985625, lng: -96.750838};
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

    var myMAQLocation = { lat: 19.112739, lng: 72.870059 };
    var mapMAQ = new google.maps.Map(document.getElementById('map-maq'), {
        zoom: 15,
        center: myMAQLocation
    });
    var markerMAQ = new google.maps.Marker({
        position: myMAQLocation,
        animation: google.maps.Animation.DROP,
        map: mapMAQ
    });
};

function mobilecheck() {
    if (window.innerWidth <= 800 && window.innerHeight <= 600) {
        return true;
    }
    return false;
}

function gnMenu(el) {
    this.el = el;
    this._init();
}

document.addEventListener('scroll', function () {
    var currentTop = document.scrollingElement.scrollTop;
    if (currentTop > 100)
    {
        if ($("#homeLink").css("display") == "none")
        {
            $("#homeLink").css("display", "block");
        }
        if ($("#move-top").css("display") == "none") {
            $("#move-top").css("display", "block");
        }
    }
    else
    {
        if ($("#homeLink").css("display") == "block") {
            $("#homeLink").css("display", "none");
        }
        if ($("#move-top").css("display") == "block") {
            $("#move-top").css("display", "none");
        }
    }
});

gnMenu.prototype = {
    _init: function () {
        this.trigger = this.el.querySelector('a.gn-icon-menu');
        this.menu = this.el.querySelector('nav.gn-menu-wrapper');
        this.isMenuOpen = false;
        this.eventtype = mobilecheck() ? 'touchstart' : 'click';
        this._initEvents();

        var self = this;
        this.bodyClickFn = function () {
            self._closeMenu();
            this.removeEventListener(self.eventtype, self.bodyClickFn);
        };
    },
    _initEvents: function () {
        var self = this;

        this.trigger.addEventListener('mouseenter', function (ev) { self._openIconMenu(); });
        this.trigger.addEventListener('mouseleave', function (ev) { self._closeIconMenu(); });

        this.menu.addEventListener('mouseenter', function (ev) {
            self._openMenu();
            document.addEventListener(self.eventtype, self.bodyClickFn);
        });
        this.menu.addEventListener('mouseleave', function (ev) {
            self._closeMenu();
            document.addEventListener(self.eventtype, self.bodyClickFn);
        });
        this.menu.addEventListener('click', function (ev) {
            self._closeMenu();
        });

        this.trigger.addEventListener(this.eventtype, function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        if (self.isMenuOpen) {
            self._closeMenu();
            document.removeEventListener(self.eventtype, self.bodyClickFn);
        }
        else {
            self._openMenu();
            document.addEventListener(self.eventtype, self.bodyClickFn);
        }
        });
        this.menu.addEventListener(this.eventtype, function (ev) { ev.stopPropagation(); });
    },
    _openIconMenu: function () {
        $(this.menu).addClass('gn-open-part');
    },
    _closeIconMenu: function () {
        $(this.menu).removeClass('gn-open-part');
    },
    _openMenu: function () {
        if (this.isMenuOpen) return;
        $(this.trigger).addClass('gn-selected');
        this.isMenuOpen = true;
        $(this.menu).addClass('gn-open-all');
        this._closeIconMenu();
    },
    _closeMenu: function () {
        if (!this.isMenuOpen) return;
        $(this.trigger).removeClass('gn-selected');
        this.isMenuOpen = false;
        $(this.menu).removeClass('gn-open-all');
        this._closeIconMenu();
    }
}
// add to global namespace
window.gnMenu = gnMenu;