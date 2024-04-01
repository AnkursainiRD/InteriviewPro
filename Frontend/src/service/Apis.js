const BASE_URL=import.meta.env.VITE_BASE_URL

export const userEndpoints={
    LOGING_API: BASE_URL+ "/login",
    MANAGER_LOGIN_API: BASE_URL+ "/managerLogin",

    SIGNUP_API: BASE_URL+ '/signUp',
    MANAGER_SIGNUP_API: BASE_URL+ "/managerSignUp"
}

export const taskEndpoints={
    ADD_TASK_API: BASE_URL+"/addTask",
    SUBMIT_TIMESHEET_API: BASE_URL+ "/submitTimeSheet",
    RATE_SHEET_API: BASE_URL+ "/rateTheSheet"
}


// router.post("/signUp",signUp)
// router.post("/managerSignUp",managerSingUp)
// router.post("/login",login)
// router.post("/managerLogin",managerLogin)

// router.post("/addTask",auth,employee,addTask)
// router.get("/rateTheSheet",auth,manager,rateTheSheet)
// router.post("/submitTimeSheet",auth,employee,submitTimeSheet)