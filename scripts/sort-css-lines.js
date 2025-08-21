const fs = require("fs");
const glob = require("glob");

// Get all .module.css files in src/
const files = glob.sync("src/**/*.module.css");

files.forEach((file) => {
    let content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");

    let sortedContent = [];
    let braceDepth = 0;
    let blockLines = [];
    let insideBlock = false;

    lines.forEach((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.includes("{")) {
            braceDepth++;
            insideBlock = true;
            sortedContent.push(line);
        } else if (trimmedLine.includes("}")) {
            if (braceDepth === 1 && blockLines.length > 0) {
                // Sort top-level CSS properties by line length
                blockLines.sort((a, b) => a.trim().length - b.trim().length);
                sortedContent.push(...blockLines); // <-- no extra newline
                blockLines = [];
            }
            braceDepth--;
            sortedContent.push(line);
            if (braceDepth === 0) insideBlock = false;
        } else {
            if (
                insideBlock &&
                braceDepth === 1 &&
                trimmedLine.includes(":") &&
                trimmedLine.endsWith(";")
            ) {
                blockLines.push(line);
            } else {
                sortedContent.push(line);
            }
        }
    });

    // Join lines with \n, preserving file's original last line behavior
    const finalContent = sortedContent.join("\n");
    fs.writeFileSync(file, finalContent, "utf-8");
    console.log(`Sorted CSS properties by line length in ${file}`);
});
