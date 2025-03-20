const Paths = {
    homePath(){
        return "/user"
    },
    authPath(){
       return "/auth"
    },
    userDashboardPath(){
        return "/user/dashboard"
    },
    userHouseListPath(){
        return "/user/house"
    },
    userHouseDetailPath(id:string){
        return `/user/house/${id}`
    },
    userPostHousePath(){
        return "/user/house/post-house"
    },

    adminDashboardPath(){
        return "/admin"
    },
    adminHouseReportPath(){
        return "/admin/houses-report"
    },
    adminPostRequestsPath(){
        return "/admin/post-requests"
    },
    adminFailureReportPath(id:string){
        return `/admin/report/failure/${id}`
    },
    adminSucessReportPath(id:string){
        return `/admin/report/success/${id}`
    },
    adminVisitRequestsPath(){
        return "/admin/visit-requests"
    },
    superAdminDashboard(){
        return "/super-admin"
    },
    superAdminAdminManagementPath(){
        return "/super-admin/admins"
    },
    superAdminExpenseManagementPath(){
        return "/super-admin/expenses"
    },
    superAdminFinancePath(){
        return "/super-admin/finances"
    }
}

export default Paths;