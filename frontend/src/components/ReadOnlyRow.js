import React from 'react'
import { Button } from 'reactstrap';

function ReadOnlyRow({item, handleEditClick, handleDeleteClick}) {
  return (
    <tr style={{cursor:'pointer'}} onClick={(event) => handleEditClick(event,item)} key={item.id}>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.gender}</td>
    <td>{item.phone}</td>
    <td>
        <Button
         color="danger"
         type="button"
         onClick={() => handleDeleteClick(item.id)}>
          Delete
        </Button>
    </td>
  </tr>
  )
}

export default ReadOnlyRow