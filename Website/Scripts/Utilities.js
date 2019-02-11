function addClass(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

function removeClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

function hide(element) {
    addClass(element, "hidden");
}

function show(element) {
    removeClass(element, "hidden");
}