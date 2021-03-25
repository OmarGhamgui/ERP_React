import axios from "axios";
import { ADD_CLIENT, ADD_FAIL, ADD_SUCCESS, REMOVE_CLIENT, REMOVE_SUCCESS } from "../constants/actions-types";
export const removeClient = (Client) => async (dispatch) => {
  await getConfirmation();
  async function getConfirmation() {
    let retVal = window.confirm("Do you want to continue ?");
    if (retVal === true) {
      dispatch({
        type: REMOVE_CLIENT,
      });

      try {
        const removeRes = await axios.delete(
          `http://localhost:4000/${Client._id}`
        );
        dispatch({
          type: REMOVE_SUCCESS,
          payload: removeRes.data,
        });
        return true;
      } catch (error) {}
    }
  }
};

export const addClient = (newClient) => async (dispatch)=> {
  await dispatch({
    type: ADD_CLIENT,
  })
  try {
    const addRes = await axios.post("http://localhost:4000/", newClient);
    dispatch({
      type: ADD_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_FAIL,
      payload: error.response.data,
    });
  }

}
