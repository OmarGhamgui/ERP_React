import axios from "axios";
import {
  ADD_ARTICLE,
  ADD_ARTICLE_FAIL,
  ADD_ARTICLE_SUCCESS,
  ADD_CLIENT,
  ADD_FAIL,
  ADD_SUCCESS,
  ADD_SUPPLIER,
  ADD_SUPPLIER_FAIL,
  ADD_SUPPLIER_SUCCESS,
  REMOVE_CLIENT,
  REMOVE_SUCCESS,
} from "../constants/actions-types";

export const removeClient = (Client) => async (dispatch) => {
  await dispatch({
    type: REMOVE_CLIENT,
  });

  try {
    const removeRes = await axios.delete(
      `http://localhost:4000/clients/${Client._id}`
    );

    dispatch({
      type: REMOVE_SUCCESS,
      payload: removeRes.data,
    });
  } catch (error) {}
};

export const addClient = (newClient) => async (dispatch) => {
  await dispatch({
    type: ADD_CLIENT,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const addRes = await axios.post("http://localhost:4000/clients", newClient);
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
};

// SUPPLIER

export const addSupplier = (newSupplier) => async (dispatch) => {
  await dispatch({
    type: ADD_SUPPLIER,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const addRes = await axios.post(
      "http://localhost:4000/suppliers",
      newSupplier
    );
    dispatch({
      type: ADD_SUPPLIER_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_SUPPLIER_FAIL,
      payload: error.response.data,
    });
  }
};

// ARTICLE

export const addArticle = (newArticle) => async (dispatch) => {
  await dispatch({
    type: ADD_ARTICLE,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const addRes = await axios.post(
      "http://localhost:4000/articles",
      newArticle
    );
    dispatch({
      type: ADD_ARTICLE_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ARTICLE_FAIL,
      payload: error.response.data,
    });
  }
};

