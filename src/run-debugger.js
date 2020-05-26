(function () {
    const exitFunction = function () {
        window.location.replace("./exit.html");
    }

    const checkDebugging = function () {
        let minimalUserResponseInMiliseconds = 100;
        let before = new Date().getTime();
        eval("debugger")
        var after = new Date().getTime();
        if (after - before > minimalUserResponseInMiliseconds) {
            exitFunction();
        } else {
            setTimeout(checkDebugging, 5000);
        }
    }

    checkDebugging();
})();