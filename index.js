'use strict';

const JavaScriptObfuscator = require('javascript-obfuscator');

var fs = require('fs');
const http = require('http');

http.createServer(function (req, res) {
    if (req.url === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.writeHead(200, {
                'Set-Cookie': 'dbgPresent=False',
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
            return;
        });
    } else if (req.url === '/exit.html') {
        fs.readFile('./exit.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
            return;
        });
    } else if (req.url === '/mapFile.js') {
        res.writeHead(200, {
            'Set-Cookie': 'dbgPresent=True',
            'Content-Type': 'text/plain'
        });
        res.end();
        return;
    } else if (req.url === '/scripts-loader.js') {
        let file1 = fs.readFileSync('./src/redirect-console.js', 'utf8');
        let file2 = fs.readFileSync('./src/run-debugger.js', 'utf8');
        let file3 = fs.readFileSync('./src/check-devtools.js', 'utf8');
        let file4 = fs.readFileSync('./src/check-map.js', 'utf8');

        let seed = Math.round(Math.random() * 10)

        let obfuscationResult = JavaScriptObfuscator.obfuscateMultiple({
            file1: file1,
            file2: file2,
            file3: file3,
            file4: file4,
        }, {
            compact: true,
            controlFlowFlattening: true,
            debugProtection: true,
            debugProtectionInterval: true,
            disableConsoleOutput: true,
            rotateStringArray: true,
            seed: seed,
            selfDefending: false,
            shuffleStringArray: true,
            splitStrings: false,
        });

        let data = obfuscationResult.file1.getObfuscatedCode() + '\n\r' +
            obfuscationResult.file2.getObfuscatedCode() + '\n\r' +
            obfuscationResult.file3.getObfuscatedCode() + '\n\r' +
            obfuscationResult.file4.getObfuscatedCode()

        res.writeHead(200, {
            'Content-Type': 'text/javascript'
        });
        res.write(data);
        res.end();
        return;
    }
}).listen(3000);

console.log('server running at http://localhost:3000/');