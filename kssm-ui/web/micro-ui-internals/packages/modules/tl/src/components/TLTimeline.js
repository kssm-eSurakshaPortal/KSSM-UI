import React from "react";
import { useTranslation } from "react-i18next";
import { TickMark } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
let actions = [];
let link = [
  "license-unit-det",
  "license-applicant-det",
  'license-doc-det',
 // "license-declaration-det",
  "check"
];
const getAction = (flow) => {
  switch (flow) {
    case "STAKEHOLDER": actions = []
      break;
    default: actions = [
      'TL_COMMON_TR_DETAILS',
      'TL_APPLICANT_AND_OWNER_DETAILS',
      'TL_DOCUMENT_DETAIL',
   //   'TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_HEADER',
      'TL_COMMON_SUMMARY',
    ]
  }
}


const Timeline = ({ currentStep = 1, flow = "" }) => {
  const { t } = useTranslation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  getAction(flow);
  return (
    <div className="timeline-container" style={isMobile ? {} : { maxWidth: "auto", minWidth: "auto", marginRight: "auto" }} >
      {actions.map((action, index, arr) => (
        <div className="timeline-checkpoint" key={index}>
          <div className="timeline-content">

            <span className={`circle ${index <= currentStep - 1 && 'active'}`}>{index < currentStep - 1 ? <TickMark /> : index + 1}</span>
            <span className="secondary-color">{t(action)}</span>
            {/* <Link to={{ pathname: `/digit-ui/citizen/tl/tradelicence/new-application/` + link[index] }}>
              <span className="secondary-color">{t(action)}</span>
            </Link> */}
          </div>
          {index < arr.length - 1 && <span className={`line ${index < currentStep - 1 && 'active'}`}></span>}
        </div>
      ))}
    </div>
  )
}

export default Timeline; 