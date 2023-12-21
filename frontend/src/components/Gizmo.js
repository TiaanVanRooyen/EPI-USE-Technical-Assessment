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
        if(scale > 0.2){
            scale -= 0.1
            document.getElementById('parent-tree').style.transform = 'scale('+ scale + ')';
        }
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
            <div className='top'>
                <button onClick={moveUp}>&#11165;</button>
            </div>
            <div className='mid'>
                <button onClick={moveLeft}>&#11164;</button>
                <div className='zoom'>
                    <button onClick={zoomIn}>+</button>
                    <button onClick={zoomOut}>-</button>
                </div>
                <button onClick={moveRight}>&#11166;</button>
            </div>
            <div className='bottom'>
                <button onClick={moveDown}>&#11167;</button>
            </div>
    </div>
     );
}

export default Gizmo;