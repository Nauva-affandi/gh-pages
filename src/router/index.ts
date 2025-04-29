import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title : 'Nauva',
      },
      component: () => import('@/views/home.vue')
    },{
			path: '/app',
			name: 'projects',
			component: () => import('@/app/app-pages/pages/App.vue'),
			meta: {
			  title : 'projects',
			},
    },{
	path: '/app/pomodoro',
	name: 'pomodoro',
	meta: { 
	  title: 'pomodoro',
	},
	component: () => import('@/app/pomodoro/pages/App.vue'),
    },{
			path: '/app/pomodoro/setting',
			name: 'pomodoro-setting',
			meta: {
			  title : 'setting',
			},
			component: () => import('@/app/pomodoro/pages/setting.vue')
    },{
			path: '/app/flashcard',
			name: 'flashcard',
			meta: {
			  title : 'flashcard',
			},
			component: () => import('@/app/flashcard/pages/App.vue')
		},{
		  path: '/app/tetris',
		  name: 'tetris',
		  meta: {
		    title: 'tetris',
		  },
		  component: () => import('@/app/tetris/pages/App.vue'),
		},{
		  path: '/app/todo',
		  name: 'todo list',
		  meta: {
		    title: 'todo list',
		  },
		  component: () => import('@/app/todo/pages/App.vue')
		},{
		  path: '/:pathMatch(.*)*',
		  name: 'NotFound',
		  meta: {
		    title : '404',
		  },
		  component: () => import('@/components/404-not-found/App.vue')
		}
  ],
})

router.afterEach((ctx) => {
	const defaultTitle: string = 'nauva';
  document.title = typeof ctx.meta.title === 'string' ? ctx.meta.title : defaultTitle
})

export default router
