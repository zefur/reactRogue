import React,{useRef,useEffect,useState} from 'react';
import InputManager from './InputManager'

import World from './World.js'
import Spawner from './Spawner.js'

const ReactRogue = ({width, height, tilesize}) =>{
const canvasRef = useRef() 
    let inputManager = new InputManager()
    //const [player, setPlayer] = useState(new Player(1,1,tilesize))
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
return (<>
<canvas 
ref = {canvasRef}
width={width * tilesize} 
height={height* tilesize} 
style={{border: '1px solid',backgroundColor: 'dimgrey'}}
>

</canvas>)
<ul>{world.player.inventory.map((item,index)=>(<li key={index}>{item.attributes.name}</li>))}
</ul>

<ul>{world.history.map((item,index)=>(<li key={index}>{item}</li>))}
</ul>
</>)
}

export default ReactRogue 