/*
indexer
-------

create word -> file index
load file
	extract all words
add each word to the word -> file index

Todo:

- apply weighting to titles.

searcher
--------

- rank results based on relevance

*/

var Indexer = require('./indexer');
	
var filename = './example/sample-files/katushas-eduard-vorganov-provisionally-suspended-by-uci-for-doping-violation.txt';

var indexer = new Indexer();

indexer.extractFile( filename, function(err,words){
	console.log("Processed " + filename, words);
});

exports.printMsg = function() {
  console.log("This is a message from the demo package");
}




