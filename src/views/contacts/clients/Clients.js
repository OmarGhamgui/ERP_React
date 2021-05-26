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
import { addClient, editClient, removeClient } from "src/JS/actions";
import CIcon from "@coreui/icons-react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const fields = ["name", "phone", "address", "Menu"];

const Clients = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const addNewClient = async () => {
    await dispatch(
      addClient({
        name: name,
        phone: phone,
        address: address,
      })
    )
    .then(setModalShow(false))
    .then(setClientList([...clientList, { name, phone, address }]));
  };

  function findArrayElementById(array, id) {
    return array.find((element) => {
      return element._id === id;
    })
  }

  const modifyClient = async () => { 
    var index = clientList.indexOf(findArrayElementById(clientList, currentId));
    await dispatch(
      editClient({
        _id: currentId,
        name: name,
        phone: phone,
        address: address,
      })
    )
    .then(setModalShowEdit(false))
    .then(clientList[index]={
      _id: currentId,
      name: name,
      phone: phone,
      address: address,
    })
  };

  const [currentId, setCurrentId] = useState("");

  const editHandler = async (e) => {
    await setCurrentId(e._id);
    console.log(e._id);
    setModalShowEdit(true);
  };

  const deleteHandler = async (e) => {
    await dispatch(removeClient(e)).then(
      setClientList(clientList.filter((el) => el._id !== e._id))
    );
  };

  const [modalShow, setModalShow] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);

  let loading = useSelector((state) => state.clientReducer.loading);
  const [clientList, setClientList] = useState([]);

  const fetchData = async () => {
    await axios
      .get("http://localhost:4000/clients")
      .then((res) => setClientList(res.data));
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
                    <Form.Label>Nom et Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entrer le nom"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Numéro mobile</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entrer le numéro"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entrer l'adresse"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="info" type="submit" onClick={addNewClient}>
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={modalShowEdit}
              onHide={() => setModalShow(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Modifier un client
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Nom et Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entrer le nom"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Numéro mobile</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entrer le numéro"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entrer l'adresse"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="info" type="submit" onClick={modifyClient}>
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setModalShowEdit(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
            <CCardHeader className="d-flex justify-content-between">
              <h4>Liste des clients</h4>{" "}
              <CButton
                onClick={() => setModalShow(true)}
                className="mr-5"
                color="info"
                size="md"
              >
                Ajouter un client{" "}
                <CIcon className="ml-3" size={"lg"} name={"cilUserFollow"} />
              </CButton>{" "}
            </CCardHeader>

            <CCardBody>
              <CDataTable
                items={clientList}
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
                          onClick={() => editHandler(item)}
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

export default Clients;
