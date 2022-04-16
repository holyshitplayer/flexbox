let menuLinks = document.getElementsByClassName("header__menu__link")
for (let i = 0; i < menuLinks.length; i++) {
    let menuLink = (menuLinks[i].href).replace("#", "")
    let url = (window.location.href).replace("#", "")
    let pathname = window.location.pathname
    if (menuLink == url) {
        menuLinks[i].classList.add("active");
    } else if (pathname == "/") {
        menuLinks[0].classList.add("active");
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

// ПЛАВАЮЩИЕ ЭЛЕМЕНТЫ

let elementsDiv = document.createElement("div");
elementsDiv.classList.add("elements");
document.body.insertBefore(elementsDiv, document.querySelector('.header'))

let elements = ["img/elements/elem1.svg", "img/elements/elem2.svg", "img/elements/elem3.svg", "img/elements/elem4.svg"];

let pageWidth = document.body.clientWidth;
let pageHeight = document.body.clientHeight;

let multiplierY = 300;
let multiplierX = 300;

function random(min, max) {
    return min + Math.random() * (max - min);
}

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
        let elementsDiv = document.querySelector('.elements');

        let newElement = document.createElement("img");
        newElement.classList.add("elements__element");
        newElement.classList.add("rellax");
        newElement.style.cssText += "top: " + top + "px;";
        newElement.style.cssText += "left: " + left + "px;";
        newElement.style.cssText += "transform: rotate(" + rotateAngle + "deg);";
        newElement.style.cssText += "animation-delay: " + animationDelay + "ms;";
        newElement.src = element;

        elementsDiv.appendChild(newElement);
    }
}