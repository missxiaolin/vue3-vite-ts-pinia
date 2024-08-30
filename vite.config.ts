import { UserConfig, UserConfigExport, ConfigEnv, defineConfig } from "vite";
import { resolve } from "path";
import { createVitePlugins } from "./config/vite/plugin";
import { VITE_DROP_CONSOLE, VITE_PORT } from "./config/constant";
import { configManualChunk } from "./config/vite/optimizer";
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
	const isBuild = command === "build";
	console.log(command, mode);

	return {
		resolve: {
			// 设置别名
			alias: [
				{ find: "~", replacement: resolve(__dirname, "./") },
				{ find: "@", replacement: resolve(__dirname, "./src") },
				{ find: "views", replacement: resolve(__dirname, "src/views") },
			],
			extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"],
		},

		// plugins
		plugins: createVitePlugins(isBuild, mode),

		css: {
			preprocessorOptions: {
				scss: {
					// modifyVars: generateModifyVars(),
					javascriptEnabled: true,
				},
			},
		},

		// server
		server: {
			// hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
			// 服务配置
			port: VITE_PORT, // 类型： number 指定服务器端口;
			open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
			cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
			host: "0.0.0.0", // IP配置，支持从IP启动
			https: true,
			// proxy,
		},

		// build
		build: {
			target: "es2015",
			rollupOptions: {
				plugins: [
					commonjs(),
					externalGlobals({
						// vue: 'Vue',
						// moment: "moment",
						// "micro-app": "micro-app",
					}),
				],
				output: {
					chunkFileNames: "static/js/[name]-[hash].js",
					entryFileNames: "static/js/[name]-[hash].js",
					assetFileNames: "static/[ext]/[name]-[hash].[ext]",
					manualChunks: configManualChunk,
				},
			},
			// Turning off brotliSize display can slightly reduce packaging time
			// brotliSize: false,
			chunkSizeWarningLimit: 2000,
			minify: "terser",
			terserOptions: {
				compress: {
					//生产环境时移除console
					drop_console: true,
					drop_debugger: true,
				},
			},
		},

		optimizeDeps: {
			//检测需要预构建的依赖项
			entries: [],
			//预构建中强制排除的依赖项
			exclude: [],
			//默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
			include: [],
		},
		//SSR 选项
		// ssr: {
		//   //列出的是要为 SSR 强制外部化的依赖
		//   external: [],
		//   //列出的是防止被 SSR 外部化依赖项。
		//   noExternal: []
		// }
	};
};
