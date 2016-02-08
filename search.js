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

var SearchIndex = require('./search-index');
var Indexer = require('./indexer');
var TextAnalyser = require('./text-analyser');

var filenames = [
	'./example/sample-files/katushas-eduard-vorganov-provisionally-suspended-by-uci-for-doping-violation.txt',
	'./example/sample-files/kittel-fights-gravity-to-set-up-overall-victory-at-the-dubai-tour.txt',
];

var indexer = new Indexer();
var textAnalyser = new TextAnalyser();

/**

desirable JSON structure for the search index:


	words -> document matrix
	[
		'word': [{'doc': 1, 'p': 43},{},{}]
	]




*/

var query = 'doping';

/*indexer.createIndex( path, function( err, index ){

	// run a search
	index.query( query )

});*/

indexer.createIndexFromFiles( filenames, textAnalyser, function( err, index ){
	
	var fs = require('fs');
	fs.writeFile("searchindex.json", JSON.stringify(index), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	}); 


	//console.log( index );

	var queryResult = index.query( query );

	console.log( "Results", queryResult ); 

});
