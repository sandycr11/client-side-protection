(function () {
    const redirectConsole = function () {
        if (typeof window !== 'undefined') {
            var fakeFunction = function () {};
            window['console']['log'] = fakeFunction;
        } else {
            console.log("not in browser environment.");
        }
    };
    redirectConsole();
})();