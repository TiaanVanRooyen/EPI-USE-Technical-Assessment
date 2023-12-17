import { useState } from "react";
import './TreeView.css';
import pfp from './pfp.jpg'

const TreeNode = ({node}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {setIsOpen(!isOpen)};

    return (
        <li className="tree-node">
            <span>
                <h3>{node.name}</h3>

                <img src={pfp} alt="pfp" />

                {node.children && (
                <button className="toggle-icon" onClick={toggle}>
                    {isOpen ? 'Collapse' : 'Expand'}
                </button>
            )}    
            </span>
            {isOpen && (<TreeView data={node?.children} />)}
        </li>
    );
}

const TreeView = ({data, id}) => {
    return (  
        <ul id={id} className="tree-view">
            {data.map(node => (<TreeNode key={node.id} node={node} />))}
        </ul>
    )
}
 
export default TreeView;