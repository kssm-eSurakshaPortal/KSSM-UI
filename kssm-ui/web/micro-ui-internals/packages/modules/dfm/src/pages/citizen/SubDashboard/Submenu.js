import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BackButton,PrivateRoute, BreadCrumb,CommonDashboard } from "@egovernments/digit-ui-react-components";
import { useTranslation } from 'react-i18next';

const Submenu = ({ path }) => {
    const { t } = useTranslation();
    const state = useSelector(state => state);
    // console.log(state);
    let modules = state.common.modules
    let stateInfo = state.common.stateInfo
  // console.log(path,modules);
  const cardMenuData = [
    {
      title: "Finance",
      subTitle: "Inbox",},

    {
      title: "Create",
      subTitle: "Inbox",
      link: `${path}/sub-type`,
      // link: `${path}/create`,
      // link: `${path}/form-ui`,
    },
    {
      title: "BPA",
      subTitle: "Inbox",
    },
    {
      title: "PGR",
      subTitle: "Inbox",
    },
    {
      title: "Pension",
      subTitle: "Inbox",
    },
    {
      title: "License-1",
      subTitle: "Inbox",
    },
    {
      title: " License-2",
      subTitle: "Inbox",
    },
  ];
  const ModuleLevelLinkHomePages = modules.map(({ code, bannerImage }, index) => {
    return code === "DFM" ? (
      <div className="moduleLinkHomePage">
        <img src={bannerImage || stateInfo?.bannerUrl} alt="noimagefound" />
        <BackButton className="moduleLinkHomePageBackButton" />
        <h1>{t("SUB_MODULE_" + code.toUpperCase())}</h1>
        {/* <h1>{t("MODULE_" + code.toUpperCase())}</h1> */}
      </div>
    ) : (
      ""
    );
  });
  return (
 <React.Fragment>
   {ModuleLevelLinkHomePages}
    <CommonDashboard title="Choose Submenu" data={cardMenuData} path={path}/>
 </React.Fragment>
  );
};

export default Submenu;
