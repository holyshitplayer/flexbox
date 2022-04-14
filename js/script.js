let menuLinks = document.getElementsByClassName("header__links__link")
for (let i = 0; i < menuLinks.length; i++) {
    let menuLink = (menuLinks[i].href).replace("#", "")
    let url = (window.location.href).replace("#", "")
    if (menuLink == url) {
        menuLinks[i].classList.add("active");
    }
};