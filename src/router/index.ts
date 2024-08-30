import { createRouter, createWebHistory, Router } from "vue-router";
import { RouterTy } from "@/types/router";

/**
 * @description: 菜单
 */
const constantRoutes: RouterTy = [
		{
			path: "/",
			name: "首页",
		},
	],
	router: any = createRouter({
		history: createWebHistory(),
		// scrollBehavior: () => ({ top: 0 }),
		routes: constantRoutes,
	});

export default router;
