
export default {
    template: `
        <section class="about-page">
            <div>
                <h1>About Us</h1>
                <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, se"</p>
                <nav class="about-links">
                    <router-link to="/about/team">Our Team</router-link>
                    <router-link to="/about/goals">Our Goals</router-link>
                </nav>
                <router-view />
            </div>
            <img src="https://thumbs.dreamstime.com/z/bookshop-building-facade-row-books-window-vector-illustration-hand-drawn-cartoon-caricature-174486033.jpg">
        <section>
    `,
}