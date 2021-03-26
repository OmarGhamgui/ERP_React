import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CIcon from "@coreui/icons-react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { addArticle } from "src/JS/actions";
// const getBadge = status => {
//     switch (status) {
//       case 'Active': return 'success'
//       case 'Inactive': return 'secondary'
//       case 'Pending': return 'warning'
//       case 'Banned': return 'danger'
//       default: return 'primary'
//     }
//   }
const fields = ["name", "ref", "category", "Menu"];

const Articles = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [ref, setRef] = useState("");
  const [category, setCategory] = useState("");
  const addNewArticle = async () => {
    await dispatch(
       addArticle({
        name:name,
        ref:ref,
        category:category,
      })
    )
    .then(setModalShow(false))
    .then(setArticleList([...articleList,{name,ref,category}]))
  };

//   const deleteHandler = async (e)=>{
//     await dispatch(removeClient(e))
//     .then(setClientList(clientList.filter((el)=>el._id !== e._id)))
//   }

  const [modalShow, setModalShow] = useState(false);
  let loading = useSelector((state) => state.clientReducer.loading);
  const [articleList, setArticleList] = useState([]);

  const fetchData = async () => {
    await axios
      .get("http://localhost:4000/articles")
      .then((res) => setArticleList(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status" className="d-flex mx-auto">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
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
                  Ajouter un client
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Nom de l'article</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nom de l'article..."
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Référence </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Référence de l'article..."
                      onChange={(e) => setRef(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Catégorie..."
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="info"
                    type="submit"
                    onClick={addNewArticle}
                  >
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
            <CCardHeader className="d-flex justify-content-between">
              <h4>Liste des articles</h4>{" "}
              <CButton
                onClick={() => setModalShow(true)}
                className="mr-5"
                color="info"
                size="md"
              >
                Ajouter un article{" "}
                <CIcon className="ml-3" size={"lg"} name={"cilUserFollow"} />
              </CButton>{" "}
            </CCardHeader>

            <CCardBody>
              <CDataTable
                items={articleList}
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
                        <button 
                        // onClick={()=>deleteHandler(item)}
                        >
                          Supprimer
                        </button>
                        <CButton className="w-25 ml-5" block color="dark" size="md">Modifier</CButton>

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

export default Articles;
