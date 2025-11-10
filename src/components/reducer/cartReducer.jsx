const CartReducer = (state = [], action) => {
    // console.log(state, action);
    let newState = state;

    switch (action.type) {
        case "ADD_TO_CART":
            return [
                ...state,
                {
                    id: action.id,
                    info: action.info,
                    quantity: 1
                }
            ]

        case "UPDATE_QUANTITY":
            const itemCart = newState.find(key => key.id === action.id)
            itemCart.quantity++;
            return newState;

        case "DELETE_ITEM":
            newState = newState.filter(index => index.id !== action.id) ;
            return newState;
        
        case "DELETE_ALL":
            return [];
        
        default:
            return state;
    }
}

export default CartReducer;