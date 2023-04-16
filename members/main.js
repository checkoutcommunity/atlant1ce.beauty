if (isThemeLight()) {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
} else {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
}

$(() => {
    const pathSplit = window.location.pathname.split("/");
    let mainRoute = window.location.pathname.length <= 1 ? '' : (pathSplit[1])
    if (mainRoute === 'ap' && pathSplit.length > 2) {
        mainRoute += "_" + pathSplit[2]
    }

    let navSelected = $('#navigation_' + mainRoute);
    if (navSelected.length) {
        navSelected.addClass('active');
    }

    let navFooterSelected = $('#navigationfooter_' + mainRoute);
    if (navFooterSelected.length) {
        navFooterSelected.addClass('active');
    }
});

$(function () {
    updateColorMode();

    $(".color-mode-selector").click(function () {
        if ($("body").hasClass("dark-theme")) {
            $("body").removeClass("dark-theme");
            $("body").addClass("light-theme");
            localStorage.setItem("theme", "light");
        } else {
            $("body").removeClass("light-theme");
            $("body").addClass("dark-theme");
            localStorage.setItem("theme", "dark");
        }
        updateColorMode();
    });

    let serverIp = "na.minemen.club";
    $(function () {
        getMCPlayers(serverIp, document.querySelector("#mc-data"));
    });

    var btnContainer = document.getElementById("statistics-tabs");
    if (btnContainer !== null) {
        var btns = btnContainer.getElementsByClassName("tab-trigger");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = btnContainer.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    }

    var btnContainer2 = document.getElementById("lbs-tabs");
    if (btnContainer2 !== null) {
        var btns = btnContainer2.getElementsByClassName("tab-trigger");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = btnContainer2.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    }

    var sidemenu = $('#side-menu').offset();
    if (sidemenu != null) {
        $(window).scroll(function () {
            if ($(window).width() > 1360) {
                if ($(window).scrollTop() > sidemenu.top) {
                    $('#side-menu').addClass('sticky');
                } else {
                    $('#side-menu').removeClass('sticky');
                }
            } else {
                $('#side-menu').removeClass('sticky');
            }
        });
    }
});

function updateColorMode() {
    if ($("body").hasClass("dark-theme")) {
        $(".color-mode-selector").html('<i class="fas fa-moon" aria-hidden="true"></i>');
        $(".logo").html('<img src="/img/logo-smaller.png">');
        $(".left-part-footer").html('<img src="/img/logo-smaller-footer-dark.png">');
    } else {
        $(".color-mode-selector").html('<i class="fas fa-sun" aria-hidden="true"></i>');
        $(".logo").html('<img src="/img/logo-smaller-light.png">');
        $(".left-part-footer").html('<img src="/img/logo-smaller-footer-light.png">');
    }
}

function isThemeLight() {
    return localStorage.getItem("theme") === "light";
}

function getMCPlayers(ip, element) {
    if (element != null) {
        fetch(`https://mc-api.net/v3/server/ping/${ip}`)
            .then(res => res.json())
            .then(data => element.innerHTML = data["players"]["online"])
    }
}

function copyIP() {
    var copyText = "minemen.club";
    navigator.clipboard.writeText(copyText);

    alert("IP copied!");
}

function mobileNav() {
    var x = document.getElementById("nav-links");
    var y = document.getElementById("navbar");
    var z = document.getElementsByClassName("mobile-nav");
    if (x.style.display === "flex") {
        x.style.display = null;
        y.classList.remove('mobile-nav');
    } else {
        x.style.display = "flex";
        x.style.flexDirection = "column";
        y.classList.add('mobile-nav');
        var i;
        for (i = 0; i < z.length; i++) {
            z[i].style.display = "block";
        }
    }
}

function mobileSearch() {
    var x = document.getElementById("mobilesearch");
    if (x.className === "search-box") {
        x.className += " mobile-search";
        x.style.display = "flex";
    } else {
        x.className = "search-box";
        x.style.display = null;
    }
}

AOS.init();