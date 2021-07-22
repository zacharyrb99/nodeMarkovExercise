/** Textual markov chain generator */
const {stripHtml} = require('string-strip-html')

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();

    for(let i = 0; i < this.words.length; i++){
      let twoWords = this.words[i] + ' ' + this.words[i + 1];
      let nextWord = this.words[i + 2] || null;

      if(chains.has(twoWords)){
        chains.get(twoWords).push(nextWord);
      }else{
        chains.set(twoWords, [nextWord]);
      }
    }

    this.chains = chains;
  }

  choice(array){
    return array[Math.floor(Math.random() * array.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = this.choice(keys);
    let out = [];

    while(out.length < numWords && key !== null){
      let [word1, word2] = key.split(' ');
      out.push(word1);
      key = word2 + ' ' + this.choice(this.chains.get(key));
    }

    out = out.join(' ');
    out = stripHtml(out).result
    return out;
  }
}

module.exports = {
  MarkovMachine
};