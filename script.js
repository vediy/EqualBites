function centerNavbar() {
    var navbar = document.getElementById("hnavbar");
    var navbarWidth = navbar.clientWidth;
    var clientWidth = window.innerWidth;
    navbar.style.left = (clientWidth / 2) - (navbarWidth / 2) + "px";
}

function centerMap() {
    var navbar = document.getElementById("map");
    var navbarWidth = navbar.clientWidth;
    var clientWidth = window.innerWidth;
    navbar.style.left = (clientWidth / 2) - (navbarWidth / 2) + "px";
}
centerNavbar();
window.addEventListener('resize', centerNavbar, false);
centerMap();
window.addEventListener('resize', centerMap, false);