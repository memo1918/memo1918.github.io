
document.addEventListener("DOMContentLoaded", () => {
    // const element = document.getElementById("mainbox");
    const element = document.getElementsByClassName("side-anim");
    // element.classList.add("animated");
    for (let i = 0; i < element.length; i++) {
        element[i].classList.add("animated");
    }   
});
