
document.addEventListener("DOMContentLoaded", () => {
    // const element = document.getElementById("mainbox");
    const element = document.getElementsByClassName("side-anim");
    // Add the 'animated' class to start the transition
    // element.classList.add("animated");
    for (let i = 0; i < element.length; i++) {
        element[i].classList.add("animated");
    }   
});

const toggleCssButton = document.getElementById('toggle-css-button');
const stylesheetLink = document.getElementsByClassName('stylesheets');

let isCssDisabled = false;

toggleCssButton.addEventListener('click', () => {
    for (let i = 0; i < stylesheetLink.length; i++) {
        if (isCssDisabled) {
            stylesheetLink[i].setAttribute('rel', 'stylesheet');
            toggleCssButton.textContent = 'CSS Off';
        } else {
            stylesheetLink[i].setAttribute('rel', 'alternate stylesheet');
            toggleCssButton.textContent = 'CSS On';
        }
    }

    isCssDisabled = !isCssDisabled;
});
