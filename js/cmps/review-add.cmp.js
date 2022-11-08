export default {
    template: ` <section class="add-review">
                    <h2>Leave a review!</h2>
                    <form>
                        <label>
                            Full Name:
                            <input v-model="review.fullName" type=text>
                        </label>

                        <label for="rates">Rate book:
                        <select v-model="review.rating" name="rating" id="rates">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        </label>
                        
                        <label>
                            Read At:
                            <input v-model="review.readDate" type=date>
                        </label>

                        <label>
                            Free Text:
                            <input v-model="review.userTxt" type=textarea>
                        </label>

                        <button @click="formSubmit" type="button">Submit</button>

                    </form>

                    <!-- <pre>{{ review }}</pre> -->
                </section>`,

    data(){
        return{
            review: {
                fullName: '',
                rating: '',
                readDate: '',
                userTxt: '',
            }
        }
    },

    methods: {
        formSubmit(){
            this.$emit('submit', this.review)
        }
    }
}