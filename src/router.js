import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue')
    }
  ]

const router = new Router({ routes });

// router.beforeEach(function(to, from, next) {
//     const store = JSON.parse(localStorage.getItem('user'))

//     if (store) {
//         console.log('/')
//         next()
//     }

//     // const usuario = (router.app.$store.state.usuario.usuario)
//     // console.log(usuario)

//     // // if (
//     // //     (
//     // //         to.name == 'Eventos' ||
//     // //         to.name == 'Inscricao' ||
//     // //         to.name == 'Eventos'
//     // //     )
//     // //     && Object.keys(usuario).length == 0
//     // // ) {
//     // //     next('/login')
//     // // } else {
//          // next()
//     // // }

// });

export default router;
