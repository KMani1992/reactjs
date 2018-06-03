
import React from 'react';

const emp = (props) => {
    return (
    <tr style={{width:'50%'}}>
        <td>{props.children}</td>
        <td>{props.salary}</td>
        <td><button id={props.data} onClick={props.deleteEmp}>Delete</button></td>
    </tr>
    );

}

export default emp;