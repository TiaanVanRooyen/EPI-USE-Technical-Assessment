import { useEffect, useState } from 'react';
import './Menu.css';
import {Button, Form} from 'react-bootstrap';

const Menu = ({selectedEmployee, data}) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (event) => {
        // Get the selected value from the event
        const selected = event.target.value;
        // Update the state with the selected value

        if(selected !== 'None'){
            setSelectedValue(selected);
        }
        else{
            setSelectedValue(null);
        }
      };

    useEffect(() => {
        if (selectedEmployee.id) {
            document.getElementById('empNo').value = selectedEmployee.id;
            document.getElementById('empName').value = selectedEmployee.name;
            document.getElementById('empSurname').value = selectedEmployee.surname;
            document.getElementById('empDOB').value = selectedEmployee.DOB;
            document.getElementById('empSalary').value = selectedEmployee.Salary;
            document.getElementById('empPosition').value = selectedEmployee.Position;
            document.getElementById('empEmail').value = selectedEmployee.Email;

            if(selectedEmployee.Manager == null){
                document.getElementById('empManager').value = 'None';
            }
            else{
                document.getElementById('empManager').value = selectedEmployee.Manager
            }

            setSelectedValue(selectedEmployee.Manager)
        }
        else{
            document.getElementById('empNo').value = '';
            document.getElementById('empName').value = ''
            document.getElementById('empSurname').value = '';
            document.getElementById('empSalary').value = '';  
        }
    }, [selectedEmployee])

    async function handleDelete(){
        const empNo = document.getElementById('empNo').value;
        const res = await fetch('https://epi-use-technical-assessment-api.onrender.com/api/employeeData/' + empNo, {method : 'delete'});
        const message = await res.json();

        if (res.status === 200){
            alert(message.Message);
            window.location.reload(false);
        }else{
            alert(message.Error);
        }
        
    }

    async function handleSubmit(){
        const empNo = document.getElementById('empNo').value;
        const empName = document.getElementById('empName').value;
        const empSurname = document.getElementById('empSurname').value;
        const empDOB = document.getElementById('empDOB').value;
        const empSalary = document.getElementById('empSalary').value;
        const empPosition = document.getElementById('empPosition').value;
        const empEmail = document.getElementById('empEmail').value;
        const empManager = selectedValue;

        const newEmployee = {
            _id : empNo,
            name : empName,
            surname : empSurname,
            DOB : empDOB,
            Salary : empSalary,
            Position : empPosition,
            Email : empEmail,
            Manager : empManager
        }

        let res;

        if (selectedEmployee.id){
            res = await fetch('https://epi-use-technical-assessment-api.onrender.com/api/employeeData/' + empNo, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(newEmployee)
            });
        }
        else{
            res = await fetch('https://epi-use-technical-assessment-api.onrender.com/api/employeeData', {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(newEmployee)
            });
        }

        const message = await res.json();

        if (res.status === 200){
            alert(message.Message);
            window.location.reload(false);
        }else{
            alert(message.Error);
        }
    }
    
    return ( 
        <div className='menu'>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>Employee Number</Form.Label>
                {selectedEmployee.id ?
                    <Form.Control id="empNo" type="text" placeholder="Enter employee number:" disabled/>
                :
                    <Form.Control id="empNo" type="text" placeholder="Enter employee number:"/>
            }
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Employee First Name</Form.Label>
                <Form.Control id="empName" type="text" placeholder="Enter employee first name:" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Employee Surname</Form.Label>
                <Form.Control id="empSurname" type="text" placeholder="Enter employee surname:" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Employee Date of Birth</Form.Label>
                <Form.Control id="empDOB" type="date" max='2005-12-31' defaultValue={'2005-01-01'}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Employee Salary (Monthly)</Form.Label>
                <Form.Control id="empSalary" type="Number" min='2000' placeholder="Enter employee salary:" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Employee Position</Form.Label>
                {selectedEmployee.id ? (
                    <Form.Select id="empPosition" aria-label="Default select example" defaultValue={selectedEmployee.Position}>
                        <option value="Chief Executive Officer">Chief Executive Officer</option>
                        <option value="Chief Financial Officer">Chief Financial Officer</option>
                        <option value="Chief Technology Officer">Chief Technology Officer</option>
                        <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                        <option value="Chief Operating Officer<">Chief Operating Officer</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Customer Service Representative">Customer Service Representative</option>
                        <option value="Human Resource Manager">Human Resource Manager</option>
                        <option value="Executive Assistant">Executive Assistant</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Sales Representative">Sales Representative</option>
                        <option value="Product Owner">Product Owner</option>
                        <option value="Scrum Master">Scrum Master</option>
                        <option value="Senior Software Developer">Senior Software Developer</option>
                        <option value="Junior Software Developer">Junior Software Developer</option>
                        <option value="Intern">Intern</option>
                    </Form.Select>                    
                )
                :
                (
                    <Form.Select defaultValue={'Senior Software Developer'} id="empPosition" aria-label="Default select example">
                        <option value="Chief Executive Officer">Chief Executive Officer</option>
                        <option value="Chief Financial Officer">Chief Financial Officer</option>
                        <option value="Chief Technology Officer">Chief Technology Officer</option>
                        <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                        <option value="Chief Operating Officer<">Chief Operating Officer</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Customer Service Representative">Customer Service Representative</option>
                        <option value="Human Resource Manager">Human Resource Manager</option>
                        <option value="Executive Assistant">Executive Assistant</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Sales Representative">Sales Representative</option>
                        <option value="Product Owner">Product Owner</option>
                        <option value="Scrum Master">Scrum Master</option>
                        <option value="Senior Software Developer">Senior Software Developer</option>
                        <option value="Junior Software Developer">Junior Software Developer</option>
                        <option value="Intern">Intern</option>
                    </Form.Select>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Employee Email</Form.Label>
                <Form.Control id="empEmail" type="email" placeholder="Enter employee email:" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Employee Manager</Form.Label>
                {selectedEmployee.id ? (
                    <Form.Select id="empManager" aria-label="Default select example" onChange={handleChange} >
                    <option value='None'>None</option>
                    {data !== [] &&
                        data.map(item => 
                            item._id !== selectedEmployee.id &&
                            (<option value={item._id}>{item.name + ' ' + item.surname + ' (' + item._id + ')'}</option>)
                        )
                    }
                    </Form.Select>
                ) 
                : 
                (
                <Form.Select id="empManager" aria-label="Default select example" onChange={handleChange} defaultValue='None'>
                    {selectedEmployee.Manager === null ? selectedEmployee.Manager : 'None'}
                    <option value='None'>None</option>
                    {data !== [] &&
                        data.map(item => 
                            (<option value={item._id}>{item.name + ' ' + item.surname + ' (' + item._id + ')'}</option>)
                        )
                    }
                </Form.Select>
                )}

            </Form.Group>

            <Button onClick={() => {handleSubmit()}} variant="primary">
                Submit
            </Button>

            {selectedEmployee.id ? (<Button variant='danger' onClick={() => {handleDelete()}}>Delete</Button>) : (<></>)}

            </Form>

        </div>
     );
}
 
export default Menu;