/*
indexer
-------

create word -> file index
load file
	extract all words
add each word to the word -> file index

Todo:

- apply weighting to titles.
- phrase matching.

searcher
--------

- rank results based on relevance

*/
var fs = require('fs');
var async = require('async');
//var normalizeForSearch = require('normalize-for-search');
//var S = require('string');
var SearchIndex = require('./search-index');
var uuid = require('node-uuid');



function Indexer(){

}

Indexer.prototype.ingestText = function( docId, s, analyzer, searchIndex, callback ){

	analyzer.analyze( s, function( err, words ){
	
		for( var i = 0; i < words.length; i++ ){
			searchIndex.addWord( words[i], docId, i );
		}

		callback(null);

	} );


}


/**
 * ingest a json document
 */
Indexer.prototype.ingestDocument = function( doc, analyzer, searchIndex, callback ){

  var docId = uuid.v1();

  // index each of the elements of the document
  for (field in doc) {

  	console.log( 'indexing the ' + field + ' field for ' + docId );

/*  	// tokenize each element
  	analyzer.analyze( doc[key]aaaa, function( err, words ){
	
		for( var i = 0; i < words.length; i++ ){
			searchIndex.addWord( words[i], docId, i );
		}

		callback(null);

	} );

*/
  }
}









Indexer.prototype.extractFile = function( filename, analyzer, searchIndex, callback ){

	var that = this;

	fs.readFile( filename, 'utf8', function ( err, s ) {

	    if (err) {
	        throw err;
	    }

	    // ingest the words into the index, then call get the words from the text analyser
	    that.ingestText( filename, s, analyzer, searchIndex, callback );

	});
}

Indexer.prototype.createIndexFromFiles = function( filenames, analyzer, indexedCallback ){

	var searchIndex = new SearchIndex(analyzer);
	var that = this;
	
	async.each( filenames,
		function ( filename, callback ){
			that.extractFile( filename, analyzer, searchIndex, callback );
		},
		// final callback, once all has been completed - pass the
		// searchIndex back to the process flow.
		function(err){
			indexedCallback(err, searchIndex)
		}
	);
}



Indexer.prototype.createIndexFromJsonFile = function( filename, analyzer, indexedCallback ){
 
  var searchIndex = new SearchIndex(analyzer);
  var that = this;
	
  fs.readFile( filename, 'utf8', function ( err, s ) {

    if (err) {
	  throw err;
	}

    docs = JSON.parse(s);

    async.each( docs,
      function ( doc, callback ){
      	that.ingestDocument( doc, analyzer, searchIndex, callback );
      },
      // all processed
      function(err){
        indexedCallback(err, searchIndex)
      }
    );
  });
}



module.exports = Indexer;