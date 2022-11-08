export default {
    template: `<section class="book-filter">
                    <input v-model="filterBy.name" type="text" placeholder="search name" >
                    <input v-model="filterBy.fromPrice" type="text" placeholder="search from price" >
                    <input v-model="filterBy.toPrice" type="text" placeholder="search to price" >
                    <button @click="filter">Search</button>
                </section>` ,

    data(){
        return {
            filterBy:{
                name: '',
                fromPrice: 0,
                toPrice: Infinity,
            }
        }
    },

    methods: {
        filter(){
            this.$emit('filtered', this.filterBy)
        }
    }
}