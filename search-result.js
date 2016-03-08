// Constructor
function SearchResult(docId) {

  this.docId = docId;
  this.matchingWords = {};
  this.rawCountTotal = 0;

}

// bit basic :)
SearchResult.prototype.relevance = function( query ) {

	console.log("CALLED relevance()");
	return this.rawCountTotal;
};

// export the class
module.exports = SearchResult;