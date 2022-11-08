export default {
    props: ['book'],
    template:`  <section class="book-preview">
                    <h4>Title: {{ book.title }}</h4>
                    <img :src="book.thumbnail">
                    <div>
                        <span>Price: {{ book.listPrice.amount }}</span>
                        <span>{{ currencyIcon }}</span>
                    </div>
                    <router-link :to="'/book/' + book.id"  class="details-btn">Details</router-link>
                </section>
                `,
    
    data(){
        return {
            // book: this.book
        }
    },

    computed: {
        currencyIcon(){
            switch(this.book.listPrice.currencyCode){
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
            // return this.book.listPrice.currencyCode
        }
    }

}