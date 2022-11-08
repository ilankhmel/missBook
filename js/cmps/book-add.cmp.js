import { bookService } from "../services/books.service.js"

export default {
    template: `
                <section class="book-add">
                    Add From Google:
                    <input v-model="bookName" @input="sortList" type="text">
                    <ul v-if="bookName">
                        <li v-for="book in bookList" :key="book.id">
                            {{ book.volumeInfo.title }}
                            <button @click="addBook(book)">+</button>
                        </li>
                    </ul>
                </section>`,

    data() {
        return {
            bookList: '',
            bookName: null,
        }
    },
    methods: {

        sortList() {
            const googleBooks = bookService.queryGoogle()
                .then(books => {
                    console.log(books)
                    return books
                })
                .then(books => {
                    const regex = new RegExp(this.bookName, 'i')
                    return books = books.items.filter(item => regex.test(item.volumeInfo.title) && item.volumeInfo.imageLinks)
                    

                })
                .then(books => {
                    console.log(books)
                    this.bookList = books
                    console.log(this.bookList)
                })
        },
        
        formatBook(googleBook) {

            // if(!googleBook.volumeInfo.imageLinks){
            //     console.log('nothing');
            //     googleBook.volumeInfo.imageLinks = { thumbnail: "http://books.google.com/books/content?id=yg0fBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",description : "JavaScriptを使うときに知っておきたい68の冴えたやり方 もはやWebアプリケーション作成のデファクトスタンダードとなった感のある開発言語・JavaScriptが、定番の“Effective”シリーズに、満を持して登場微妙な挙動に悩むプログラマや、よりシンプルで可読性に富んだコードを志向する開発者に、実践的で即効性のある処方を施してくれる1冊です。68の「なるほど」は、伊達じゃない。"}
            // } 

            const formatedBook = {
                "id": googleBook.id,
                "title": googleBook.volumeInfo.title,
                "subtitle": googleBook.volumeInfo.subtitle,
                "authors": googleBook.volumeInfo.authors,
                "publishedDate": googleBook.volumeInfo.publishedDate,
                "description": googleBook.volumeInfo.description,
                "pageCount": googleBook.volumeInfo.pageCount,
                "categories": [
                    "Computers",
                    "Hack"
                ],
                "thumbnail": googleBook.volumeInfo.imageLinks.thumbnail,
                "language": googleBook.volumeInfo.language,
                "listPrice": {
                    "amount": 'Unknown',
                    "currencyCode": "EUR",
                    "isOnSale": false
                }
            }
            console.log(formatedBook);
            return formatedBook
        },

        addBook(googleBook) {
            googleBook = this.formatBook(googleBook)
            bookService.addGoogleBook(googleBook)
            this.$emit('added', googleBook)
        },

    }
}