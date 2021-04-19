import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, name: "Buenos Aires"},
  { id: 2, name: "Cordoba"},
  { id: 3, name: "Misiones"}
];

class App extends React.Component {  
  state = {
    data: data,
    modalUpdate: false,
    modalInsert: false,
    form: {
      id: "",
      name: ""
    },
  };

  showUpdateModal = (dato) => {
    this.setState({
      form: dato,
      modalUpdate: true,
    });
  };

  hideUpdateModal = () => {
    this.setState({ modalUpdate: false });
  };

  showInsertModal = () => {
    this.setState({
      modalInsert: true,
    });
  };

  hideInsertMdal = () => {
    this.setState({ modalInsert: false });
  };

  edit = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].name = dato.name;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalUpdate: false });
  };

  delete = (dato) => {
    var opcion = window.confirm("¿Estás Seguro que deseas eliminar la provincia "+dato.name+"?" );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalUpdate: false });
    }
  };

  insert = () => {
    var valorNuevo = {...this.state.form};
    valorNuevo.id = this.state.data.length+1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsert: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.showInsertModal()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Provincia</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.name}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.showUpdateModal(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.delete(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={this.state.modalUpdate}>
          <ModalHeader>
           <div><h3>Editar Provincia</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.edit(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.hideUpdateModal()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader>
           <div><h3>Insertar Provincia</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Provincia: 
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insert()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.hideInsertMdal()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        
      </>
    );
   
  }      
  
}

export default App;