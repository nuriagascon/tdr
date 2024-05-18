document.addEventListener("DOMContentLoaded", function() {
    const openPanelButton = document.getElementById("search-button");
    const searchCancelButton = document.getElementById("search-cancel");

    const searchInput = document.getElementById("search-input");

    const header = document.querySelector(".header");

    function clearSearchInput(){
        searchInput.value = "";

        let event = new Event('input', {
            bubbles: true,
            cancelable: true
        });

        searchInput.dispatchEvent(event);
    }

    openPanelButton.addEventListener("click", function() {
        header.classList.add("mobile-search");
        searchInput.select();
        clearSearchInput();
    });

    searchCancelButton.addEventListener("click", function() {
        header.classList.remove("mobile-search");
        clearSearchInput();
    });

    addEventListener("resize", (event) => {
        let width = window.innerWidth;

        if (width > 1160) {
            header.classList.remove("mobile-search");
        }
    });
});