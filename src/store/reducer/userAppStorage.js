import {
    LOG_ADMIN_IN, LOGIN_ADMIN, FETCH_USERS, FETCH_USER, UPDATE_USER, DELETE_USER,
    FETCH_DEPOSITS, FETCH_DEPOSIT, UPDATE_DEPOSIT, DELETE_DEPOSIT,
    UPDATE_ADMIN, FETCH_WITHDRAWS, FETCH_WITHDRAW, UPDATE_WITHDRAW, DELETE_WITHDRAW, FETCH_TRADES, FETCH_TRADE, UPDATE_TRADE, DELETE_TRADE, CREATE_TRADE
} from "../action/userAppStorage";



const initialState = {
    adminToken: "",
    //expiresIn: "",
    admin: null,
    color: {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',
    },
    usersList: [],
    depositsList: [],
    withdrawsList: [],
    tradesList:[]
}



export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_ADMIN_IN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token
            }

        case LOGIN_ADMIN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token
            }


        case FETCH_USERS:
            return {
                ...state,
                usersList: action.payload
            }

        case FETCH_USER:
            return {
                ...state,
                usersList: action.payload
            }

        case UPDATE_USER:
            if (true) {
                let updatedUser = action.payload

                let newUserList = []
                for (let data of state.usersList) {
                    if (data._id.toString() === updatedUser._id.toString()) {
                        newUserList.push(updatedUser)
                    } else {
                        newUserList.push(data)
                    }
                }

                return {
                    ...state,
                    usersList: newUserList
                }



            }

        case DELETE_USER:
            if (true) {
                let userId = action.payload
                let newUser = state.usersList.filter(data => data._id !== userId)
                return {
                    ...state,
                    usersList: newUser
                }
            }




        case FETCH_DEPOSITS:
            return {
                ...state,
                depositsList: action.payload
            }

        case FETCH_DEPOSIT:
            return {
                ...state,
                depositsList: action.payload
            }

        case UPDATE_DEPOSIT:
            if (true) {
                let updatedDeposit = action.payload

                let newDepositList = []
                for (let data of state.depositsList) {
                    if (data._id.toString() === updatedDeposit._id.toString()) {
                        newDepositList.push(updatedDeposit)
                    } else {
                        newDepositList.push(data)
                    }
                }

                return {
                    ...state,
                    depositsList: newDepositList
                }
            }

        case DELETE_DEPOSIT:
            if (true) {
                let depositId = action.payload
                let newDeposit = state.depositsList.filter(data => data._id !== depositId)
                return {
                    ...state,
                    depositsList: newDeposit
                }
            }

       









        case FETCH_WITHDRAWS:
            return {
                ...state,
                withdrawsList: action.payload
            }

        case FETCH_WITHDRAW:
            return {
                ...state,
                withdrawsList: action.payload
            }

        case UPDATE_WITHDRAW:
            if (true) {
                let updatedWithdraw = action.payload

                let newWithdrawList = []
                for (let data of state.withdrawsList) {
                    if (data._id.toString() === updatedWithdraw._id.toString()) {
                        newWithdrawList.push(updatedWithdraw)
                    } else {
                        newWithdrawList.push(data)
                    }
                }

                return {
                    ...state,
                    withdrawsList: newWithdrawList
                }
            }

        case DELETE_WITHDRAW:
            if (true) {
                let withdrawId = action.payload
                let newWithdraw = state.withdrawsList.filter(data => data._id !== withdrawId)
                return {
                    ...state,
                    withdrawsList: newWithdraw
                }
            }

        


        /*
        FETCH_TRADES, FETCH_TRADE, UPDATE_TRADE, DELETE_TRADE, CREATE_TRADE
        
        */


        case FETCH_TRADES:
            return {
                ...state,
                tradesList: action.payload
            }
        case FETCH_TRADE:
            return {
                ...state,
                tradesList: action.payload
            }
        case UPDATE_TRADE:
            if (true) {
                let updatedTrade = action.payload

                let newTradeList = []
                for (let data of state.tradesList) {
                    if (data._id.toString() === updatedTrade._id.toString()) {
                        newTradeList.push(updatedTrade)
                    } else {
                        newTradeList.push(data)
                    }
                }

                return {
                    ...state,
                    tradesList: newTradeList
                }
            }
        case DELETE_TRADE:
            if (true) {
                let tradeId = action.payload
                let newTrade = state.tradesList.filter(data => data._id !== tradeId)
                return {
                    ...state,
                    tradesList: newTrade
                }
            }

        case CREATE_TRADE:
            if (true) {
                let newTrade = action.payload
                let newTradeList = state.tradesList.push(newTrade)
                return {
                    ...state,
                    tradesList: newTradeList
                }
            }



        case UPDATE_ADMIN:
            if (true) {
                let updatedAdmin = action.payload
                return {
                    ...state,
                    admin: updatedAdmin
                }
            }

        default:
            return state
    }
}





