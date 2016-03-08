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
var LexicalAnalyzer = require('lexical-analyzer');
var analyzer = new LexicalAnalyzer();

var filenames = [
	'./example/sample-files/katushas-eduard-vorganov-provisionally-suspended-by-uci-for-doping-violation.txt',
	'./example/sample-files/kittel-fights-gravity-to-set-up-overall-victory-at-the-dubai-tour.txt',
	'./example/sample-files/paris-nice-2016-stage-2-results.txt'
];

var indexer = new Indexer();

/**

desirable JSON structure for the search index:


	words -> document matrix
	[
		'word': [{'doc': 1, 'p': 43},{},{}]
	]




*/

//var query = 'Tour de France';
var query = 'riders';

/*indexer.createIndex( path, function( err, index ){

	// run a search
	index.query( query )

});*/

indexer.createIndexFromFiles( filenames, analyzer, function( err, index ){
	
	var fs = require('fs');
	fs.writeFile("searchindex.json", JSON.stringify(index), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	}); 

	//console.log( index );
	index.query( query, function( err, queryResult ){

		console.log( "Results", queryResult ); 

	} );

});
