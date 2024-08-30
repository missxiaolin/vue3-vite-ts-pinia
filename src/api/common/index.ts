/*
 * @Author: zhusaiji zhusaiji@enmonster.com
 * @Date: 2023-04-17 10:45:14
 * @LastEditors: wanglijian wanglijian@enmonster.com
 * @LastEditTime: 2023-07-19 14:15:26
 * @FilePath: /rsm-ui/src/api/common/index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { get, post } from "@/utils/axios";
import { ReqPageAuth, GetButtonReq, GetButtonPageReq, BtnResource, QueryFilesReq, OPBFileResp } from "./model";
import { ObjTy } from "@/types/common";
import { initConfig } from "@/utils/utils";
import cookie from "@/utils/cookie";
import { loginTy } from "@/views/login/api/model";

enum URL {
	pageAuth = "/amc/resource/user-auth",
	btnAuth = "/amc/resource/get-button",
	btnPageAuth = "/amc/resource/get-button-page",
	microList = "/pgs/client-config/batch/match",
	loginOut = "/auth/v3/logout",
	employeeDetail = "/pfs/pc/nps/employee/login-detail", // 查询人员信息
	addCommon = "/pgs/common-function/add", // 加入常用功能
	cancelCommon = "/pgs/common-function/cancel", // 取消收藏常用功能
	listCommon = "/pgs/common-function/list", // 获取常用功能列表
	verifyToken = "/auth/v3/api/verify-token",
	hasRealAuth = "/pcs/nps/employee/real-name-auth/whether-required", // 是否实名认证
	queryBatchAll = "/opb/api/file/v3/all/query-batch", // 批量查图片地址，所有安全等级
	login = "/auth/v3/login", // 本地登录
	userView = "/pcs/amc/role/query-user-view", // 用户视角
	getExgAuthToken = "/auth/get/exchange/token", // 根据用户token和系统端，获取指定端的token
	getGradeIndex = "/pcs/abs/agent/honor-grade/index", // 获取用户星等级icon
	getGradePopup = "/pcs/abs/agent/honor-grade/pop-up", // 首页渠道商荣誉等级弹框
	checkGradeCoupon = "/pcs/aod/api/v2/order/agent/use-coupon-check", // 校验渠道商是否可使用券
}
const to_do_center: string = "to_do_center";
const collection_universal: string = "collection_universal";
/*
 * resCode 为空 就不需要在资源里面配置相应接口，代表不需要接口鉴权
 */
const pageAuth = async (data: ReqPageAuth) => {
	let { targetUrl = "" } = data;
	if (targetUrl.indexOf("queries") > -1) {
		// 用正则替换queries=xxxxxx
		targetUrl = targetUrl.replace(/(&|\?)queries=[^&]*(&|$)/i, function (matchStr, group1, group2) {
			if (group2 !== "&") return "";
			if (group1 === "?" && group2 === "&") return "?";
			if (group1 === "&" && group2 === "&") return "&";
			return "";
		});
	}
	return post({ url: URL.pageAuth, data: { targetUrl } }, { noFalseMsg: true });
};
const btnAuth = async (data: GetButtonReq) => post<BtnResource[]>({ url: URL.btnAuth, data });
const btnPageAuth = async (data: GetButtonPageReq) => post<boolean>({ url: URL.btnPageAuth, data });
const btnPageAuthNoMsg = async (data: GetButtonPageReq) => post<boolean>({ url: URL.btnPageAuth, data }, { noFalseMsg: true });
const microList = async (data: ObjTy) => post({ url: URL.microList, data });
const loginOut = async (data: ObjTy) => post({ url: URL.loginOut, data });
const employeeDetail = async (data: ObjTy) => post({ url: URL.employeeDetail, data }, { headers: { resCode: to_do_center } });
const addCommon = async (data: ObjTy) => post({ url: URL.addCommon, data }, { headers: { resCode: collection_universal } });
const cancelCommon = async (data: ObjTy) => post({ url: URL.cancelCommon, data }, { headers: { resCode: collection_universal } });
const listCommon = async () => get({ url: URL.listCommon }, { headers: { resCode: collection_universal } });
const getUserInfoByToken = async () => post({ url: `${URL.verifyToken}?token=${cookie.get(initConfig().tokenName)}`, data: {} }, { headers: { resCode: to_do_center } }); // 渠道商完善信息前端配置中心走白名单
const hasRealAuth = async () => post({ url: URL.hasRealAuth, data: {} });
const getAllUrlByOssKey = async (data: QueryFilesReq) => post<OPBFileResp[]>({ url: URL.queryBatchAll, data }, { headers: { resCode: "todo_approve_detail" } });
const getUserView = async () => get({ url: URL.userView });
const getExgAuthToken = async (data: any = {}) => post({ url: URL.getExgAuthToken, data }, { noFalseMsg: true });
const loginSystem = async (data: loginTy) => post({ url: URL.login, data });
const getGradeIndex = async (data: ObjTy) => post({ url: URL.getGradeIndex, data }, { headers: { resCode: "grade_icon" } });
const getGradePopup = async (data: ObjTy) => post({ url: URL.getGradePopup, data }, { headers: { resCode: "grade_details_pc" } });
const checkGradeCoupon = async (data: ObjTy) => post({ url: URL.checkGradeCoupon, data }, { headers: { resCode: "grade_details_pc" } });

export {
	pageAuth,
	btnAuth,
	btnPageAuth,
	btnPageAuthNoMsg, // get-button-page鉴权失败不弹提示信息，适用于模块显隐鉴权（用户无感）
	microList,
	loginOut,
	employeeDetail,
	addCommon,
	cancelCommon,
	listCommon,
	getUserInfoByToken,
	hasRealAuth,
	getAllUrlByOssKey,
	getExgAuthToken,
	getUserView,
	loginSystem,
	getGradeIndex,
	getGradePopup,
	checkGradeCoupon,
};
