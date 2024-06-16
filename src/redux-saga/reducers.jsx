import { INFODATASUCCESS } from "./actions"

const infoReducer = (state = { value: [] }, action) => {

    switch (action.type) {

        case INFODATASUCCESS:
           return {
                 value : [...action.payload]
            }
        default:
            return state
    }

}

export { infoReducer }