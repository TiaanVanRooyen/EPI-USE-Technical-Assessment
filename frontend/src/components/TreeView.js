import './TreeView.css';
import Gravatar from 'react-gravatar';

const TreeNode = ({node, handleClick}) => {
    return (
        <li className="tree-node">
            <span onClick={() => {handleClick(node)}}>
                {node.id}
                <h3>{node.name + ' ' + node.surname}</h3>

                <Gravatar className='pfp' email={node.Email} />

                <p>{'(' + node.Position + ')'}</p>
            </span>
            {node.children && (<TreeView data={node?.children} handleClick={handleClick} />)}
        </li>
    );
}

const TreeView = ({data, id, handleClick}) => {
    return (  
        <ul id={id} className="tree-view">
            {data.map(node => (<TreeNode key={node.id} handleClick={handleClick} node={node} />))}
            
        </ul>
    )
}
 
export default TreeView;