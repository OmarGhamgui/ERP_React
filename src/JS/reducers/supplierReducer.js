import { ADD_SUPPLIER, REMOVE_SUPPLIER, ADD_SUPPLIER_SUCCESS, ADD_SUPPLIER_FAIL, REMOVE_SUPPLIER_SUCCESS } from "../constants/actions-types";
import cogoToast from "cogo-toast"

const initialState = {
  supplier: null,
  loading: false,
  errors: null,
} 
  
  const supplierReducer = (state = initialState, { type,payload}) => {
    switch (type) {
      case ADD_SUPPLIER:
        return {
          ...state,
          loading: true,
        };
      case ADD_SUPPLIER_SUCCESS:
        cogoToast.success("Fournisseur ajouté");
        return {
          ...state,
          loading: false,
          supplier: payload,
        };
      case ADD_SUPPLIER_FAIL:
        cogoToast.error("erreur .. vérifier les données");
        return {
          ...state,
          loading: false,
          errors: payload,
        }
        case REMOVE_SUPPLIER:   
        return {
          ...state,
          loading:true
        }
        case REMOVE_SUPPLIER_SUCCESS: 
        cogoToast.success("Fournisseur supprimé");
        return{
          ...state,
          loading:false,
          supplier:payload
        }
      default:
        return state;
    }
  }
  
  export default supplierReducer;