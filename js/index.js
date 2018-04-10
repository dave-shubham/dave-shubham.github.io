//$('.carousel').carousel({
//    interval: 5000
//})

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
    offset = offset.top;
    $('html, body').animate({ scrollTop: offset }, 'slow');
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
        zoom: 12,
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

function gnMenu(el, options) {
    this.el = el;
    this._init();
}

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

        //if (!mobilecheck()) {
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
            this.menu.addEventListener('touchend', function (ev) {
                self._closeMenu();
            });
        //}
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