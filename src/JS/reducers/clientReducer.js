import { ADD_CLIENT, ADD_FAIL, ADD_SUCCESS, REMOVE_CLIENT, REMOVE_SUCCESS } from "../constants/actions-types";
import cogoToast from "cogo-toast"

const initialState = {
  client: null,
  loading: false,
  errors: null,
} 
  
  const clientReducer = (state = initialState, { type,payload}) => {
    switch (type) {
      case ADD_CLIENT:
        return {
          ...state,
          loading: true,
        };
      case ADD_SUCCESS:
        cogoToast.success("client ajouté");
        return {
          ...state,
          loading: false,
          client: payload,
        };
      case ADD_FAIL:
        cogoToast.error("erreur .. vérifier les données");
        return {
          ...state,
          loading: false,
          errors: payload.data,
        }
        case REMOVE_CLIENT:   
        return {
          ...state,
          loading:true
        }
        case REMOVE_SUCCESS: 
        cogoToast.success("client supprimé");
        return{
          ...state,
          loading:false,
          client:payload.data
        }
      default:
        return state;
    }
  }
  
  export default clientReducer;