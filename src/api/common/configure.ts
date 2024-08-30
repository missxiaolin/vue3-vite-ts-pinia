import CryptoJS from "crypto-js"; //引用AES源码js
import { microList } from "./index";
/**
 * 依赖安装
 * cnpm install -D crypto-js
 *
 * 方法调用
  getClientConfig(){
    const param ={
      "keys": [
        "client.config"
      ],
      "systemCode": "EBS",
      "type": 1
    }
    this.axiosPost('/pgs-ms/client-config/batch/match', param).then(res=>{
      if(res.success){
        const decryptModel = Decrypt(res.model)
        const size = decryptModel["client.config.upload.video.size"]
      }
    })
  }
  各服务密钥:
  {
   "RBS": {
        "nameSpace":"RSM-MS.RBS",
        "secretKey":"8J7VNYJJZZU88CEH"
    },
   "EBS": {
        "nameSpace":"RSM-MS.EBS",
        "secretKey":"F5OL3L6N9JUHIKGL"
    },
    "HEA": {
        "nameSpace":"RSM-MS.HEA",
        "secretKey":"63PWJ5F9KZRQK0G8"
    },
    "MIS": {
        "nameSpace":"RSM-MS.MIS",
        "secretKey":"ZSMXNY51BMLWHGJ0"
    }
}

RBS转明文钥匙

 */
const key = CryptoJS.enc.Utf8.parse("8J7VNYJJZZU88CEH"), //十六位十六进制数作为密钥
	iv = CryptoJS.enc.Utf8.parse(""); //十六位十六进制数作为密钥偏移量

//解密方法
const Decrypt = (word: any) => {
	let encryptedHexStr = CryptoJS.enc.Base64.parse(word),
		srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr),
		decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }),
		decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

	return decryptedStr.toString();
};

//加密方法
const Encrypt = (word: any) => {
	let srcs = CryptoJS.enc.Utf8.parse(word),
		encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

	return encrypted.ciphertext.toString().toUpperCase();
};

const getClientConfig = async (param = {}) => {
	const params = {
		keys: ["client.config"],
		systemCode: "RBS",
		type: 1,
		...param,
	};
	const [res] = await microList(params);
	let decryptModel: any = {};
	if (res.success) {
		decryptModel = Decrypt(res.model);
		decryptModel = JSON.parse(decryptModel);
		Object.keys(decryptModel).forEach(item => {
			try {
				decryptModel[item] = JSON.parse(decryptModel[item]);
			} catch (error) {
				// ...
			}
		});
	}
	return decryptModel;
};

export { getClientConfig, Decrypt, Encrypt };
