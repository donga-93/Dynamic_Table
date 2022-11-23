import  { useState ,  useEffect } from 'react';
import {nanoid} from 'nanoid';
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';
import { Input } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Table() {
  const [items, setItems] = useState([]);
  const [gender, setGender] = useState('Female');
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [addFormData, setAddFormData] = useState({
    name:'',
    email:'',
    gender:'',
    phone:'',
  });

  const [editFormData, setEditFormData] = useState({
    name:'',
    email:'',
    gender:'',
    phone:'',
  });

  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch('/items');
      const fetchedItems = await response.json(response);
      setItems(fetchedItems);
    }
    fetchItems();
  }, []);

  console.log(items);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };


  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: nanoid(),
      name: addFormData.name,
      email: addFormData.email,
      gender: addFormData.gender,
      phone: addFormData.phone
    };

    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedItem = {
      id: editItemId,
      name: editFormData.name,
      email: editFormData.email,
      gender: editFormData.gender,
      phone: editFormData.phone
    };

    const newItems = [...items];

    const index = items.findIndex((item) => item.id === editItemId);

    newItems[index] = editedItem;

    setItems(newItems);
    setEditItemId(null);
  };

  const handleEditClick = (event,item) => {
    event.preventDefault();
    setEditItemId(item.id);

    const formValues = {
      name: item.name,
      email: item.email,
      gender: item.gender,
      phone: item.phone
    }
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditItemId(null);
  };

  const handleDeleteClick = (editItemId) => {
    const newItems = [...items];

    const index = items.findIndex((item) => item.id === editItemId);

    newItems.splice(index, 1);

    setItems(newItems);
  };


  return (
    <>
      <div>
      <Button color="success" onClick={toggle}>
        Create Item
      </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <h2>Add a Item</h2>
      <form onSubmit={handleAddFormSubmit}>
        <Input
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <Input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
     <Input
      className="mb-3"
      type="select"
       name="gender"
       onChange={handleAddFormChange}
       defaultValue={gender}
       required="required"
     >
       <option value="Male">Male</option>
       <option value="Female">Female</option>
     </Input>
        <Input
          type="text"
          name="phone"
          required="required"
          placeholder="Enter an phone..."
          onChange={handleAddFormChange}
        />
        <ModalFooter>
          <Button color="primary" type='submit' onClick={toggle}>
            Add
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
        </ModalBody>
      </Modal>
    </div>
      
      
    <form onSubmit={handleEditFormSubmit}>
    <table className='table table-success table-striped'>
     <thead>
      <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Actions</th>
      </tr>
    </thead>
    <tbody>
     {items.map((item) => (
        <>
        {editItemId === item.id ? (
          <EditableRow 
          editFormData={editFormData} 
          handleEditFormChange={handleEditFormChange} 
          handleCancelClick={handleCancelClick}        
        />  
        ) : (
            <ReadOnlyRow 
            item={item} 
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            />
        )}
        </>
     ))}
     </tbody>
  </table>
  </form>


  
  </>
  )
}

export default Table
