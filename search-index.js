var fs = require('fs');
var normalizeForSearch = require('normalize-for-search');
var S = require('string');
var _ = require('underscore');
var SearchResult = require('./search-result');

function SearchIndex( analyzer ){
  this.analyzer = analyzer;
  this.index = {};
}

/**
 * The most basic of search matching
 */
SearchIndex.prototype.query = function( q, callback ){

  var that = this;
  this.analyzer.analyze( q, function( err, words ){

  	that.findRawMatches( words, function( err, matches ){

  		var values = [];
  		for( var i in matches ){
  			values.push(matches[i]);
  		} 
		values.sort(function(a,b){ return b.relevance(q) - a.relevance(q);});
	
		// calculate the relevence of each document, relative to the search
		callback( null, values );

  	});

  });

}

SearchIndex.prototype.findRawMatches = function( words, callback ){

  var matches = [];

  // find all the initial matches
  for( var i = 0; i < words.length; i++ ){

  	//console.log("-------------------------------------------" );
    //console.log("search for word " + words[i] );

    // create element, if it doesn't exist
    if( this.index.hasOwnProperty( words[i] ) ){

      var word_i = words[i];

      // create the occurance entry
      for( var j = 0; j < this.index[ word_i ].length; j++ ){

        // document match
        var docId = this.index[ word_i ][ j ]['docId'];

        //console.log("Found " + word_i + " in ", docId );

        // in the matrix
        if( !matches.hasOwnProperty( docId ) ){
          matches[ docId ] = new SearchResult(docId);
 //         matches[ docId ]['matchingWords'] = {};
   //       matches[ docId ]['rawCountTotal'] = 0;
        }

        // add the doc/word count field, if it doesn't exist
        if( !matches[docId]['matchingWords'].hasOwnProperty( word_i ) ){
          matches[ docId ]['matchingWords'][ word_i ] = 0;
        };

        //console.log( matches );

        // increase the count for the ith word, in the doc
        matches[ docId ]['matchingWords'][ word_i ]++;
        matches[ docId ]['rawCountTotal']++;

      }

    }
  
  }

  callback( null, matches );

}


SearchIndex.prototype.addWord = function( word, documentId, position ){

  // create element, if it doesn't exist
  if( !this.index.hasOwnProperty( word ) ){
    this.index[ word ] = [];
  }
  
  // add word/document/position occurance to the index
  this.index[ word ].push( {'docId': documentId, 'p': position} );

}

module.exports = SearchIndex;