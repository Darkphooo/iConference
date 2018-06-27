import Vue from 'vue'
import Router from 'vue-router'

import Conference from './views/Conference.vue'
import Register from './views/Register.vue'
import Verify from './views/Verify.vue'
import SignIn from './views/SignIn.vue'
import CheckVisitor from './views/CheckVisitor.vue'
import Login from './views/Login.vue'
import Mine from './views/Mine.vue'
import ConferenceDetail from './views/ConferenceDetail.vue'
import ConferenceRegister from './views/ConferenceRegister.vue'
import PaymentResult from './views/PaymentResult.vue'
import Ticket from './views/Ticket.vue'
import TicketDetail from './views/TicketDetail.vue'
import Data from './views/Data.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/conference'
  }, {
    path: '/conference',
    name: 'conference',
    component: Conference
  }, {
    path: '/register',
    name: 'register',
    component: Register
  }, {
    path: '/verify/:type/:confId',
    name: 'verify',
    component: Verify
  }, {
    path: '/signIn/:ticketId',
    name: 'signIn',
    component: SignIn
  }, {
    path: '/checkVisitor/:id/:name/:idNum/:mobile',
    name: 'checkVisitor',
    component: CheckVisitor
  }, {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      var now = new Date().getTime()
      var moveTo = sessionStorage.getItem('moveTo')
      if (localStorage.getItem('user')) {
        if (JSON.parse(localStorage.getItem('user')).expire > now) {
          next(moveTo)
        } else {
          localStorage.removeItem('user')
          next()
        }
      } else {
        next()
      }
    }
  }, {
    path: '/mine',
    name: 'mine',
    component: Mine,
    meta: {
      auth: true
    }
  }, {
    path: '/confDetail/:confId',
    name: 'confDetail',
    component: ConferenceDetail,
    meta: {
      auth: true
    }
  }, {
    path: '/confRegister/:confId',
    name: 'confRegister',
    component: ConferenceRegister,
    meta: {
      auth: true
    }
  }, {
    path: '/paymentResult/:ticketId',
    name: 'paymentResult',
    component: PaymentResult,
    meta: {
      auth: true
    }
  }, {
    path: '/ticket/:userId',
    name: 'ticket',
    component: Ticket,
    meta: {
      auth: true
    }
  }, {
    path: '/ticketDetail/:ticketId',
    name: 'ticketDetail',
    component: TicketDetail,
    meta: {
      auth: true
    }
  }, {
    path: '/data/:userId',
    name: 'data',
    component: Data,
    meta: {
      auth: true
    }
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem('user')) {
      next()
    } else {
      sessionStorage.setItem('moveTo', to.path)
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export {router as default}
