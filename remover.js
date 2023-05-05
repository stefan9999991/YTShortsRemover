if (window.location.href.includes("youtube.com")) {
    waitForElm('.style-scope.ytd-guide-section-renderer').then((elm) => {
        console.log('Element is ready');
        const elements = document.getElementsByClassName("title style-scope ytd-guide-entry-renderer");
        for (let element_index = 0; element_index < elements.length; element_index++) {
            if (elements[element_index].innerText.toLowerCase() == "shorts") {
                console.log("Found Short button element");
                console.log("Something " + elements[element_index].innerText);
                elements[element_index].parentElement.parentElement.parentElement.innerHTML = "";
            }
        }
    });

    waitForElm('span#title.style-scope.ytd-rich-shelf-renderer').then((elm) => {
        console.log('Element is ready');
        const elements = document.querySelectorAll("span#title.style-scope.ytd-rich-shelf-renderer");
        for (let element_index = 0; element_index < elements.length; element_index++) {
            if (elements[element_index].innerText.toLowerCase() == "shorts") {
                console.log("Found Short shelf element");
                console.log("Something " + elements[element_index].innerText);
                elements[element_index].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = "";
            }
        }
    });
}

window.onload = function() {
    // similar behavior as clicking on a link
    console.log("WHAAAAAAAAAA: " + window.location.href);
    if (window.location.href.includes("youtube.com/shorts")) {
        window.location.href = "https://www.youtube.com/";
    }
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}