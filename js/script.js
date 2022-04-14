let menuLinks = document.getElementsByClassName("header__menu__link")
for (let i = 0; i < menuLinks.length; i++) {
    let menuLink = (menuLinks[i].href).replace("#", "")
    let url = (window.location.href).replace("#", "")
    if (menuLink == url) {
        menuLinks[i].classList.add("active");
    }
};

document.addEventListener(
    "DOMContentLoaded", () => {
        const menu = new MmenuLight(
            document.querySelector(".header__menu"),
            "(max-width: 992px)"
        );

        const navigator = menu.navigation({
            theme: "light",
            title: "Меню",
        });
        const drawer = menu.offcanvas();

        document.querySelector('.header__menu__open-menu')
            .addEventListener('click', (evnt) => {
                evnt.preventDefault();
                drawer.open();
            });

        document.querySelector('.header__menu__close-menu')
        .addEventListener('click', (evnt) => {
            evnt.preventDefault();
            drawer.close();
        });
    }
);