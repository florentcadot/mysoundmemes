import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('src/app/adapter/primary/views/layout/home.layout.vue'),
    children: [
      { path: '', component: () => import('src/app/adapter/primary/views/pages/home.page.vue') },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: () => import('src/app/adapter/primary/views/layout/home.layout.vue'),
    children: [
      { path: '', component: () => import('src/app/adapter/primary/views/pages/login.page.vue') },
    ],
  },
  {
    path: '/signup',
    component: () => import('src/app/adapter/primary/views/layout/home.layout.vue'),
    children: [
      { path: '', component: () => import('src/app/adapter/primary/views/pages/signup.page.vue') },
    ],
  },
  {
    path: '/activate-account',
    component: () => import('src/app/adapter/primary/views/layout/home.layout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/app/adapter/primary/views/pages/activate-account.page.vue'),
        props: route => ({ token: route.query.token }),
      },
    ],
  },
  {
    path: '/forget-password',
    component: () => import('src/app/adapter/primary/views/layout/home.layout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/app/adapter/primary/views/pages/forget-password.page.vue'),
        props: route => ({ email: route.query.email }),
      },
    ],
  },
  {
    path: '/reset-password',
    component: () => import('src/app/adapter/primary/views/layout/home.layout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/app/adapter/primary/views/pages/reset-password.page.vue'),
        props: route => ({ email: route.query.token }),
      },
    ],
  },
  {
    path: '/board',
    component: () => import('src/app/adapter/primary/views/layout/app.layout.vue'),
    children: [
      { path: '', component: () => import('src/app/adapter/primary/views/pages/board.page.vue') },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/board/:id',
    component: () => import('src/app/adapter/primary/views/layout/app.layout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/app/adapter/primary/views/pages/board-detail.page.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/setting',
    component: () => import('src/app/adapter/primary/views/layout/app.layout.vue'),
    children: [
      { path: '', component: () => import('src/app/adapter/primary/views/pages/setting.page.vue') },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/setting/user-account',
    component: () => import('src/app/adapter/primary/views/layout/app.layout.vue'),
    children: [
      {
        path: '',
        component: () => import(
          'src/app/adapter/primary/views/pages/setting-user-account.page.vue'
        ),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('src/app/adapter/primary/views/pages/error-404.page.vue'),
  },
]

export default routes
