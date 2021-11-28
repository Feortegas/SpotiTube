// ***
// General purpose script file
// ***

const tutorialModalEl = document.querySelector("#tutorial-modal");
const tutorialModalBgEl = document.querySelector("#tutorial-modal-bg");


// load the tutorial Modal
var loadTutorialModal = function() {
    tutorialModalEl.classList.add("is-active");
};

// closes the modal when user clicks on the background
tutorialModalBgEl.addEventListener("click", function() {
    tutorialModalEl.classList.remove("is-active");
});


// load tutorial modal on page load
loadTutorialModal();