import { ADD_PRODUCT, ADD_PRODUCT_FAIL, ADD_PRODUCT_SUCCESS } from "../constants/actions-types";
import cogoToast from "cogo-toast"

const initialState = {
  product: null,
  loading: false,
  errors: null,
} 
  
  const productReducer = (state = initialState, { type,payload}) => {
    switch (type) {
      case ADD_PRODUCT:
        return {
          ...state,
          loading: true,
        };
      case ADD_PRODUCT_SUCCESS:
        cogoToast.success("client ajouté");
        return {
          ...state,
          loading: false,
          client: payload,
        };
      case ADD_PRODUCT_FAIL:
        cogoToast.error("erreur .. vérifier les données");
        return {
          ...state,
          loading: false,
          errors: payload.data,
        }
        
      default:
        return state;
    }
  }
  
  export default productReducer;