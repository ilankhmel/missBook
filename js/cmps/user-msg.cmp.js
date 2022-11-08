import {eventBus} from '../services/event-bus.service.js'
export default {
    template: `
    <section :class="msg.type" v-if="msg.txt" class="user-msg">
       <h1>{{ msg.txt }}</h1>
       <router-link :to="'/book/' + msg.bookId">Check It Out</router-link>
       <button @click="closeMsg">x</button>
    </section>
    `,

    data(){
        return{
            msg: {
                txt:'',
                type: 'success',
                bookId: ''
            }
        }
    },

    created(){
        eventBus.on('user-msg', this.showMsg)
    },

    methods:{
        showMsg(payload){
            this.msg = payload
            setTimeout(() => this.msg.txt = '', this.msg.timeout || 3000)
        },
        closeMsg(){
            this.msg.txt = ''
        }
    }
}