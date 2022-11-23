
import { Button, Input } from 'reactstrap';

const EditableRow = ({editFormData,handleEditFormChange}) => {


  return (
      <>
        <Input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name || ""}
          onChange={handleEditFormChange}
        ></Input>
        <Input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email || ""}
          onChange={handleEditFormChange}
        ></Input>

        <Input
          className="mb-3"
          type="select"
          name="gender"
          onChange={handleEditFormChange}
          required="required"
          value={editFormData.gender || ""}
        >
       <option value="Male">Male</option>
       <option value="Female">Female</option>
      </Input>

        <Input
          type="text"
          required="required"
          placeholder="Enter a phone phone..."
          name="phone"
          value={editFormData.phone || ""}
          onChange={handleEditFormChange}
        ></Input>

      <Button color="primary" type='submit' >
            Add
          </Button>{' '}
          <Button color="secondary" >
            Cancel
          </Button>
        </>
  );
};

export default EditableRow;