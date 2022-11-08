import bookPreview from './book-preview.cmp.js'

export default {
    props:['books'],
    template:`<section  class="book-list">
                <ul>
                    <li v-for="book in books" :key="book.id">
                        <book-preview :book="book" @click="bookClicked(book)">

                            <router-link :to="'/book/' + book.id"  class="details-btn">Details</router-link>
                        </book-preview>
                    </li>
                </ul>
            </section>`,
    
    data(){
        return {
            // books: this.books
        }
    },

    methods: {
        bookClicked(book){
            this.$emit('selected', book)
        },
    },

    components: {
        bookPreview,
    }

}