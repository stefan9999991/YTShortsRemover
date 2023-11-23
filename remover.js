function removeShorts() {
    if (window.location.href.includes("youtube.com")) {
        // Remove the shorts navigation bar on the right
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
    
        // Remove the shorts shelf on the page
        waitForElm('span#title.style-scope.ytd-rich-shelf-renderer').then((elm) => {
            console.log('Element is ready');
            const elements = document.querySelectorAll("span#title.style-scope.ytd-rich-shelf-renderer");
            // Check if the shorts shelf is already rendered
            if (elements.length < 2) {
                setTimeout(removeShelf, 100);
            } else {
                removeShelf();
            }
        });
    }
}

function removeShelf() {
    // Keep checking whether the shorts shelf has already rendered, if so remove it.
    const elements = document.querySelectorAll("span#title.style-scope.ytd-rich-shelf-renderer");
    console.log("Number of elements: " + elements.length);
    if (elements.length == 0) {
        return;
    } else if (elements.length < 2) {
        setTimeout(removeShelf, 100);
    } else {
        for (let element_index = 0; element_index < elements.length; element_index++) {
            if (elements[element_index].innerText.toLowerCase() == "shorts") {
                console.log("Found Short shelf element");
                console.log("Something " + elements[element_index].innerText);
                elements[element_index].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = "";
            }
        }
    }
}

function loaded() {
    // similar behavior as clicking on a link
    console.log("WHAAAAAAAAAA: " + window.location.href);
    if (window.location.href.includes("youtube.com/shorts")) {
        window.location.href = "https://www.youtube.com/";
    }
    removeShorts();
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

window.onload = loaded;
window.addEventListener('yt-navigate-start', loaded, true);
