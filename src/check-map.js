(function () {

    const exitFunction = function () {
        window.location.replace("./exit.html");
    }

    const mapFile = function (url) {
        const script = document.createElement('script');
        script.textContent = `//# sourceMappingURL=${url}`;
        document.head.appendChild(script);
        script.remove();
    }

    const getCookieValue = function (a) {
        var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }

    mapFile('./mapFile.js');

    setInterval(() => {
        if (getCookieValue("dbgPresent") == "True") {
            exitFunction();
        }
    }, 1000);
})();