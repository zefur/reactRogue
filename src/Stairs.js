import Entity from './Entity.js'
import Spawner from './Spawner.js'

class Stairs extends Entity {
    attributes = {
        name: 'Stairs',
        color: 'Black',
        ascii: '>',
        offset: {x:2,y:2},
        
    }
    action(verb,world){
        if(verb === 'bump'){
            world.addToHistory("You teleport to the next floor...")
            world.createCellularMap()
            world.player.x = 0
            world.player.y = 0
            world.moveToSpace(world.player)
            world.entities = world.entities.filter(e=> e === world.player)
            let spawner = new Spawner(world)
            spawner.spawnLoot(10)
            spawner.spawnMonsters(7+ world.floor)
            if (world.floor> 0 && (world.floor+1)%3 ===0){
                world.levelUpMonsters()
            }
            spawner.spawnStairs()
            
            console.log(this.attributes)
        }else {
            world.addToHistory("There are still monsters here please eliminate")
        }
    }
}
export default Stairs