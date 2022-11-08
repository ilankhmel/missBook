import { bookService } from '../services/books.service.js'
import { eventBus } from '../services/event-bus.service.js'
import longText from '../cmps/long-book-desc.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'

export default {
    // props:['book'],
    template: `  <section v-if="book" class="book-details" id="bottom" >
                    <!-- <pre>{{ book }}</pre> -->
                    <h1>Title: {{ book.title }}</h1>
                    <p>Authors: {{ book.authors.toString() }}</p>
                    <p>Subtitle: {{ book.subtitle }}</p>
                    <div>
                        <p v-if="!isLongDesc" >Description: {{ book.description.slice(0, 100)}}</p>
                        <long-text v-else v-bind:txt="book.description"></long-text>
                    </div>
                    <button @click="toggleDesc">{{ btnText }}</button>
                    <p>Published Date: {{ book.publishedDate }}</p>
                    <p>Book Type: {{ typeBook }}</p>
                    <p>Page Count: {{ book.pageCount }}</p>
                    <p>Reading type: {{ typeReading }}</p>
                    <p>Categories: {{ book.categories.toString()}}</p>
                    <p>Language: {{ book.language}}</p>
                    <span :style="priceStyle">Price: {{ book.listPrice.amount}}</span>
                    <span>{{ currencyIcon }}</span>
                    <div class="on-sale" v-if="book.listPrice.isOnSale">
                        <img src="https://www.psdstamps.com/wp-content/uploads/2020/01/for-sale-stamp-png.png">
                    </div>
                    
                    <div>
                        <router-link class="back-to-list-btn" to="/book">Back</router-link>
                    </div>

                    <router-link v-if="prevNext" class="page-book-btn" :to="'/book/' + prevNext.prevId">Previous Book</router-link>
                    <router-link v-if="prevNext" class="page-book-btn" :to="'/book/' + prevNext.nextId">Next Book</router-link>

                    <div v-for="(review, index) in book.reviews" :key="book.id" class="review">
                        <h3>Review from: {{review.fullName}}</h3>
                        <div>Rating: {{review.rating}}</div>
                        <div>Read At: {{review.readDate}}</div>
                        <div>Thoughts: {{review.userTxt}}</div>
                        <button @click="deleteReview(book.id, index)">x</button>
                    </div>

                    <review-add @submit="saveReview" />
                </section>
                `,
    data() {
        return {
            book: null,
            isLongDesc: false,
            prevNext: null,
        }
    },

    created() {
       this.loadBook()
    },

    computed: {
        typeReading() {
            if (this.book.pageCount > 500) {
                return 'Long Reading'
            } else if (this.book.pageCount > 200) {
                return 'Decent Reading'
            } else if (this.book.pageCount < 100) {
                return 'Light Reading'
            }
        },

        currencyIcon() {
            switch (this.book.listPrice.currencyCode) {
                case 'EUR':
                    return '€'
                    break;

                case 'USD':
                    return '$'
                    break;

                case 'ILS':
                    return ' ₪'
                    break;
            }
        },

        typeBook() {
            if (2022 - this.book.publishedDate > 10) {
                return 'Veteran Book'
            } else if (this.book.publishedDate < 1) {
                return 'New!'
            } else {
                return 'Regular'
            }
        },

        priceStyle() {
            if (this.book.listPrice.amount > 150) {
                return { color: 'red' }
            } else if (this.book.listPrice.amount < 20) {
                return { color: 'green' }
            }
        },

        btnText() {
            return (this.isLongDesc) ? 'Show less...' : 'Read more...'
        },

        bookId() {
            return this.$route.params.id
        }
    },

    methods: {
        loadBook(){
            const id = this.$route.params.id
            bookService.get(id)
                .then(book => {
                    this.book = book
                    return book
                })
                
            bookService.get(id)
                .then(book => {
                    return (bookService.getPrevNextBookIds(book.id)).then(res => {
                            this.prevNext = res
                            console.log(this.prevNext);
                    })
                })
               
        },

        toggleDesc() {
            this.isLongDesc = !this.isLongDesc
        },

        saveReview(review) {
            bookService.addReview(this.book.id, review)
            if (!this.book.reviews) this.book.reviews = []
            this.book.reviews.unshift(review)
            const msg = {
                txt: 'Review was sent successfully!',
                type: 'success',
                bookId: this.book.id,
            }
            eventBus.emit('user-msg', msg)
            this.$router.push('/book')
        },

        deleteReview(bookId, reviewIdx) {
            bookService.removeReview(bookId, reviewIdx)
            this.book.reviews.splice(reviewIdx, 1)
            const msg = {
                txt: 'Review was deleted successfully!',
                type: 'fail',
                bookId: this.book.id,
            }
            eventBus.emit('user-msg', msg)
            this.$router.push('/book')
        },
        
    },

    watch: {
        bookId() {
            console.log('book Id changed')
            this.loadBook()
        }
    },

    components: {
        longText,
        reviewAdd
    }

}