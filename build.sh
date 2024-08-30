#!/bin/bash
###
# @Author: zhusaiji zhusaiji@enmonster.com
# @Date: 2022-11-24 15:07:51
 # @LastEditors: wangman wangman@enmonster.com
 # @LastEditTime: 2024-03-22 15:08:38
 # @FilePath: /rsm-ui/build.sh
# @Description:
#
# @设置 原别名 npm config set @enmonster:registry https://verdaccio.qa.enmonster.com/
#
# Copyright (c) 2022 by zhusaiji zhusaiji@enmonster.com, All Rights Reserved.

# [ "$?" != "0" ] && exit 2   1:默认错误 2:当条执行错误退出
###

set +x
set -e

echo "========== 开始执行打包命令 =========="
node -v
npm -v
rm -rf node_modules
rm -rf dist
rm -rf package-lock.json
# npm install eui-plus@latest  --registry http://verdaccio.qa.enmonster.com
npm config set @enmonster:registry https://verdaccio.qa.enmonster.com/
npm config set @eui-plus:registry https://verdaccio.qa.enmonster.com/
echo "@enmonster/eui-plus install"
npm config set registry https://registry.npmmirror.com
echo "npm install"
npm install
[ "$?" != "0" ] && echo "执行 npm install 安装依赖失败" && exit 2
echo "npm run build"
if [[ "$1" == "" || "$1" = "gr" || "$1" = "prd" ]]; then
  echo "ENV:prd"
  echo "npm run build"
  npm run build
else
  echo "ENV:"$1
  echo "npm run build:"$1
  npm run build:$1
fi #ifend
echo "========== 服务打包完成完成 =========="
