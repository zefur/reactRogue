import React,{useRef,useEffect,useState} from 'react';
import InputManager from './InputManager'

import World from './World.js'
import Spawner from './Spawner.js'

const ReactRogue = ({width, height, tilesize}) =>{
const canvasRef = useRef() 
    let inputManager = new InputManager()
    
    const [world,setWorld ] = useState(new World(width, height, tilesize))
    
    const handleInput = (action ,data) => {
        let newWorld = new World()
        Object.assign(newWorld, world )
        newWorld.movePlayer(data.x,data.y)
        setWorld(newWorld)
    }
    
    useEffect(() =>{
        inputManager.bindKeys();
        inputManager.subscribe(handleInput)
        
        return () => {
            inputManager.unbindKeys()
            inputManager.unsubscribe(handleInput)
        }
    })
   
    useEffect(()=>{
        let newWorld = new World()
        Object.assign(newWorld, world )
        newWorld.createCellularMap()
        newWorld.moveToSpace(world.player)
        let spawner = new Spawner(newWorld)
        spawner.spawnLoot(12)
        spawner.spawnMonsters(7)
        spawner.spawnStairs()
        setWorld(newWorld)
        // eslint-disable-next-line 
    },[])
    useEffect(() =>{
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0,0,width*tilesize,height*tilesize)
    world.draw(ctx)
    

    })
    

    function handleUse(e){
        e = e.target.value
        

        world.useItem(e)
        
    }
return (<>
<canvas 
ref = {canvasRef}
width={width * tilesize} 
height={height* tilesize} 
style={{border: '1px solid',backgroundColor: 'dimgrey'}}
>

</canvas>)
<p>{world.floor}</p>
<ul>{world.player.inventory.map((item,index)=>(<li key={index}>{item.attributes.name}<button value={index}  onClick={handleUse}>use</button><button>drop</button></li>))}
</ul>

<ul>{world.history.map((item,index)=>(<li key={index}>{item}</li>))}
</ul>
</>)
}

export default ReactRogue 