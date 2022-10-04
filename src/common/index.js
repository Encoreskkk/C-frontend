import { getLocalMenu, saveLocalMenu } from "../utils";
import { getMenu } from "@/api";

// 解决 多次请求 菜单问题
let currentMenuJob
function getMenus() {
  if (currentMenuJob) {
    return currentMenuJob
  }
  const job = new Promise((resolve) => {
    let localMenu = getLocalMenu();
    if (localMenu) {
      return resolve(localMenu);
    }
    let list = [
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
          "menu_id": 14,
          "title": "权限类别",
          "path": "/type",
          "key": "powerType",
          "parentKey": "power",
          "icon": "icon_safety",
          "keepAlive": "true",
          "order": 12
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
          "menu_id": 13,
          "title": "菜单管理",
          "path": "/menu",
          "key": "powerMenu",
          "parentKey": "power",
          "icon": "icon_menu",
          "keepAlive": "true",
          "order": 1475
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

  if (list.length > 0) {
    saveLocalMenu(list);
    resolve(list);
  }


    // getMenu()
    //   .then((result) => {
    //     debugger
    //     if (result) {
    //       saveLocalMenu(result);
    //       resolve(result);
    //     }
    //   })
    //   .catch((err) => {
    //     resolve([]);
    //   });
  })
  currentMenuJob = job
  job.finally(() => currentMenuJob = null)
  return job
}

export { getMenus };
export * from "./var"
export { default as ajax } from "./ajax"
