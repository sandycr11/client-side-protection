(function () {

    const devtools = {
        isOpen: false
    };

    const threshold = 160;

    const exitFunction = function () {
        window.location.replace("./exit.html");
    }

    const emitEvent = function (isOpen) {
        window.dispatchEvent(new CustomEvent('devtoolschange', {
            detail: {
                isOpen
            }
        }));
    };

    const checkDevToolOpen = function () {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (
            !(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
        ) {
            if (!devtools.isOpen) {
                emitEvent(true);
                exitFunction();
            }

            devtools.isOpen = true;
        } else {
            if (devtools.isOpen) {
                emitEvent(false);
            }

            devtools.isOpen = false;
        }
    }

    setInterval(checkDevToolOpen, 1000);

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = devtools;
    } else {
        window.devtools = devtools;
    }
})();