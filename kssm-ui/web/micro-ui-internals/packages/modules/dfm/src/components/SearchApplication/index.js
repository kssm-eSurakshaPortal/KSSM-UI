import React, { useCallback, useMemo, useEffect } from "react"
import { useForm, Controller } from "react-hook-form";
import { SearchForm, Table, Card, Header } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { convertEpochToDateDMY } from  "../../utils";
import SearchFields from "./SearchFields";
import MobileSearchApplication from "./MobileSearchApplication";

const mystyle = {
  bgOpacity:"1",
  backgroundColor:"#fff",
  backgroundColor:"rgba(255, 255, 255, var(--bg-opacity))",
  marginBottom:"24px",
  padding:"1.5rem",
  borderRadius:"1.6rem"
 };
 const hstyle ={
  fontSize:"20px",
  fontWeight:"500",
  color:"#2B2F3E",
  marginBottom:".5rem",
  lineHieght:"1.5rem"

 };

const SearchApplication = ({tenantId, t, onSubmit, data, count }) => {
    const { register, control, handleSubmit, setValue, getValues, reset } = useForm({
        defaultValues: {
            offset: 0,
            limit: 10,
            sortBy: "commencementDate",
            sortOrder: "DESC"
        }
    })

    useEffect(() => {
      register("offset", 0)
      register("limit", 10)
      register("sortBy", "commencementDate")
      register("sortOrder", "DESC")
    },[register])

    const onSort = useCallback((args) => {
      if (args.length === 0) return
      setValue("sortBy", args.id)
      setValue("sortOrder", args.desc ? "DESC" : "ASC")
    }, [])

    function onPageSizeChange(e){
        setValue("limit",Number(e.target.value))
        handleSubmit(onSubmit)()
    }

    function nextPage () {
        setValue("offset", getValues("offset") + getValues("limit"))
        handleSubmit(onSubmit)()
    }
    function previousPage () {
        setValue("offset", getValues("offset") - getValues("limit") )
        handleSubmit(onSubmit)()
    }

    const isMobile = window.Digit.Utils.browser.isMobile();

    if (isMobile) {
      return <MobileSearchApplication {...{ Controller, register, control, t, reset, previousPage, handleSubmit, tenantId, data, onSubmit }}/>
    }

    //need to get from workflow
    const GetCell = (value) => <span className="cell-text">{value}</span>;
    
    const columns = useMemo( () => ([
        {
          Header: t("File Number"),
          accessor: 'fileCode',
          disableSortBy: true,
          Cell: ({ row }) => {
            return (
              <div>
                <span className="link">
                  <Link to={`/digit-ui/employee/dfm/searchDetails/${row.original?.fileDetail["fileCode"]}`}>
                    {row.original?.fileDetail["fileCode"]}
                  </Link>
                </span>
              </div>
            );
          },
        },
        {
            Header: t("TL_COMMON_TABLE_COL_APP_DATE"),
            disableSortBy: true,
            accessor: (row) => GetCell(row.auditDetails.createdTime ? convertEpochToDateDMY(row.auditDetails.createdTime) : ""),
        },
        // {
        //     Header: t("TL_APPLICATION_TYPE_LABEL"),
        //     disableSortBy: true,
        //     accessor: (row) => GetCell(t(`TL_LOCALIZATION_APPLICATIONTYPE_${row.applicationType}`)),
        // },
        // {
        //     Header: t("TL_LICENSE_NUMBERL_LABEL"),
        //     disableSortBy: true,
        //     accessor: (row) => GetCell(row.licenseNumber || "-"),
        // },
        // {
        //   Header: t("TL_LICENSE_YEAR_LABEL"),
        //   disableSortBy: true,
        //   accessor: (row) => GetCell(row.financialYear),
        // },
        {
          Header: t("Applicant Name"),
          disableSortBy: true,
          accessor: (row) => GetCell(row.firstName + row.lastName|| ""),
        },
        {
          Header: t("House Name"),
          disableSortBy: true,
          accessor: (row) => GetCell(row.applicantAddress.houseName || ""),
        },
        {
          Header: t("Mobile No"),
          disableSortBy: true,
          accessor: (row) => GetCell(row.mobileNo || ""),
        },
        // {
        //   Header: t("TL_LOCALIZATION_TRADE_OWNER_NAME"),
        //   accessor: (row) => GetCell(row.tradeLicenseDetail.owners.map( o => o.name ). join(",") || ""),
        //   disableSortBy: true,
        // },
        // {
        //   Header: t("TL_COMMON_TABLE_COL_STATUS"),
        //   accessor: (row) =>GetCell(t( row?.workflowCode&&row?.status&&`WF_${row?.workflowCode?.toUpperCase()}_${row.status}`|| "NA") ),
        //   disableSortBy: true,
        // }
      ]), [] )
    return <React.Fragment>
                
                <div style={mystyle}>
                <h1 style={hstyle}>{t("TL_SEARCH_APPLICATIONS")}</h1>
                  <SearchForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
                  <SearchFields {...{register, control, reset, tenantId, t}} />

                  

                </SearchForm>

                </div>
                  
            {data?.display ? <Card style={{ marginTop: 20 }}>
                {
                t(data.display)
                    .split("\\n")
                    .map((text, index) => (
                    <p key={index} style={{ textAlign: "center" }}>
                        {text}
                    </p>
                    ))
                }
            </Card>
            : data !== "" && <Table
                t={t}
                data={data}
                totalRecords={count}
                columns={columns}
                getCellProps={(cellInfo) => {
                return {
                    style: {
                    minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
                    padding: "20px 18px",
                    fontSize: "16px"
                  },
                };
                }}
                onPageSizeChange={onPageSizeChange}
                currentPage={getValues("offset")/getValues("limit")}
                onNextPage={nextPage}
                onPrevPage={previousPage}
                pageSizeLimit={getValues("limit")}
                onSort={onSort}
                disableSort={false}
                sortParams={[{id: getValues("sortBy"), desc: getValues("sortOrder") === "DESC" ? true : false}]}
            />}
        </React.Fragment>
}

export default SearchApplication