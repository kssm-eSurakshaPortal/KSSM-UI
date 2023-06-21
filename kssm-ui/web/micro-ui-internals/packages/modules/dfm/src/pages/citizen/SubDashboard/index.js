import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch,useHistory } from "react-router-dom";
import { PrivateRoute, BreadCrumb, BackButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Submenu from "./Submenu";
import SubType from "../SubType";
import CreateTradeLicence from "../Create";

const SubDashboard = ({ parentUrl }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
const onNext=()=>{
  // console.log('next',path);
  history.push(`${path}/create`);
}
  return (
    <React.Fragment>
      <Switch>
        <Route path={`${path}`} exact>
          <SubType parentUrl={path} handleNext={onNext}/>
        </Route>
        {/* <PrivateRoute parentRoute={path} path={`${path}/sub-type`} component={() => <SubType parentUrl={path} handleNext={onNext}/>} /> */}
        <React.Fragment>
        <BackButton>Back</BackButton>
         <PrivateRoute parentRoute={path} path={`${path}/create`} component={() => <CreateTradeLicence parentUrl={path} />} />
          </React.Fragment>
      </Switch>
    </React.Fragment>
  );
};

export default SubDashboard;
