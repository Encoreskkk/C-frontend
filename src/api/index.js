import ajax from "@/common/ajax";
import mock from "../mock/index";
const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;
const getMenu = () => request.get("/getmenu");
const getMenuList = () => request.get("/getmenulist");
// const login = (data) => request.post("/login", data);
const login = (data) => request.post("/uUser/login", data);
const addMenu = (data) => request.post("/addmenu", data);
const addMsg = (data) => request.post("/addmessage", data);
const getMsg = (data) => request.post("/getmessage", data);
const getPower = () => request.get("/getpower");
const delMenu = (data) => request.post("/delmenu", data);
const getMenuInfo = (data) => request.post("/getmenuinfo", data);
const editMenu = (data) => request.post("/editmenuinfo", data);
const getVisitorList = (data) => request.post("/getiplist", data);
const getVisitorData = () => request.get("/getvisitordata");

// const addUser = (data) => request.post("/adduserinfo", data);
const getUser = (data) => request.post("/getuserinfo", data);
// const editUser = (data) => request.post("/edituserinfo", data);
const editType = (data) => request.post("/edittype", data);
const addType = (data) => request.post("/addtype", data);
const getFeedBack = (data) => request.post("/getfeedback", data);
const reply = (data) => request.post("/reply", data);

// lhx 新增
const getUserList = (data) => request.get("/uUser/list", data);
const addUser = (data) => request.post("/uUser/add", data);
const editUser = (data) => request.post("/uUser/mod", data);
const delUser = (data) => request.post("/uUser/del?id="+data, data);

const getPropertyGoodsList = (data) => request.get("/bGood/list", data);
const addPropertyGoods = (data) => request.post("/bGood/add", data);
const editPropertyGoods = (data) => request.post("/bGood/mod", data);

const getPropertyProfileList = (data) => request.get("/uUserRoom/list", data);
const addPropertyProfile = (data) => request.post("/uUserRoom/add", data);
const editPropertyProfile = (data) => request.post("/uUserRoom/mod", data);
const delProfile = (data) => request.post("/uUserRoom/del?id="+data, data);

const getPropertyStaffList = (data) => request.get("/uStaff/list", data);
const addPropertyStaff = (data) => request.post("/uStaff/add", data);
const editPropertyStaff = (data) => request.post("/uStaff/mod", data);
const delStaff = (data) => request.post("/uStaff/del?id="+data, data);
// 获取职位
const getPropertyStaffPositionList = (data) => request.get("/uStaff/postList", data);

const getPropertyServeList = (data) => request.get("/bService/list", data);
const addPropertyServe = (data) => request.post("/bService/add", data);
const editPropertyServe = (data) => request.post("/bService/mod", data);
const delServe = (data) => request.post("/bService/del?id="+data, data);

const getPropertyActivityList = (data) => request.get("/bActivity/list", data);
const addPropertyActivity = (data) => request.post("/bActivity/add", data);
const editPropertyActivity = (data) => request.post("/bActivity/mod", data);
const delActivity = (data) => request.post("/bActivity/del?id="+data, data);

const getPropertyBuildList = (data) => request.get("/bBuild/list", data);
const addPropertyBuild = (data) => request.post("/bBuild/add", data);
const editPropertyBuild = (data) => request.post("/bBuild/mod", data);
const delBuild = (data) => request.post("/bBuild/del?id="+data, data);

const getPropertyParkList = (data) => request.get("/bPark/list", data);
const addPropertyPark = (data) => request.post("/bPark/add", data);
const editPropertyPark = (data) => request.post("/bPark/mod", data);

const getPropertyRoomList = (data) => request.get("/bRoom/list", data);
const addPropertyRoom = (data) => request.post("/bRoom/add", data);
const editPropertyRoom = (data) => request.post("/bRoom/mod", data);


const getPropertyToolList = (data) => request.get("/bInfrastructure/list", data);
const addPropertyTool = (data) => request.post("/bInfrastructure/add", data);
const editPropertyTool = (data) => request.post("/bInfrastructure/mod", data);
const delTool = (data) => request.post("/bInfrastructure/del?id="+data, data);

const getPropertyTaskList = (data) => request.get("/uStaffWork/list", data);
const addPropertyTask = (data) => request.post("/uStaffWork/add", data);
const editPropertyTask = (data) => request.post("/uStaffWork/mod", data);
const delTask = (data) => request.post("/uStaffWork/del?id="+data, data);

const getPersonApplyList = (data) => request.get("/uUserWork/list", data);
const addPersonApply = (data) => request.post("/uUserWork/add", data);
const checkPersonApply = (data) => request.post("/uUserWork/aduit", data);
const editPersonApply = (data) => request.post("/uUserWork/mod", data);
const delApply = (data) => request.post("/uUserWork/del?id="+data, data);
const getPersonCanApplyList = (data) => request.get("/uUserWork/listWork", data);


const getPersonPayList = (data) => request.get("/uUserPay/list", data);
const addPersonPay = (data) => request.post("/uUserPay/add", data);


const getPersonCarList = (data) => request.get("/uUserPark/list", data);
const addPersonCar= (data) => request.post("/uUserPark/add", data);
const editPersonCar = (data) => request.post("/uUserPark/mod", data);
const delPersonPark = (data) => request.post("/uUserPark/del?id="+data, data);

export {
  getMenu,
  login,
  addMenu,
  addMsg,
  getMsg,
  getPower,
  delMenu,
  getMenuInfo,
  editMenu,
  getVisitorList,
  getVisitorData,
  getUserList,
  addUser,
  getUser,
  editUser,
  delUser,
  editType,
  addType,
  getMenuList,
  getFeedBack,
  reply,
  getPropertyGoodsList,
  addPropertyGoods,
  editPropertyGoods,
  getPropertyProfileList,
  addPropertyProfile,
  editPropertyProfile,
  delProfile,
  getPropertyStaffList,
  getPropertyStaffPositionList,
  addPropertyStaff,
  editPropertyStaff,
  delStaff,
  getPropertyServeList,
  addPropertyServe,
  editPropertyServe,
  delServe,
  getPersonApplyList,
  addPersonApply,
  editPersonApply,
  delApply,
  getPersonPayList,
  checkPersonApply,
  getPersonCanApplyList,
  addPersonPay,
  getPropertyActivityList,
  addPropertyActivity,
  editPropertyActivity,
  delActivity,
  getPropertyBuildList,
  addPropertyBuild,
  editPropertyBuild,
  delBuild,
  getPropertyParkList,
  addPropertyPark,
  editPropertyPark,
  getPropertyRoomList,
  addPropertyRoom,
  editPropertyRoom,
  getPersonCarList,
  addPersonCar,
  editPersonCar,
  delPersonPark,
  getPropertyToolList,
  addPropertyTool,
  editPropertyTool,
  delTool,
  getPropertyTaskList,
  addPropertyTask,
  editPropertyTask,
  delTask
};
