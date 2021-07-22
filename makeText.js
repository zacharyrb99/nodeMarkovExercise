/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');

function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Couldn't read file at ${path}: ${error}`);
            process.exit(1);
        }else{
            generateText(data);
        }
    })
}

async function makeURLText(url){
    let resp;
    try{
        resp = await axios.get(url);
    }catch(err){
        console.log(`Cannot read text at ${url}: ${err}`);
        process.exit(1);
    }

    generateText(resp.data)
}

let [type, path] = process.argv.slice(2);

if(type === 'file'){
    makeText(path);
}else if(type === 'url'){
    makeURLText(path);
}else{
    console.log(`I don't know what to do!`);
    process.exit(1);
}
