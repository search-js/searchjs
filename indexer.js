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
var normalizeForSearch = require('normalize-for-search');
var S = require('string');

function Indexer(){

}

Indexer.prototype.extractFile = function( filename, callback ){

	var that = this;

	fs.readFile( filename, 'utf8', function ( err, s ) {

	    if (err) {
	        throw err;
	    }

	    callback( null, that.extractWordSequence( s ) );

	});
}

Indexer.prototype.extractWordSequence = function( s ){

	s = normalizeForSearch( s );
    s = S(s).stripPunctuation().s;
    return s.split(' ');

}


module.exports = Indexer;