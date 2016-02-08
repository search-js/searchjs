/*

*/
var fs = require('fs');
var normalizeForSearch = require('normalize-for-search');
var S = require('string');




String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};




function TextAnalyser(){

}

TextAnalyser.prototype.normalize = function( s ){

	// separate hyphenated words
	s = s.replaceAll( "-", " " ); // this does affectively make it impossible to search for '-

	s = normalizeForSearch( s );
    s = S(s).stripPunctuation().s;

    return s.split(' ');

}


module.exports = TextAnalyser;