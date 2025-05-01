import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "Nauva",
      },
      component: () => import("@/views/home.vue"),
    },
    {
      path: "/app",
      name: "projects",
      component: () => import("@/app/app-pages/pages/App.vue"),
      meta: {
        title: "projects",
      },
    },
    {
      path: "/app/pomodoro",
      name: "pomodoro",
      meta: {
        title: "pomodoro",
      },
      component: () => import("@/app/pomodoro/pages/App.vue"),
    },
    {
      path: "/app/pomodoro/setting",
      name: "pomodoro-setting",
      meta: {
        title: "setting",
      },
      component: () => import("@/app/pomodoro/pages/setting.vue"),
    },
    {
      path: "/app/flashcard",
      name: "flashcard",
      meta: {
        title: "flashcard",
      },
      component: () => import("@/app/flashcard/pages/App.vue"),
    },
    {
      path: "/app/tetris",
      name: "tetris",
      meta: {
        title: "tetris",
      },
      component: () => import("@/app/tetris/pages/App.vue"),
    },
    {
      path: "/app/todo",
      name: "todo list",
      meta: {
        title: "todo list",
      },
      component: () => import("@/app/todo/pages/App.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      meta: {
        title: "404",
      },
      component: () => import("@/components/404-not-found/App.vue"),
    },
  ],
});

router.afterEach((ctx) => {
  const defaultTitle = "nauva";
  const defaultDesc = "Deskripsi default nauva";
  const defaultKeywords = "default";

  const title =
    typeof ctx.meta.title === "string" ? ctx.meta.title : defaultTitle;
  const description =
    typeof ctx.meta.desc === "string" ? ctx.meta.desc : defaultDesc;
  const keywords =
    typeof ctx.meta.keywords === "string" ? ctx.meta.keywords : defaultKeywords;

  document.title = title;

  const setMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? "property" : "name";
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (tag) {
      tag.setAttribute("content", content);
    } else {
      tag = document.createElement("meta");
      tag.setAttribute(attr, name);
      tag.setAttribute("content", content);
      document.head.appendChild(tag);
    }
  };

  setMeta("description", description);
  setMeta("keywords", keywords);
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
});

export default router;
