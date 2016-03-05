# searchjs
A complete JavaScript-based search solution.

# Implemented features:

- Index a collection of text files
- Multiword queries
- Stemming
- Stop word removal

# Roadmap

## Example site

- take a set of files and make them searchable with a simple web interface (easy).
- provide a feedback form for suggestions (easy).

## Search Index

- easy integration with other data sources to be able to easily push content into the search index (depends...). 
- apply weighting to titles (medium).
- richer lexical parsing
- synonym database (important to factor this into the ranking criteria)
- richer document representation (i.e. ability to differientiate title values from body content, and ability to fine tune the relevance).
- integration of non-text metrics (i.e. factor the ranking on the publication date, page views, other fields).

## API entry points

- ability to push content to the index via the API (easy).
- search results via the API (easy).

## Searcher

- phrase matching (i.e. "Match this complete phrase ONLY" queries) (easy)
- Boolean queries (medium)
- "Did you mean..." spell suggestor.
- rank results based on relevance (easy/medium)
- Redis backend (*SHOULD* be easy)

## Presentation Layer

- Highlight matches in the results summary (fiddly).