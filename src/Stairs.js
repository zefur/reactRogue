import Entity from './Entity.js'
import Spawner from './Spawner.js'

class Stairs extends Entity {
    attributes = {
        name: 'Stairs',
        color: 'Black',
        ascii: '>',
        offset: {x:2,y:2},
        floor: 1
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
            spawner.spawnMonsters(7+ this.attributes.floor)
            spawner.spawnStairs()
            this.attributes.floor = this.attributes.floor + 1
        }
    }
}
export default Stairs