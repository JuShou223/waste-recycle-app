/*
 * @Date: 2025-08-06 08:43:06
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2025-08-07 10:57:17
 * @Description:
 */
import { Component, PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import "./app.scss";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("App launched.");
  });

  return children;
}

export default App;
