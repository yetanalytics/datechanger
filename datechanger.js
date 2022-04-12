#!/usr/bin/env node

const fs = require('fs');

const [,, date, sourceFile, targetFile] = process.argv;

if(date == null){
    throw new Error("Date CLI argument not provided!");
}

if(sourceFile == null){
    throw new Error("sourceFile CLI argument not provided!");
}

if(targetFile == null){
    console.log("No target JSON file path provided, printing updated xAPI Statements instead of writing to JSON file!");
}

function processData(err, data){
    if (err) throw err;
    // Parse data from file
    let statements = JSON.parse(data);
    // Most recent timestamp first
    statements.sort((function (a, b) {
        if(a.timestamp == null || b.timestamp == null){
            throw new Error('Statement did not contain a timestamp!');
        }
        return new Date(a.timestamp) - new  Date(b.timestamp);}));
    // Derive offset
    let offset = new Date(date) - new Date(statements[0].timestamp);
    // Map application of offset to statement timestamps
    statements.map(function(statement){
        let updatedTime = new Date(statement.timestamp).getTime() + offset;
        return statement.timestamp = new Date(updatedTime);
    });
    // Output - Log or Write
    if(targetFile == null){
        statements.map(function(stmt){ console.log(stmt); });
    } else {
        console.log("Writing updated xAPI Statements to "+targetFile);
        fs.writeFileSync(targetFile, JSON.stringify(statements, null, 2));
    }
}

fs.readFile(sourceFile, processData);
