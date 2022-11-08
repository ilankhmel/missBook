const {createApp} = Vue
const {createRouter, createWebHashHistory} = VueRouter
import appHeader from './cmps/app-header.cmp.js'

import bookApp from './views/book-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookDetails from './views/book-details.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import aboutTeam from './cmps/about-team.cmp.js'
import aboutGoals from './cmps/about-goals.cmp.js'


const options = {
    template: `
                <!-- <book-app/> -->
                <app-header />
                <user-msg />
                <router-view />`
    ,
    components: {
        bookApp,
        appHeader,
        userMsg,
    }
    ,
}

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage,
        },
        {
            path: '/about',
            component: aboutPage,
            children: [
                {
                    path: 'team',
                    component: aboutTeam,
                },                
                {
                    path: 'goals',
                    component: aboutGoals,
                },                
            ]
        },
        {
            path: '/book',
            component: bookApp,
        },
        {
            path: '/book/:id',
            component: bookDetails,
            
        }
    ],
}

const app = createApp(options)
const router = createRouter(routerOptions)

app.use(router)
app.mount('#app')
