// ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ
let menuLinks = document.getElementsByClassName("header__menu__link");
for (let i = 0; i < menuLinks.length; i++) {
    let menuLink = menuLinks[i].pathname;
    let pathname = window.location.pathname;
    if (menuLink == pathname) {
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

    let multiplierY = 450;
    let multiplierX = 450;

    function random(min, max) {
        return min + Math.random() * (max - min);
    };

    for (let row = 0; row <= Math.round(pageHeight / multiplierY); row++) {
        for (let column = 0; column <= Math.round(pageWidth / multiplierX); column++) {
            let topMin = row * multiplierY;
            let topMax = row + 1 <= Math.round(pageHeight / multiplierY) ? (row + 1) * multiplierY : row;
            let leftMin = column * multiplierX;
            let leftMax = column + 1 <= Math.round(pageWidth / multiplierX) ? (column + 1) * multiplierX : column;

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
if (document.querySelector("[data-modal]")) {
    document.addEventListener("DOMContentLoaded", () => {
        let container = document.createElement("div");
        container.classList.add("modal__container");
        document.body.insertBefore(container, document.querySelector("script"));

        let openButtons = document.querySelectorAll(".modal__open");

        openButtons.forEach(openButton => {
            openButton.addEventListener("click", (e) => {
                e.preventDefault();

                let modalID = "#" + openButton.getAttribute("data-modal"),
                    modal = document.querySelector(modalID);

                if (modal) {
                    openModal(modal);
                } else {
                    fetch("modals.html").then((response) => {
                        return response.text();
                    }).then((html) => {
                        let parser = new DOMParser(),
                            doc = parser.parseFromString(html, "text/html"),
                            modal = doc.querySelector(modalID),
                            closeButton = modal.querySelector(".modal__close");
    
                        codeIndents(modal);
    
                        container.appendChild(modal);
                        closeButton.addEventListener("click", (e) => {
                            closeModal(e);
                        });
    
                        openModal(modal);
                    }).catch((error) => {
                        console.error("Ошибка при выполнении запроса.", error)
                    });
                };
                
                container.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        document.body.addEventListener("keyup", (e) => {
            let key = e.key;
            let activeModal = document.querySelector(".modal.active");
            if (activeModal && key == "Escape") {
                closeModal(e);
            };
        }, false);

        container.addEventListener("click", (e) => {
            closeModal(e);
        });

        function openModal(modal) { 
            modal.classList.add("active");
            modal.style.display = "block";
            modal.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        };

        function closeModal(e) {
            e.preventDefault();

            let activeModal = document.querySelector(".modal.active");
            
            activeModal.classList.remove("active");
            container.classList.remove("active");
            document.body.style.overflow = "auto";
            setTimeout(() => activeModal.style.display = "none", 150);
        };
    });
};

// ОТСТУПЫ У КОДА
function codeIndents(doc) {
    let codeLines = doc.querySelectorAll("code[data-level]");

    codeLines.forEach(codeLine => {
        let nestingLevel = codeLine.getAttribute("data-level"),
            firstSpan = codeLine.firstChild;
        let newSpan = document.createElement("span");
        newSpan.innerHTML = "&nbsp;".repeat(4 * nestingLevel);

        codeLine.insertBefore(newSpan, firstSpan);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("code[data-level]")) {
        codeIndents(document);
    };
});