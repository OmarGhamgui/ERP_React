import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "src/JS/actions";

const Sales = () => {
  const fields = ["name", "ref", "usedArticles", "Menu"];

  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState();
  const [ref, setRef] = useState();
  const [articles, setArticles] = useState([]);
  const [articlesProduct, setArticlesProduct] = useState([]);
  const [articleInput, setArticleInput] = useState();
  const [productList, setProductList] = useState([]);

  const addNewProduct = async () => {
    await dispatch(
      addProduct({
        name,
        ref,
        usedArticles:articlesProduct,
      })
    )
      .then(setModalShow(false))
      .then(setProductList([...productList, { name, ref, usedArticles:articlesProduct }]))
      .then(setArticlesProduct([]));
  };

  const deleteHandler = async (e) => {
    await dispatch(removeProduct(e)).then(
      setProductList(productList.filter((el) => el._id !== e._id))
    );
  };

  useEffect(() => {
    fetchArticles();
    fetchProducts();
    // console.log(usedArticles)
  }, []);

  const fetchArticles = async () => {
    await axios
      .get("http://localhost:4000/articles")
      .then((res) => {
        const items = res.data;
        items.map((item) =>
          articles.push({ key: item._id, value: item.ref, text: item.name })
        );
      })
      .then(console.log(articles));
  };

  const fetchProducts = async () => {
    await axios
      .get("http://localhost:4000/products")
      .then((res) => setProductList(res.data));
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Ajouter un produit
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Nom du produit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nom du produit"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Référence du produit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Référence du produit"
                      onChange={(e) => setRef(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Articles utilisés</Form.Label>
                    <Dropdown
                      placeholder="Select Country"
                      fluid
                      search
                      selection
                      options={articles}
                      onChange={(e) => setArticleInput(e.target.outerText)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="mr-5">Quantité</Form.Label>
                    {/* <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="50"
                    /> */}
                    <CButton
                      key="1"
                      color="info"
                      size="md"
                      className="m-2"
                      onClick={ () =>
                        setArticlesProduct([...articlesProduct, articleInput])
                      }
                    >
                      Ajouter
                    </CButton>
                  </Form.Group>
                  <Form.Group>
                    <div>
                      {articlesProduct &&
                        articlesProduct.map((item, i) => (
                          <div key={i}> {item} </div>
                        ))}
                    </div>
                  </Form.Group>
                  <Button variant="info" type="submit" onClick={addNewProduct}>
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
            <CCardHeader className="d-flex justify-content-between">
              <h4>Liste des produits</h4>{" "}
              <CButton
                onClick={() => setModalShow(true)}
                className="mr-5"
                color="info"
                size="md"
              >
                Ajouter un produit{" "}
                <CIcon className="ml-3" size={"lg"} name={"cilUserFollow"} />
              </CButton>{" "}
            </CCardHeader>

            <CCardBody>
              <CDataTable
                items={productList}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  Menu: (item) => (
                    <td>
                      <div className="d-flex">
                        <button onClick={() => deleteHandler(item)}>
                          Supprimer
                        </button>
                        <CButton
                          className="w-25 ml-5"
                          block
                          color="dark"
                          size="md"
                        >
                          Modifier
                        </CButton>
                      </div>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Sales;
