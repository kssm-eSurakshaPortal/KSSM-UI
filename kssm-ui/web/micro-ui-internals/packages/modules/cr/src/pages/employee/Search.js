import React, { useState } from "react"
import { TextInput, Label, SubmitBar, LinkLabel, ActionBar, CloseSvg, DatePicker, CardLabelError, SearchForm, SearchField, Dropdown } from "@egovernments/digit-ui-react-components";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";

const Search = ({ path }) => {
    const { variant } = useParams();
    const { t } = useTranslation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [payload, setPayload] = useState({})
    // const Search = Digit.ComponentRegistryService.getComponent( variant === "death-correction" ? "DeathCorrection" : "SearchCrApplication" )

    const Search = Digit.ComponentRegistryService.getComponent('SearchCrApplication')
    const SearchDeath = Digit.ComponentRegistryService.getComponent('SearchDeathApplication')

    function onSubmit(_data) {
        var fromDate = new Date(_data?.fromDate)
        fromDate?.setSeconds(fromDate?.getSeconds() - 19800)
        var toDate = new Date(_data?.toDate)
        toDate?.setSeconds(toDate?.getSeconds() + 86399 - 19800)
        const data = {
            ..._data,
            ...(_data.toDate ? { toDate: toDate?.getTime() } : {}),
            ...(_data.fromDate ? { fromDate: fromDate?.getTime() } : {})
        }

        setPayload(Object.keys(data).filter(k => data[k]).reduce((acc, key) => ({ ...acc, [key]: typeof data[key] === "object" ? data[key].code : data[key] }), {}))
    }

    const config = {
        enabled: !!(payload && Object.keys(payload).length > 0)
    }
    if (window.location.href.includes("/birthsearch") == true) {
        const { data: { ChildDetails: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearch({ tenantId, filters: payload, config })
        // console.log(searchResult);
        return <Search t={t} tenantId={tenantId} onSubmit={onSubmit} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    } else {
        const { data: { deathCertificateDtls: searchResult, Count: count } = {}, isLoading, isSuccess } = Digit.Hooks.cr.useSearchDeath({ tenantId, filters: payload, config })
        console.log(searchResult);
        return <SearchDeath t={t} tenantId={tenantId} onSubmit={onSubmit} data={!isLoading && isSuccess ? (searchResult?.length > 0 ? searchResult : { display: "ES_COMMON_NO_DATA" }) : ""} count={count} />
    }



}

export default Search