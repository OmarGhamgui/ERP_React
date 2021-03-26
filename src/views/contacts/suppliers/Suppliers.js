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
import { addSupplier } from "../../../JS/actions";
// const getBadge = status => {
//     switch (status) {
//       case 'Active': return 'success'
//       case 'Inactive': return 'secondary'
//       case 'Pending': return 'warning'
//       case 'Banned': return 'danger'
//       default: return 'primary'
//     }
//   }
const fields = ["name", "email", "phone", "address", "Menu"];

const Suppliers = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const addNewSupplier = async () => {
    await dispatch(
      addSupplier({
        name: name,
        email: email,
        phone: phone,
        address: address,
      })
    )
      .then(setSupplierList([...supplierList, { name, email, phone, address }]))
      .then(setModalShow(false));
  };

  const [modalShow, setModalShow] = useState(false);
  const loading = useSelector((state) => state.clientReducer.loading);
  const [supplierList, setSupplierList] = useState([]);

  const fetchData = async () => {

    await axios
      .get("http://localhost:4000/suppliers")
      .then((res) => setSupplierList(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);



  if (loading) {
    return <Spinner animation="border" role="status"  className='d-flex mx-auto'>
    <span className="sr-only">Loading...</span>
  </Spinner>;
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
                  Ajouter un Fournisseur
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Entrer le mail"
                      onChange={(e) => setEmail(e.target.value)}
                    />
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

                  <Button variant="info" type="submit" onClick={addNewSupplier}>
                    Ajouter
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
            <CCardHeader className="d-flex justify-content-between">
              <h4>Liste des Fournisseurs</h4>{" "}
              <CButton
                onClick={() => setModalShow(true)}
                className="mr-5"
                color="info"
                size="md"
              >
                Ajouter un fournisseur{" "}
                <CIcon className="ml-3" size={"lg"} name={"cilUserFollow"} />
              </CButton>{" "}
            </CCardHeader>

            <CCardBody>
              <CDataTable
                items={supplierList}
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
                        <button>Supprimer</button>
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

export default Suppliers;
