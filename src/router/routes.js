
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    props: true,
    children: [
      { path: '', component: () => import('pages/Index.vue'), props: true }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
