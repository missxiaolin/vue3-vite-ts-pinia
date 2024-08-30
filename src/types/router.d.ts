/*page common ts*/
import { RouteRecordRaw } from "vue-router";
import { ObjTy } from "./common";
interface mate {
	layout: boolean;
}
/*此处扩展的类型*/
interface RouteItemTy {
	hidden?: boolean;
	alwaysShow?: boolean;
	code?: number;
	name?: string;
	fullPath?: string;
	path?: string;
	meta?: mate;
	// component? :
	children?: RouterTy;
	redirect?: string;
}

type RouterRowTy = RouteRecordRaw & RouteItemTy;
type RouterTy = Array<RouterRowTy>;
