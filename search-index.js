var fs = require('fs');
var normalizeForSearch = require('normalize-for-search');
var S = require('string');

function SearchIndex(){
	this.index = {};
}

SearchIndex.prototype.query = function( q ){

	// create element, if it doesn't exist
	if( this.index.hasOwnProperty( q ) ){
		return this.index[ q ];
	} else {
		return null;
	}

}

SearchIndex.prototype.addWord = function( word, documentId, position ){

	console.log( "Adding " + word );

	// create element, if it doesn't exist
	if( !this.index.hasOwnProperty( word ) ){
		this.index[ word ] = [];
	}

	// add word/document/position occurance to the index
	this.index[ word ].push( {'doc': documentId, 'p': position} );

}

module.exports = SearchIndex;