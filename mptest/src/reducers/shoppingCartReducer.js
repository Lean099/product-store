import {TYPES} from '../actions/cartAction'


export const initialState = {
  products: null,
  cart: []
}

export function shoppingCartReducer(state, action){
  switch(action.type){
    case TYPES.ADD_PRODUCTS:{
      return {...state, products: action.payload}
    }
    case TYPES.ADD_TO_CART:{
      let newItemInCart = state.products.find(pro=> pro._id === action.payload)
      let itemRepeatedInCart = state.cart.find(pro=> pro._id === newItemInCart._id)
      return itemRepeatedInCart ?
       {...state, cart: state.cart.map(item=>
            item._id === itemRepeatedInCart._id ? item.quantityAddedInCart<newItemInCart.quantity ? 
                {...item, quantityAddedInCart: item.quantityAddedInCart + 1} : {...item}
                : 
                item )}
        : {...state, cart: [...state.cart, {...newItemInCart, quantityAddedInCart: 1}]}
    }
    case TYPES.ADD_ONE_CART:{
      let product = state.products.find(item => item._id === action.payload)
      let findItem = state.cart.find(item => item._id === action.payload)
      return findItem ? {...state, cart: state.cart.map(item=>
                item._id === action.payload ? item.quantityAddedInCart<product.quantity ? 
                  {...item, quantityAddedInCart: item.quantityAddedInCart + 1} : {...item} : item)}
              : {...state}
    }
    case TYPES.REMOVE_ONE_CART:{
      let findItem = state.cart.find(item => item._id === action.payload)
      return findItem.quantityAddedInCart > 1 ?
                  {...state, cart: state.cart.map(item=>
                      item._id === action.payload ? {...item, quantityAddedInCart: item.quantityAddedInCart - 1} : item )}
              : {...state, cart: state.cart.filter(item => item._id !== action.payload)}
    }
    case TYPES.REMOVE_ITEM_CART:{
      let newCart = state.cart.filter(item=> item._id!==action.payload)
      return {...state, cart: newCart}
    }
    case TYPES.RESET_CART:{
      return {...state, cart: []}
    }
    default:
      return state
  }
}

/* switch(action.type){
    case TYPES.ADD_PRODUCTS:{
      return {...state, products: action.payload}
    }
    case TYPES.ADD_TO_CART:{
      let newItemInCart = state.products.find(pro=> pro._id === action.payload)
      let itemRepeatedInCart = state.cart.find(pro=> pro._id === newItemInCart._id)
      return itemRepeatedInCart ?
       {...state, cart: state.cart.map(item=>
            item._id === itemRepeatedInCart._id ? itemRepeatedInCart.quantityAddedInCart<=newItemInCart.quantity ? 
                {...item, quantityAddedInCart: item.quantityAddedInCart + 1} : {...item}
                : 
                item )}
        : {...state, cart: [...state.cart, {...newItemInCart, quantityAddedInCart: 1}]}
    }
    case TYPES.ADD_ONE_CART:{
      let product = state.products.find(item => item._id === action.payload)
      let findItem = state.cart.find(item => item._id === action.payload)
      return findItem ? {...state, cart: state.cart.map(item=>
                item._id === action.payload ? findItem.quantityAddedInCart<=product.quantity ? 
                  {...item, quantityAddedInCart: item.quantityAddedInCart + 1} : {...item} : item)}
              : {...state}
    }
    case TYPES.REMOVE_ONE_CART:{
      let findItem = state.cart.find(item => item._id === action.payload)
      return findItem.quantityAddedInCart > 1 ?
                  {...state, cart: state.cart.map(item=>
                      item._id === action.payload ? {...item, quantityAddedInCart: item.quantityAddedInCart - 1} : item )}
              : {...state, cart: state.cart.filter(item => item._id !== action.payload)}
    }
    case TYPES.REMOVE_ITEM_CART:{
      let newCart = state.cart.filter(item=> item._id!==action.payload)
      return {...state, cart: newCart}
    }
    case TYPES.RESET_CART:{
      return {...state, cart: []}
    }
    default:
      return state
  } */

/* 
  switch(action.type){
    case TYPES.ADD_PRODUCTS:{
      return {...state, products: action.payload}
    }
    case TYPES.ADD_TO_CART:{
      let newItemInCart = state.products.find(pro=> pro._id === action.payload)
      let itemRepeatedInCart = state.cart.find(pro=> pro._id === newItemInCart._id)
      return itemRepeatedInCart ?
       {...state, cart: state.cart.map(item=>
            item._id === itemRepeatedInCart._id ?
                {...item, quantityAddedInCart: item.quantityAddedInCart + 1} 
                : 
                item )}
        : {...state, cart: [...state.cart, {...newItemInCart, quantityAddedInCart: 1}]}
    }
    case TYPES.ADD_ONE_CART:{
      let findItem = state.cart.find(item => item._id === action.payload)
      return findItem ? {...state, cart: state.cart.map(item=>
                item._id === action.payload ? 
                  {...item, quantityAddedInCart: item.quantityAddedInCart + 1} : item)}
              : {...state}
    }
    case TYPES.REMOVE_ONE_CART:{
      let findItem = state.cart.find(item => item._id === action.payload)
      return findItem.quantityAddedInCart > 1 ?
                  {...state, cart: state.cart.map(item=>
                      item._id === action.payload ? {...item, quantityAddedInCart: item.quantityAddedInCart - 1} : item )}
              : {...state, cart: state.cart.filter(item => item._id !== action.payload)}
    }
    case TYPES.REMOVE_ITEM_CART:{
      let newCart = state.cart.filter(item=> item._id!==action.payload)
      return {...state, cart: newCart}
    }
    case TYPES.RESET_CART:{
      return {...state, cart: []}
    }
    default:
      return state
  }
*/