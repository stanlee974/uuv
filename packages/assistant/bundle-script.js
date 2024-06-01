const fs = require("fs");
const conf = require("./launcher/conf.json");
const path = require("path");

const TRANSLATOR_DECLARATION = `if (typeof translator === 'undefined') {
    var translator = null;
}
`;
const CSS_CONTENT = fs.readFileSync(__dirname + conf.cssFile).toString();
const REACT_SCRIPT = fs.readFileSync(__dirname + conf.reactScript).toString();
const UNIFIED_SCRIPT = path.join(__dirname, "dist", conf.unifiedFile);

function initReactDomRootElementFn(uuvCssContent, reactScript) {
    return `
window.onload = function() {
    if (window.location === window.parent.location) {
        console.log("DOMContentLoaded");
        loadMainScript();
        const rootElement = document.createElement("div");
        const event = translator !== undefined ? new CustomEvent("UUVAssistantReadyToLoad", {
            detail: {
                translator: translator
            }
        }) : new Event("UUVAssistantReadyToLoad");
        rootElement.id = "uvv-assistant-root";
        document.body.appendChild(rootElement);
        
        const additionalLayersElement = document.createElement("div");
        additionalLayersElement.id = "uvv-assistant-additional-layers";
        const keyboardLayerElement = document.createElement("div");
        keyboardLayerElement.id = "uvv-assistant-keyboard-layer";
        additionalLayersElement.appendChild(keyboardLayerElement);
        document.body.appendChild(additionalLayersElement);
        
        document.dispatchEvent(event);

        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = "${uuvCssContent}";
        document.getElementsByTagName("head")[0].appendChild(style);
    }
};

function loadMainScript() {
    ${reactScript}
}
`;
}

function main() {
    console.log("Generating bundle file");
    fs.writeFileSync(UNIFIED_SCRIPT, TRANSLATOR_DECLARATION);
    fs.writeFileSync(UNIFIED_SCRIPT, initReactDomRootElementFn(CSS_CONTENT, REACT_SCRIPT), { flag: "a+" });
    console.log("Bundle file generated: ", UNIFIED_SCRIPT);
    console.log("Copying bundle file into docs");
    fs.copyFileSync(UNIFIED_SCRIPT, path.join(__dirname, "..", "docs", "static", "assistant", path.basename(UNIFIED_SCRIPT)));
    console.log("Bundle file copied into docs");
}

main();
