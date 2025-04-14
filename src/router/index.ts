import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue'),
    },
    {
			path: '/app',
			children: [
				{
					path: 'pomodoro',
					name: 'pomodoro',
					component: () => import('@/app/pomodoro/pages/App.vue'),
				}
			]
    },{
			path: '/app/pomodoro/setting',
			name: 'pomodoro-setting',
			component: () => import('@/app/pomodoro/pages/setting.vue')
		}
//     {
//       path: '/about',
//       name: 'about',
//       meta: {title: 'about'},
//       component: () => import('../views/AboutView.vue'),
//     },
// 		{
// 		  path: '/:pathMatch(.*)*',
// 		  name: 'NotFound',
// 		  component: () => import('@/views/NotFound.vue')
// 		}
  ],
})

router.afterEach((ctx) => {
	const defaultTitle: string = 'nauva';
  document.title = typeof ctx.meta.title === 'string' ? ctx.meta.title : defaultTitle
})

export default router
