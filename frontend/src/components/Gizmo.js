import './Gizmo.css';

const Gizmo = () => {

    let scale = 1;
    let x = 0;
    let y = 0;
    
    function zoomIn(){
        scale += 0.1;
        document.getElementById('parent-tree').style.transform = 'scale('+ scale + ')';
    }
    
    function zoomOut(){
        scale -= 0.1
        document.getElementById('parent-tree').style.transform = 'scale('+ scale + ')';
    }
    
    function moveLeft(){
        x += 20;
        document.getElementById('moveX').style.transform = 'translateX(' + x + 'px)';
    }
    
    function moveRight(){
        x -= 20;
        document.getElementById('moveX').style.transform = 'translateX(' + x + 'px)';
    }
    
    function moveUp(){
        y += 20;
        document.getElementById('moveY').style.transform = 'translateY(' + y + 'px)';
    }
    
    function moveDown(){
        y -= 20;
        document.getElementById('moveY').style.transform = 'translateY(' + y + 'px)';
    }

    return ( 
        <div className='gizmo'>
        <button onClick={zoomIn}>Zoom in</button>
        <button onClick={zoomOut}>Zoom out</button>
        <button onClick={moveLeft}>Left</button>
        <button onClick={moveRight}>Right</button>
        <button onClick={moveUp}>Up</button>
        <button onClick={moveDown}>Down</button>
    </div>
     );
}

export default Gizmo;