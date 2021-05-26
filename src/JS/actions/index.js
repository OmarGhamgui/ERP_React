import axios from "axios";
import {
  ADD_ARTICLE,
  ADD_ARTICLE_FAIL,
  ADD_ARTICLE_SUCCESS,
  ADD_CLIENT,
  ADD_FAIL,
  ADD_PRODUCT,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  ADD_SUCCESS,
  ADD_SUPPLIER,
  ADD_SUPPLIER_FAIL,
  ADD_SUPPLIER_SUCCESS,
  REMOVE_CLIENT,
  REMOVE_SUCCESS,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_ARTICLE,REMOVE_ARTICLE_SUCCESS,
  EDIT_CLIENT,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAIL
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
    const addRes = await axios.post("http://localhost:4000/clients/", newClient);
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

export const editClient = (newClient) => async (dispatch) => {
  await dispatch({
    type: EDIT_CLIENT,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const addRes = await axios.put(`http://localhost:4000/clients/${newClient._id}`, 
    {name:newClient.name,phone:newClient.phone,address:newClient.address});
    dispatch({
      type: EDIT_CLIENT_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CLIENT_FAIL,
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

// Remove an article
export const removeArticle = (Article) => async (dispatch) => {
  await dispatch({
    type: REMOVE_ARTICLE,
  });

  try {
    const removeRes = await axios.delete(
      `http://localhost:4000/article/${Article._id}`
    );

    dispatch({
      type: REMOVE_ARTICLE_SUCCESS,
      payload: removeRes.data,
    });
  } catch (error) {}
};

// Add a product

export const addProduct = (newProduct) => async (dispatch) => {
  await dispatch({
    type: ADD_PRODUCT,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const addRes = await axios.post(
      "http://localhost:4000/products",
      newProduct
    );
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error.response.data,
    });
  }
};


//remove a product
export const removeProduct = (Product) => async (dispatch) => {
  await dispatch({
    type: REMOVE_PRODUCT,
  });

  try {
    const removeRes = await axios.delete(
      `http://localhost:4000/products/${Product._id}`
    );

    dispatch({
      type: REMOVE_PRODUCT_SUCCESS,
      payload: removeRes.data,
    });
  } catch (error) {}
};

//Add article to one product







