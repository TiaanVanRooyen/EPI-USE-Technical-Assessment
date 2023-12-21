import {useState, useEffect} from 'react';
import './App.css';
import TreeView from './components/TreeView';
import Gizmo from './components/Gizmo';
import Menu from './components/Menu';

function App() {
  const [treeData, setTreeData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  function handleClick(emp){
    setSelectedEmployee(emp);
  }

  useEffect(() => {
    async function getData(){
      try {
        let res = await fetch('https://epi-use-technical-assessment-api.onrender.com/api/employeeData/tree');
        let data = await res.json();
        await setTreeData(data);
  
        res = await fetch('https://epi-use-technical-assessment-api.onrender.com/api/employeeData');
        data = await res.json();
        await setData(data);
      } catch (error) {
        alert(error);
      }
    }

    getData();
  }, [])

  return (
    <div className="App">
      <div className='title-bar'>
        <h1>Employee Hierarchy</h1>
      </div>
      <div className='tree'>
        <div className='move' id='moveX'>
          <div className='move' id='moveY'>
            { data !== [] ? (<TreeView handleClick={handleClick} id='parent-tree' data={treeData} />) : (<></>) }
          </div>
        </div>
      </div>
      <Gizmo />
      <Menu selectedEmployee={selectedEmployee} data={data}/>
      <button className='add-button' onClick={() => {setSelectedEmployee({})}}>+</button>
    </div>
    
  );
}

export default App;
