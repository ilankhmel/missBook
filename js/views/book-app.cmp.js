import {bookService} from '../services/books.service.js'
import bookList from '../cmps/book-list.cmps.js'
import bookDetails from './book-details.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookAdd from '../cmps/book-add.cmp.js'

export default {
    template: ` <section v-if="books" class="car-app">
                    <book-filter @filtered="setFilter"></book-filter>
                    <book-add @added="addBook"/>
                    <book-list v-if="books" :books="booksToShow" @selected="selectBook"></book-list>
                    <!-- <book-details v-if="selectedBook" :book="selectedBook"></book-details>  -->
                </section>`
    ,

    data(){
     return {
         books: null,
         filterBy: null,
         selectedBook: null,
        }
    },

    created(){
        bookService.query()
        .then(books => {
            this.books = books
            })
    },
    methods: {
        selectBook(book){
            console.log(book);
            this.selectedBook = book
        },

        setFilter(filterObj){
            this.filterBy = filterObj
        },

        addBook(book){
            console.log(book);
            console.log('addingbook');
            this.books.unshift(book)
        }
    },
    computed: {
        booksToShow(){
            
            console.log(this.books);
            
            if(!this.filterBy) return this.books
            console.log('here');
            return this.books.filter((book)=>{
             if(book.title.includes(this.filterBy.name) &&
                book.listPrice.amount >= this.filterBy.fromPrice &&
                book.listPrice.amount <= this.filterBy.toPrice){
                    return book
                }
            }
            )
        }
    },
    components: {
        bookList,
        bookDetails,
        bookFilter,
        bookAdd,
    }
  
}