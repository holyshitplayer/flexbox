// ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ
let menuLinks = document.getElementsByClassName("header__menu__link")
for (let i = 0; i < menuLinks.length; i++) {
    let menuLink = (menuLinks[i].href).replace("#", "")
    let url = (window.location.href).replace("#", "")
    let pathname = window.location.pathname
    if (menuLink == url) {
        menuLinks[i].classList.add("active");
    } else if (pathname == "/" || pathname == "/web-t/") {
        menuLinks[0].classList.add("active");
    };
};

// МОБИЛЬНОЕ МЕНЮ
document.addEventListener("DOMContentLoaded", () => {
    const menu = new MmenuLight(
        document.querySelector(".header__menu"),
        "(max-width: 992px)"
    );

    const navigator = menu.navigation({
        theme: "light",
        title: "Меню",
    });

    const drawer = menu.offcanvas();

    document.querySelector(".header__menu__open-menu").addEventListener("click", (e) => {
        e.preventDefault();
        drawer.open();
    });

    document.querySelector(".header__menu__close-menu").addEventListener("click", (e) => {
        e.preventDefault();
        drawer.close();
    });
});

// ПЛАВАЮЩИЕ ЭЛЕМЕНТЫ
document.addEventListener("DOMContentLoaded", () => {
    let elementsDiv = document.createElement("div");
    elementsDiv.classList.add("elements");
    document.body.insertBefore(elementsDiv, document.querySelector(".header"));
    
    let elements = ["img/elements/elem1.svg", "img/elements/elem2.svg", "img/elements/elem3.svg", "img/elements/elem4.svg"];
    
    let pageWidth = document.body.clientWidth;
    let pageHeight = document.body.clientHeight;
    
    let multiplierY = 300;
    let multiplierX = 300;
    
    function random(min, max) {
        return min + Math.random() * (max - min);
    };
    
    for (let row = 0; row < Math.round(pageHeight / multiplierY); row++) {
        for (let column = 1; column < Math.round(pageWidth / multiplierX); column++) {
            let topMin = row * multiplierY;
            let topMax = row + 1 < Math.round(pageHeight / multiplierY) ? (row + 1) * multiplierY : row;
            let leftMin = column * multiplierX;
            let leftMax = column + 1 < Math.round(pageWidth / multiplierX) ? (column + 1) * multiplierX : column;
    
            let top = random(topMin, topMax);
            let left = random(leftMin, leftMax);
            let rotateAngle = random(0, 180);
            let animationDelay = random(0, 500);
            let idx = Math.round(random(0, elements.length));
            idx = idx < elements.length ? idx : idx - 1;
            let element = elements[idx];
            let elementsDiv = document.querySelector(".elements");
    
            let newElement = document.createElement("img");
            newElement.classList.add("elements__element");
            newElement.style.cssText += "top: " + top + "px;";
            newElement.style.cssText += "left: " + left + "px;";
            newElement.style.cssText += "transform: rotate(" + rotateAngle + "deg);";
            newElement.style.cssText += "animation-delay: " + animationDelay + "ms;";
            newElement.src = element;
    
            elementsDiv.appendChild(newElement);
        };
    };
});

// ТАБЫ НА ГЛАВНОЙ СТРАНИЦЕ
if (document.querySelector("[data-tab]")) {
    let tabLinks = document.querySelectorAll(".sections__examples__tab-links a");

    tabLinks.forEach(tabLink => {
        tabLink.addEventListener("click", (e) => {
            e.preventDefault();
            let linkActive = document.querySelector(".sections__examples__tab-links a.active");
            let tabActive = document.querySelector(".sections__example.active");
            let tabIndex = tabLink.getAttribute("data-tab");
            let tabContent = document.querySelector('.sections__example[data-tab="' + tabIndex + '"]');
            if (tabIndex != tabActive.getAttribute("data-tab")) {
                linkActive.classList.remove("active");
                tabActive.classList.remove("active");
                tabLink.classList.add("active");
                tabContent.classList.add("active");
            };
        });
    });
};

// МОДАЛЬНЫЕ ОКНА
if (document.querySelector(".modal")) {
    document.addEventListener("DOMContentLoaded", () => {
        let overlayDiv = document.createElement("div");
        overlayDiv.classList.add("modal__overlay");
        document.body.insertBefore(overlayDiv, document.querySelector(".modal"));

        let openButtons = document.querySelectorAll(".modal__open"),
            closeButtons = document.querySelectorAll(".modal__close"),
            overlay = document.querySelector(".modal__overlay");
        
        openButtons.forEach(openButton => {
            openButton.addEventListener("click", (e) => {
                e.preventDefault();
                let modalID = "#" + openButton.getAttribute("data-modal"),
                    modal = document.querySelector(modalID);
                
                modal.classList.add("active");
                overlay.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        closeButtons.forEach(closeButton => {
            closeButton.addEventListener("click", (e) => {
                e.preventDefault();
                let parentModal = closeButton.closest(".modal");
                
                parentModal.classList.remove("active");
                overlay.classList.remove("active");
                document.body.style.overflow = "auto";
            });
        });

        document.body.addEventListener("keyup", (e) => {
            let key = e.key;
            let activeModal = document.querySelector(".modal.active");
            if (activeModal && key == "Escape") {
                let activeModal = document.querySelector(".modal.active");

                activeModal.classList.remove("active");
                overlay.classList.remove("active");
                document.body.style.overflow = "auto";
            };
        }, false);

        overlay.addEventListener("click", () => {
            let activeModal = document.querySelector(".modal.active");

            activeModal.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    });
};