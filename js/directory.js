function showHide(element) {
    var list = element.nextElementSibling;
    if (list.style.display === "block") {
        list.style.display = "none";
    } else {
        list.style.display = "block";
    }
}