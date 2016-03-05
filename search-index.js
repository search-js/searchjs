var fs = require('fs');
var normalizeForSearch = require('normalize-for-search');
var S = require('string');
var _ = require('underscore');

function SearchIndex( analyzer ){
  this.analyzer = analyzer;
  this.index = {};
}

/**
 * The most basic of search matching
 */
SearchIndex.prototype.query = function( q, callback ){

  var index = this.index;
  this.analyzer.analyze( q, function( err, words ){

  	var results = [];

    for( var i = 0; i < words.length; i++ ){

      // create element, if it doesn't exist
	  if( index.hasOwnProperty( words[i] ) ){
	    results = _.union( results, index[ words[i] ] );
      }
    }

    callback( null, results );

  });

}

SearchIndex.prototype.addWord = function( word, documentId, position ){

  // create element, if it doesn't exist
  if( !this.index.hasOwnProperty( word ) ){
    this.index[ word ] = [];
  }
  
  // add word/document/position occurance to the index
  this.index[ word ].push( {'doc': documentId, 'p': position} );

}

module.exports = SearchIndex;