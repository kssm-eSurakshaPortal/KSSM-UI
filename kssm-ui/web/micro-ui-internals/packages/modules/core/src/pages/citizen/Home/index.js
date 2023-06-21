import {
    Calender, CardBasedOptions, CaseIcon,DropIcon, ComplaintIcon,InboxIcon, DocumentIcon, HomeIcon, Loader,EditIcon, OBPSIcon, PTIcon, StandaloneSearchBar, WhatsNewCard
} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const { data: { stateInfo } = {}, isLoading } = Digit.Hooks.useStore.getInitData();

  const handleClick = () => {
    history.push('/my-component')
  }
  const conditionsToDisableNotificationCountTrigger = () => {
    if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
    if (!Digit.UserService?.getUser()?.access_token) return false;
    return true;
  };

  const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
    tenantId,
    variant: "whats-new",
    config: {
      enabled: conditionsToDisableNotificationCountTrigger(),
    },
  });

  if (!tenantId) {
    history.push(`/digit-ui/citizen/select-language`);
  }

  const allCitizenServicesProps = {
    header: t("DASHBOARD_CITIZEN_SERVICES_LABEL"),
    sideOption: {
      name: t("DASHBOARD_VIEW_ALL_LABEL"),
      onClick: () => history.push("/digit-ui/citizen/all-services"),
    },
    options: [
      {
        name: t("ES_PGR_HEADER_COMPLAINT"),
        Icon: <ComplaintIcon />,
        onClick: () => history.push("/digit-ui/citizen/pgr-home"),
      },
      //{
       // name: t("MODULE_PT"),
       // Icon: <PTIcon className="fill-path-primary-main" />,
       // onClick: () => history.push("/digit-ui/citizen/pt-home"),
     // },
      {
        name: t("MODULE_TL"),
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/tl-home"),
      },
      // {
      //     name: t("ACTION_TEST_WATER_AND_SEWERAGE"),
      //     Icon: <DropIcon/>,
      //     onClick: () => history.push("/digit-ui/citizen")
      // },
      {
        name: t("Civil Registration"),
        Icon: <OBPSIcon />,
        onClick: () => history.push("/digit-ui/citizen/cr-home"),
        // onClick: () => history.push({
        //   pathname: '/digit-ui/citizen/cr-home',
        //   // state: { module: "cr-home" }
        // }),
      },
      // {
      //   name: t("ACTION_TEST_BIRTH"),
      //   Icon: <OBPSIcon />,
      //   // onClick: () => history.push("/citizen/birth-common/"),
      //   // onClick: () => history.push("/digit-ui/citizen/cr-home"),
      //   onClick: () => history.push({
      //     pathname: '/digit-ui/citizen/cr-birth-home',
      //     state: { module: "cr-birth" }
      //   }),
      // },
      // {
      //   name: t("ACTION_TEST_DEATH"),
      //   Icon: <DropIcon />,
      //   // onClick: () => history.push("/citizen/death-citizen/home"),
      //   // onClick: () => history.push("/digit-ui/citizen/cr-death-home"),
      //   onClick: () => history.push({
      //     pathname: '/digit-ui/citizen/cr-death-home',
      //     state: { module: "cr-death" }
      //   }),

      // },
      {
        name: t("File Management"),
        Icon: <EditIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/dfm-home"),
      },
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  const allInfoAndUpdatesProps = {
    header: t("CS_COMMON_DASHBOARD_INFO_UPDATES"),
    sideOption: {
      name: t("DASHBOARD_VIEW_ALL_LABEL"),
      onClick: () => {},
    },
    options: [
      {
        name: t("CS_HEADER_MYCITY"),
        Icon: <HomeIcon />,
      },
      {
        name: t("EVENTS_EVENTS_HEADER"),
        Icon: <Calender />,
        onClick: () => history.push("/digit-ui/citizen/engagement/events"),
      },
      {
        name: t("CS_COMMON_DOCUMENTS"),
        Icon: <DocumentIcon />,
        onClick: () => history.push("/digit-ui/citizen/engagement/docs"),
      },
      {
        name: t("CS_COMMON_SURVEYS"),
        Icon: <DocumentIcon />,
        onClick: () => history.push("/digit-ui/citizen/engagement/surveys/list"),
      },
      {
        name: t("CS_COMMON_INBOX_BPA"),
        Icon: <OBPSIcon />,
        onClick: () => history.push("/digit-ui/citizen/obps-home"),
      },
      // {
      //     name: t("CS_COMMON_HELP"),
      //     Icon: <HelpIcon/>
      // }
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  const allInfoMyProfileProps = {
    header: t("My Space"),
    sideOption: {
      name: t("DASHBOARD_VIEW_ALL_LABEL"),
      onClick: () => {},
    },
    options: [
      {
        name: t("My Profile"),
        Icon: <HomeIcon />,
      },
      {
        name: t("My DashBoard"),
        Icon: <InboxIcon />,
        // onClick: () => history.push("/digit-ui/citizen/engagement/events"),
      },
      {
        name: t("My Family"),
        Icon: <HomeIcon />,
        // onClick: () => history.push("/digit-ui/citizen/engagement/docs"),
      },
      {
        name: t("My Certificates"),
        Icon: <DocumentIcon />,
        // onClick: () => history.push("/digit-ui/citizen/engagement/surveys/list"),
      },
      // {
      //   name: t("CS_COMMON_INBOX_BPA"),
      //   Icon: <OBPSIcon />,
      //   onClick: () => history.push("/digit-ui/citizen/obps-home"),
      // },
      // // {
      // //     name: t("CS_COMMON_HELP"),
      // //     Icon: <HelpIcon/>
      // // }
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className="HomePageWrapper">
      <div className="BannerWithSearch">
        <img src={stateInfo?.bannerUrl} />
        <div className="Search">
          <StandaloneSearchBar placeholder={t("CS_COMMON_SEARCH_PLACEHOLDER")} />
        </div>
      </div>

      <div className="ServicesSection">
        <CardBasedOptions {...allCitizenServicesProps} />
        <CardBasedOptions {...allInfoAndUpdatesProps} />
        <CardBasedOptions {...allInfoMyProfileProps} />
      </div>

      {conditionsToDisableNotificationCountTrigger() ? (
        EventsDataLoading ? (
          <Loader />
        ) : (
          <div className="WhatsNewSection">
            <div className="headSection">
              <h2>{t("DASHBOARD_WHATS_NEW_LABEL")}</h2>
              <p onClick={() => history.push("/digit-ui/citizen/engagement/whats-new")}>{t("DASHBOARD_VIEW_ALL_LABEL")}</p>
            </div>
            <WhatsNewCard {...EventsData?.[0]} />
          </div>
        )
      ) : null}
    </div>
  );
};

export default Home;
