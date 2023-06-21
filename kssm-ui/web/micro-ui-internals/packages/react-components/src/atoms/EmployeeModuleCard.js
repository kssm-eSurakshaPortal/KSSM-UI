import React, { Fragment } from "react";
import { ArrowRightInbox } from "./svgindex";
import { Link } from "react-router-dom";

const EmployeeModuleCard = ({ Icon, moduleName, kpis = [], links = [], isCitizen = false, className, styles, FsmHideCount }) => {

  const ClassList = 
    {
     'Complaints':  'complaint-links-container',
     'Trade License':  'tl-links-container',
     'Civil Registration':  'cr-links-container', 
     'File Management':  'dfm-links-container', 
     'HRMS':  'survey-links-container' ,     
     'Documents':  'doc-links-container',
     'Events':  'event-links-container', 
     'Public Message Broadcast':  'public-links-container', 
     'Survey':  'survey-links-container',     
     
    };
  
  return (
    <>
    <div className={className ? className : "employeeCard card-home customEmployeeCard"} style={styles ? styles : {}}>
      <div className={ClassList[moduleName]}>
        <div className="header" style={isCitizen ? { padding: "0px" } : {}}>
        <span className="logo removeBorderRadiusLogo">{Icon}</span>
          <span className="text removeHeight">{moduleName}</span>
          
        </div>
        <div className="body" style={{ margin: "0px", padding: "0px" }}>
          {kpis.length !== 0 && (
            <div className="flex-fit" style={isCitizen ? { paddingLeft: "17px" } : {}}>
              {kpis.map(({ count, label, link }, index) => (
                <div className="card-count" key={index}>
                  <div>
                    <span style={{
                      fontSize: "21px"
                    }}>{count || "-"}</span>
                  </div>
                  <div>
                    {link ? (
                      <Link to={link} className="employeeTotalLink">
                        {label}
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="links-wrapper" style={{ width: "80%" }}>
            {links.map(({ count, label, link }, index) => (
              <span className="link" key={index}>
                {link ? <Link to={link}>{label}</Link> : null}
                {count ? (
                  <>
                    {FsmHideCount ? null : <span className={"inbox-total"}>{count || "-"}</span>}
                    <Link to={link}>
                      {/* <ArrowRightInbox /> */}
                    </Link>
                  </>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

const ModuleCardFullWidth = ({ moduleName, links = [], isCitizen = false, className, styles, headerStyle, subHeader, subHeaderLink }) => {
  return (
    <div className={className ? className : "employeeCard card-home customEmployeeCard"} style={styles ? styles : {}}>
      <div className="complaint-links-container" style={{ padding: "10px" }}>
        <div className="header" style={isCitizen ? { padding: "0px" } : headerStyle}>
          <span className="text removeHeight">{moduleName}</span>
          <span className="link">
            <a href={subHeaderLink}>
              <span className={"inbox-total"} style={{ display: "flex", alignItems: "center", color: "#F47738", fontWeight: "bold" }}>
                {subHeader || "-"}
                <span style={{ marginLeft: "10px" }}>
                  {" "}
                  <ArrowRightInbox />
                </span>
              </span>
            </a>
          </span>
        </div>
        <div className="body" style={{ margin: "0px", padding: "0px" }}>
          <div className="links-wrapper" style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {links.map(({ count, label, link }, index) => (
              <span className="link full-employee-card-link" key={index}>
                {link ? link?.includes("digit-ui/") ? <Link to={link}>{label}</Link> : <a href={link}>{label}</a> : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmployeeModuleCard, ModuleCardFullWidth };
