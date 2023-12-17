import {useState, useEffect} from 'react';
import './App.css';
import TreeView from './components/TreeView';
import Gizmo from './components/Gizmo';

const dummyData = [
  {
      id : '1',
      name : 'John Doe',
      children : [
          {
              id : 2,
              name : 'Jane Doe',
              children : [
                  {
                      id : 3,
                      name : 'Tammy White'
                  },
                  {
                    id : 6,
                    name : 'Emily Johnson'
                  },
                  {
                    id : 7,
                    name : 'Yusuf Abdul'
                  },
                  {
                    id : 10,
                    name : 'Mike Bond',
                    children : [
                      {
                        id : 11,
                        name : 'Emily Jakes'
                      },
                      {
                        id : 12,
                        name : 'Jamie Henderson'
                      }
                    ]
                  }
              ]
          },

          {
              id : 4,
              name : 'Jake Patterson'
          }
      ]
  },
  {
      id : 5,
      name : 'Emilio Brasi',
      children : [
        {
          id : 8,
          name : 'Francisco Corleone'
        },

        {
          id : 9,
          name : 'Seraphina Corleone'
        }
      ]
  }
];

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dummyData);
  }, [])

  console.log(data);

  return (
    <div className="App">
      <div className='title-bar'>
        <h1>Employee hierarchy</h1>
      </div>
      <div className='tree'>
        <div className='move' id='moveX'>
          <div className='move' id='moveY'>
            <TreeView id='parent-tree' data={data}/>
          </div>
        </div>
      </div>
      <Gizmo />
      <div className='menu'>

      </div>
    </div>
  );
}

export default App;
