document.addEventListener("DOMContentLoaded", function() {
    const coll = document.getElementsByClassName("collapsible");

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;

            if (this.classList.contains("active")) {
                // Expand section
                content.style.maxHeight = content.scrollHeight + "px";

                content.addEventListener('transitionend', function() {
                    if (content.style.maxHeight !== '0px') {
                        content.style.maxHeight = 'unset';
                    }
                }, { once: true });

            } else {
                // Collapse section
                content.style.maxHeight = content.scrollHeight + "px";
                content.offsetHeight; // Force reflow
                content.style.maxHeight = '0';
            }
        });
    }
});
