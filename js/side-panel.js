document.addEventListener("DOMContentLoaded", function() {
    const openPanelButton = document.getElementById("open-panel-button");
    const closePanelButton = document.getElementById("close-panel-button");
    const sidePanel = document.getElementById("side-panel");
    const overlay = document.getElementById("overlay");

    openPanelButton.addEventListener("click", function() {
        sidePanel.classList.add("open");
        overlay.classList.add("active");
    });

    closePanelButton.addEventListener("click", function() {
        sidePanel.classList.remove("open");
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", function() {
        sidePanel.classList.remove("open");
        overlay.classList.remove("active");
    });
});
