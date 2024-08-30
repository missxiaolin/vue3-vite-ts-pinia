/*
 * @Author: wanglijian wanglijian@enmonster.com
 * @Date: 2023-05-05 15:15:30
 * @LastEditors: wanglijian wanglijian@enmonster.com
 * @LastEditTime: 2023-07-06 14:18:42
 * @FilePath: /rsm-ui/src/api/common/model.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface ReqPageAuth {
	targetUrl: string;
	mainFirst?: boolean;
}

export interface GetButtonReq {
	resCode: string;
}

export interface GetButtonPageReq {
	resCode: string;
	bizNo?: string | number;
}

export interface BtnResource {
	resCode: string;
	resName: string;
	id: number;
	resUrl: string;
	resType: number;
}

/* 查询文件入参 */
export interface QueryFilesReq {
	fileKeys: string[];
	// securityLevel: props.securityLevel;
	showFileName?: boolean;
}
/* 查询文件出参 */
export interface OPBFileResp {
	fileKey: string;
	fileUrl: string;
	originalName?: string;
}
