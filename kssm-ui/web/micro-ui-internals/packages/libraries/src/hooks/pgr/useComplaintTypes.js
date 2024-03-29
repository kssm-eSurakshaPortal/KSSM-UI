import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useComplaintTypes = ({ stateCode }) => {
  const [complaintTypes, setComplaintTypes] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const res = await Digit.GetServiceDefinitions.getMenu(stateCode, t);      
      let menu = res.filter((o) => o.key !== "");
      console.log(menu);
      menu.push({ key: "Others", name: t("SERVICEDEFS.OTHERS"),deptCode:"deptCode" });
      setComplaintTypes(menu);
    })();
  }, [t, stateCode]);

  return complaintTypes;
};

export default useComplaintTypes;
