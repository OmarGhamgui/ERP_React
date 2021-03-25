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
import { useDispatch } from "react-redux";
import { addClient, removeClient } from "src/JS/actions";
import CIcon from "@coreui/icons-react";
import { Modal, Button, Form } from "react-bootstrap";
// const getBadge = status => {
//     switch (status) {
//       case 'Active': return 'success'
//       case 'Inactive': return 'secondary'
//       case 'Pending': return 'warning'
//       case 'Banned': return 'danger'
//       default: return 'primary'
//     }
//   }
const fields = ["name", "phone", "address", "Menu"];

const Clients = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const addNewClient = async () => {
    await dispatch(
      addClient({
        name:name,
        phone:phone,
        address:address,
      })
    )
    .then(setModalShow(false))
    // .then(setClientList([]))
    // .then(fetchData())
  };

  const [modalShow, setModalShow] = useState(false);
  const [clientList, setClientList] = useState([]);

  const fetchData = async () => {
    await axios
      .get("http://localhost:4000")
      .then((res) => setClientList(res.data));
  };

  useEffect(() => {
    fetchData();
  });

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
                      placeholder="Entrez le nom"
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
                      placeholder="Entrez le numéro"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Entrez l'adresse"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="info"
                    type="submit"
                    onClick={addNewClient}
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
                      <div>
                        <button onClick={() => dispatch(removeClient(item))}>
                          Supprimer
                        </button>
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
