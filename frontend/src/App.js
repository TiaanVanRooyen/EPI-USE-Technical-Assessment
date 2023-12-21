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
      let res = await fetch('/api/employeeData/tree');
      let data = await res.json();
      await setTreeData(data);

      res = await fetch('/api/employeeData');
      data = await res.json();
      await setData(data);
    }

    getData();
  }, [])

  return (
    <div className="App">
      <div className='title-bar'>
        <h1>Employee hierarchy</h1>
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
