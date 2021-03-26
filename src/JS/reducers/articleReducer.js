import { ADD_ARTICLE,ADD_ARTICLE_SUCCESS , ADD_ARTICLE_FAIL } from "../constants/actions-types";

import cogoToast from "cogo-toast"

const initialState = {
  article: null,
  loading: false,
  errors: null,
} 
  
  const articleReducer = (state = initialState, { type,payload}) => {
    switch (type) {
      case ADD_ARTICLE:
        return {
          ...state,
          loading: true,
        };
      case ADD_ARTICLE_SUCCESS:
        cogoToast.success("client ajouté");
        return {
          ...state,
          loading: false,
          client: payload,
        };
      case ADD_ARTICLE_FAIL :
        cogoToast.error("erreur .. vérifier les données");
        return {
          ...state,
          loading: false,
          errors: payload.data,
        }
        // case REMOVE_CLIENT:   
        // return {
        //   ...state,
        //   loading:true
        // }
        // case REMOVE_SUCCESS: 
        // cogoToast.success("client supprimé");
        // return{
        //   ...state,
        //   loading:false,
        //   client:payload.data
        // }
      default:
        return state;
    }
  }
  
  export default articleReducer;