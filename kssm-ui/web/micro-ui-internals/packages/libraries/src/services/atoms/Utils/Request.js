import Axios from "axios";

Axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const isEmployee = window.location.pathname.split("/").includes("employee");
    if (err?.response?.data?.Errors) {
      for (const error of err.response.data.Errors) {
        if (error.message.includes("InvalidAccessTokenException")) {
          localStorage.clear();
          sessionStorage.clear()
          window.location.href =
            (isEmployee ? "/digit-ui/employee/user/login" : "/digit-ui/citizen/login") +
            `?from=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        }
      }
    }
    throw err;
  }
);

const requestInfo = () => ({
  // authToken: "677312f2-51ac-4821-a2e7-4463ff960cbb"
  authToken: Digit.UserService.getUser()?.access_token || null,
});

const authHeaders = () => ({
  "auth-token": Digit.UserService.getUser()?.access_token || null,
});

const userServiceData = () => ({ userInfo: Digit.UserService.getUser()?.info });

const userServiceDataInfo = () => ({ userInfo:{
  tenantId: Digit.UserService.getUser()?.info?.tenantId,
  uuid: Digit.UserService.getUser()?.info?.uuid
} }); 
const userServiceAction = () => ({ action : "_download",ver: ".01",ts: "",did: "1",
key: "", });

window.Digit = window.Digit || {};
window.Digit = { ...window.Digit, RequestCache: window.Digit.RequestCache || {} };
export const Request = async ({
  method = "POST",
  url,
  data = {},
  headers = {},
  useCache = false,
  params = {},
  auth,
  urlParams = {},
  userService,
  userDownloadInfo,
  userInfo,
  locale = true,
  authHeader = false,
  setTimeParam = true,
  userDownload = false,
  noRequestInfo = false,
  multipartFormData = false,
  multipartData = {}
}) => {
  if (method.toUpperCase() === "POST") {
    const ts = new Date().getTime()
    data.RequestInfo = {
      apiId: "Rainmaker",
    };
    if (auth) {
      data.RequestInfo = { ...data.RequestInfo, ...requestInfo() };
    }
    if (userService) {
      data.RequestInfo = { ...data.RequestInfo, ...userServiceData() };
    }
    if (userInfo) {
      data.RequestInfo = {...data.RequestInfo, ...userServiceDataInfo() }
    }
    if (userDownloadInfo) {
      data.RequestInfo = {...data.RequestInfo, ...userServiceAction() }
    }
    if (locale) {
      data.RequestInfo = { ...data.RequestInfo, msgId: `${ts}|${Digit.StoreData.getCurrentLanguage()}` };
    }
    if (noRequestInfo) {
      delete data.RequestInfo;
    }
  }

  const headers1 = {
    "Content-Type": "application/json",
    Accept: window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE")?"application/pdf,application/json":"application/pdf",
  };

  if (authHeader) headers = { ...headers, ...authHeaders() };

  if (userDownload) headers = { ...headers, ...headers1 };

  let key = "";
  if (useCache) {
    key = `${method.toUpperCase()}.${url}.${btoa(escape(JSON.stringify(params, null, 0)))}.${btoa(escape(JSON.stringify(data, null, 0)))}`;
    const value = window.Digit.RequestCache[key];
    if (value) {
      return value;
    }
  } else if (setTimeParam) {
    params._ = Date.now();
  }

  let _url = url
    .split("/")
    .map((path) => {
      let key = path.split(":")?.[1];
      return urlParams[key] ? urlParams[key] : path;
    })
    .join("/");
  
  if (multipartFormData) {
    const multipartFormDataRes = await Axios({ method, url: _url, data: multipartData.data, params, headers: { "Content-Type": "multipart/form-data", "auth-token": Digit.UserService.getUser()?.access_token || null  } });
    return multipartFormDataRes;
  }

 
    /* Fix for central instance to send tenantID in all query params  */
    const tenantInfo = Digit.SessionStorage.get("userType") === "citizen" ? Digit.ULBService.getStateId():Digit.ULBService.getCurrentTenantId() || Digit.ULBService.getStateId() ;
    if ((!params["tenantId"])&&(window?.globalConfigs?.getConfig("ENABLE_SINGLEINSTANCE"))) {
      params["tenantId"]=tenantInfo;
    }

  const res = userDownload
    ? await Axios({ method, url: _url, data, params, headers, responseType: "arraybuffer" })
    : await Axios({ method, url: _url, data, params, headers });

  if (userDownload) return res;

  const returnData = res?.data || res?.response?.data || {};
  if (useCache && res?.data && Object.keys(returnData).length !== 0) {
    window.Digit.RequestCache[key] = returnData;
  }
  return returnData;
};

/**
 *
 * @param {*} serviceName
 *
 * preHook:
 * ({params, data}) => ({params, data})
 *
 * postHook:
 * ({resData}) => ({resData})
 *
 */

export const ServiceRequest = async ({
  serviceName,
  method = "POST",
  url,
  data = {},
  headers = {},
  useCache = false,
  params = {},
  auth,
  userService,
}) => {
  const preHookName = `${serviceName}Pre`;
  const postHookName = `${serviceName}Post`;

  let reqParams = params;
  let reqData = data;
  if (window[preHookName] && typeof window[preHookName] === "function") {
    let preHookRes = await window[preHookName]({ params, data });
    reqParams = preHookRes.params;
    reqData = preHookRes.data;
  }
  const resData = await Request({ method, url, data: reqData, headers, useCache, params: reqParams, auth, userService });

  if (window[postHookName] && typeof window[postHookName] === "function") {
    return await window[postHookName](resData);
  }
  return resData;
};
