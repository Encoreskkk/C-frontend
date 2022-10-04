import React, { useEffect, useState, useMemo } from "react";
import { Route } from "react-router-dom";
import { CacheRoute, CacheSwitch } from "react-router-cache-route";
import { connect } from "react-redux";
import { setUserMenu } from "@/store/action";
import routerList from "./list";
import Intercept from "./intercept.js";
import { getMenus } from "@/common";
import { formatMenu, reduceMenuList } from "@/utils";

// 新增luhix
import { getKey } from "@/utils";

/**
 *
 * @param {Array} menuList 用户全局用户路由列表
 * @param {Function} setStateMenuList 设置全局用户路由列表
 * @returns {Array} 返回渲染的路由列表组件
 */
// function useRouter(setStateMenuList) {
//   const [ajaxUserMenuList, setAjaxUserMenuList] = useState([]); // 网络请求回来的 路由列表
//   const [mergeRouterList, setMergeLRouterList] = useState([]);// 本地 和 接口返回的路由列表 合并的结果
//   useEffect(() => {
//     if (setStateMenuList && typeof setStateMenuList === "function") {
//       getMenus().then((list) => {
//         console.log('list: ', list)
//         debugger
//         const formatList = formatMenu(list)
//         const userMenus = reduceMenuList(formatList);
//         debugger
//         // 把请求的数据 和 本地pages页面暴露出的路由列表合并
//         let routers = routerList.map((router) => {
//           let find = userMenus.find((i) => (i[MENU_PARENTPATH] || "") + i[MENU_PATH] === router[MENU_PATH]);
//           if (find) {
//             router = { ...find, ...router }; // 本地 优先 接口结果
//           } else {
//             router[MENU_KEY] = router[MENU_PATH];
//           }
//           return router;
//         });
//         if (list && list.length) {
//           setStateMenuList(formatList);
//           setAjaxUserMenuList(userMenus);
//           setMergeLRouterList(routers);
//         }
//       });
//     }
//   }, [setStateMenuList]);

//   const routerBody = useMemo(() => {
//     // 监听 本地路由列表   同时存在长度大于1时 渲染路由组件
//     if (mergeRouterList.length) {
//       return mergeRouterList.map((item) => {
//         let { [MENU_KEY]: key, [MENU_PATH]: path } = item;
//         const RenderRoute = item[MENU_KEEPALIVE] === "true" ? CacheRoute : Route;
//         return (
//           <RenderRoute
//             key={key}
//             exact={true}
//             path={path}
//             render={(allProps) => (
//               <Intercept
//                 {...allProps}
//                 {...item}
//                 menuList={ajaxUserMenuList}
//                 pageKey={key}
//               />
//             )}
//           />
//         );
//       });
//     }
//     return null
//   }, [ajaxUserMenuList, mergeRouterList])
//   return { routerBody };
// }



function useRouter(setStateMenuList) {
  const [ajaxUserMenuList, setAjaxUserMenuList] = useState([]); // 网络请求回来的 路由列表
  const [mergeRouterList, setMergeLRouterList] = useState([]);// 本地 和 接口返回的路由列表 合并的结果
  useEffect(() => {


    let list = ''

    let userInfo = getKey(true, 'USER_INFO')
    console.log('用户信息： ', userInfo)
    console.log('list: ', list)

    if ( userInfo.role === 1) {
      // 1. 管理员
      list = [
        {
            "menu_id": 19,
            "title": "物业服务",
            "path": "/property",
            "key": "property",
            "parentKey": "",
            "icon": "icon_guests",
            "keepAlive": "false",
            "order": 1
        },
        {
            "menu_id": 20,
            "title": "物资列表",
            "path": "/goods",
            "key": "propertyGoods",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 2
        },
        {
          "menu_id": 33,
          "title": "基础设施",
          "path": "/tool",
          "key": "propertyTool",
          "parentKey": "property",
          "icon": "icon_list",
          "keepAlive": "true",
          "order": 2
        },
        {
            "menu_id": 21,
            "title": "档案列表",
            "path": "/profile",
            "key": "propertyProfile",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 2
        },
        {
            "menu_id": 22,
            "title": "人事列表",
            "path": "/staff",
            "key": "propertyStaff",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 3
        },
        {
          "menu_id": 34,
          "title": "人事安排",
          "path": "/task",
          "key": "propertyTask",
          "parentKey": "property",
          "icon": "icon_list",
          "keepAlive": "true",
          "order": 3
      },
        {
            "menu_id": 24,
            "title": "服务项目",
            "path": "/serve",
            "key": "propertyServe",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 4
        },
        {
            "menu_id": 25,
            "title": "用户服务",
            "path": "/person",
            "key": "person",
            "parentKey": "",
            "icon": "icon_nickname",
            "keepAlive": "false",
            "order": 10
        },
        {
            "menu_id": 26,
            "title": "用户申请",
            "path": "/apply",
            "key": "personApply",
            "parentKey": "person",
            "icon": "icon_form",
            "keepAlive": "true",
            "order": 11
        },
        {
          "menu_id": 26,
          "title": "用户车位",
          "path": "/car",
          "key": "personCar",
          "parentKey": "person",
          "icon": "icon_togo",
          "keepAlive": "true",
          "order": 11
        },
        {
            "menu_id": 28,
            "title": "活动列表",
            "path": "/activity",
            "key": "propertyActivity",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 12
        },
        {
            "menu_id": 27,
            "title": "用户缴费",
            "path": "/pay",
            "key": "personPay",
            "parentKey": "person",
            "icon": "icon_evitarepayment",
            "keepAlive": "true",
            "order": 13
        },
        {
            "menu_id": 30,
            "title": "楼栋管理",
            "path": "/building",
            "key": "propertyBuilding",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 14
        },
        {
            "menu_id": 31,
            "title": "车位列表",
            "path": "/park",
            "key": "propertyPark",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 15
        },
        {
            "menu_id": 32,
            "title": "房间管理",
            "path": "/room",
            "key": "propertyRoom",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 15
        },
        {
            "menu_id": 15,
            "title": "用户管理",
            "path": "/user",
            "key": "powerUser",
            "parentKey": "power",
            "icon": "icon_infopersonal",
            "keepAlive": "true",
            "order": 1593
        },
        {
            "menu_id": 12,
            "title": "权限管理",
            "path": "/power",
            "key": "power",
            "parentKey": "",
            "icon": "icon_set",
            "keepAlive": "false",
            "order": 10000
        }
      ]

    } else {
       // 2. 业主
        list = [
          {
              "menu_id": 19,
              "title": "物业服务",
              "path": "/property",
              "key": "property",
              "parentKey": "",
              "icon": "icon_guests",
              "keepAlive": "false",
              "order": 1
          },
          {
              "menu_id": 20,
              "title": "物资列表",
              "path": "/goods",
              "key": "propertyGoods",
              "parentKey": "property",
              "icon": "icon_list",
              "keepAlive": "true",
              "order": 2
          },
          {
            "menu_id": 33,
            "title": "基础设施",
            "path": "/tool",
            "key": "propertyTool",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 2
          },
          // {
          //     "menu_id": 21,
          //     "title": "档案列表",
          //     "path": "/profile",
          //     "key": "propertyProfile",
          //     "parentKey": "property",
          //     "icon": "icon_list",
          //     "keepAlive": "true",
          //     "order": 2
          // },
          // {
          //     "menu_id": 22,
          //     "title": "人事列表",
          //     "path": "/staff",
          //     "key": "propertyStaff",
          //     "parentKey": "property",
          //     "icon": "icon_list",
          //     "keepAlive": "true",
          //     "order": 3
          // },
          {
            "menu_id": 34,
            "title": "人事安排",
            "path": "/task",
            "key": "propertyTask",
            "parentKey": "property",
            "icon": "icon_list",
            "keepAlive": "true",
            "order": 3
        },
          {
              "menu_id": 24,
              "title": "服务项目",
              "path": "/serve",
              "key": "propertyServe",
              "parentKey": "property",
              "icon": "icon_list",
              "keepAlive": "true",
              "order": 4
          },
          {
              "menu_id": 25,
              "title": "用户服务",
              "path": "/person",
              "key": "person",
              "parentKey": "",
              "icon": "icon_nickname",
              "keepAlive": "false",
              "order": 10
          },
          {
              "menu_id": 26,
              "title": "用户申请",
              "path": "/apply",
              "key": "personApply",
              "parentKey": "person",
              "icon": "icon_form",
              "keepAlive": "true",
              "order": 11
          },
          {
            "menu_id": 26,
            "title": "用户车位",
            "path": "/car",
            "key": "personCar",
            "parentKey": "person",
            "icon": "icon_togo",
            "keepAlive": "true",
            "order": 11
          },
          {
              "menu_id": 28,
              "title": "活动列表",
              "path": "/activity",
              "key": "propertyActivity",
              "parentKey": "property",
              "icon": "icon_list",
              "keepAlive": "true",
              "order": 12
          },
          {
              "menu_id": 27,
              "title": "用户缴费",
              "path": "/pay",
              "key": "personPay",
              "parentKey": "person",
              "icon": "icon_evitarepayment",
              "keepAlive": "true",
              "order": 13
          },
          // {
          //     "menu_id": 30,
          //     "title": "楼栋管理",
          //     "path": "/building",
          //     "key": "propertyBuilding",
          //     "parentKey": "property",
          //     "icon": "icon_list",
          //     "keepAlive": "true",
          //     "order": 14
          // },
          // {
          //     "menu_id": 31,
          //     "title": "车位列表",
          //     "path": "/park",
          //     "key": "propertyPark",
          //     "parentKey": "property",
          //     "icon": "icon_list",
          //     "keepAlive": "true",
          //     "order": 15
          // },
          // {
          //     "menu_id": 32,
          //     "title": "房间管理",
          //     "path": "/room",
          //     "key": "propertyRoom",
          //     "parentKey": "property",
          //     "icon": "icon_list",
          //     "keepAlive": "true",
          //     "order": 15
          // },
          // {
          //     "menu_id": 15,
          //     "title": "用户管理",
          //     "path": "/user",
          //     "key": "powerUser",
          //     "parentKey": "power",
          //     "icon": "icon_infopersonal",
          //     "keepAlive": "true",
          //     "order": 1593
          // },
          // {
          //     "menu_id": 12,
          //     "title": "权限管理",
          //     "path": "/power",
          //     "key": "power",
          //     "parentKey": "",
          //     "icon": "icon_set",
          //     "keepAlive": "false",
          //     "order": 10000
          // }
      ]

    }

   
    

    // debugger
    const formatList = formatMenu(list)
    const userMenus = reduceMenuList(formatList);
    // debugger
        // 把请求的数据 和 本地pages页面暴露出的路由列表合并
    let routers = routerList.map((router) => {
        let find = userMenus.find((i) => (i[MENU_PARENTPATH] || "") + i[MENU_PATH] === router[MENU_PATH]);
        if (find) {
          router = { ...find, ...router }; // 本地 优先 接口结果
        } else {
          router[MENU_KEY] = router[MENU_PATH];
        }
        return router;
    });
    if (list && list.length) {
      setStateMenuList(formatList);
      setAjaxUserMenuList(userMenus);
      setMergeLRouterList(routers);
    }
  }, [setStateMenuList]);

  const routerBody = useMemo(() => {
    // 监听 本地路由列表   同时存在长度大于1时 渲染路由组件
    if (mergeRouterList.length) {
      return mergeRouterList.map((item) => {
        let { [MENU_KEY]: key, [MENU_PATH]: path } = item;
        const RenderRoute = item[MENU_KEEPALIVE] === "true" ? CacheRoute : Route;
        return (
          <RenderRoute
            key={key}
            exact={true}
            path={path}
            render={(allProps) => (
              <Intercept
                {...allProps}
                {...item}
                menuList={ajaxUserMenuList}
                pageKey={key}
              />
            )}
          />
        );
      });
    }
    return null
  }, [ajaxUserMenuList, mergeRouterList])
  return { routerBody };
}


const Router = ({ setStateMenuList }) => {
  const { routerBody } = useRouter(setStateMenuList);
  return <CacheSwitch>{routerBody}</CacheSwitch>;
};

const mapDispatchToProps = (dispatch) => ({
  setStateMenuList: (list) => dispatch(setUserMenu(list)),
});
export default connect(null, mapDispatchToProps)(Router);
