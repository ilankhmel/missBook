// export const bookService = {
    //     query,
    // }
    import { utilService } from './util-service.js'
    
    
    export const bookService = {
        query,
        get,
        remove,
        save,
        addReview,
        removeReview,
        queryGoogle,
        addGoogleBook,
        getPrevNextBookIds,
        
    }
    
    import booksData from '../../books.json' assert {type: 'json'}
    import googleData from '../../google-books.json' assert {type: 'json'}
    import { storageService } from './async-storage.service.js'
    
    
    const BOOKS_KEY = 'books'
    _createBooks()
    _createGoogleBooks()
    
   
        function queryGoogle() {
            return storageService.query('googleBooks') 
        }
        
        function _createGoogleBooks() {
            let googlebooks = utilService.loadFromStorage('googleBooks')
            if (!googlebooks || !googlebooks.length) {
                googlebooks = googleData
                utilService.saveToStorage('googleBooks', googlebooks)
            }
            return googlebooks
        }
        
        function addGoogleBook(googleBook){
              storageService.post(BOOKS_KEY, googleBook)
        }

        


function query() {
 return storageService.query(BOOKS_KEY) 
}


function get(bookId){
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if(book.id){
        return storageService.put(BOOKS_KEY, book)
    } else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function addReview(bookId, review){ 
    console.log('run');
    console.log('bookId',bookId);
      get(bookId).then(book => {
        console.log('book',book);
        if(!Array.isArray(book.reviews)) book.reviews = []
        book.reviews.unshift(review)
        console.log('reviews', book.reviews);
        console.log('book',book);
        save(book)
    })
}

function removeReview(bookId, reviewIdx){
    var book = get(bookId)
        .then(book =>{ 
            book.reviews.splice(reviewIdx,1)
            return book
        })
        .then(book => save(book))
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = booksData
        utilService.saveToStorage(BOOKS_KEY, books)
    }
    return books
}

function getPrevNextBookIds(bookId) {
    return query()
        .then(books =>{
            var idx  = books.findIndex(book => book.id === bookId)
            var nextIdx
            var prevIdx
            if (idx === books.length-1){
               nextIdx = 0 
            }else{
                nextIdx = idx + 1
            }
            if (idx === 0){
                prevIdx = books.length-1
            } else{
                prevIdx = idx - 1
            }
            console.log(nextIdx, prevIdx);
            return {prevId: books[prevIdx].id, nextId: books[nextIdx].id}
        })
}