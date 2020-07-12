import Loot from './Loot.js'
import Monster from './Monster'
import Stairs from './Stairs.js'

const monsterTable = [
{
    name: 'Ogre',
    color: 'lightgrey',
    ascii: 'O',
    offset: {x:2,y:3},
    health: 6,
    attack: 4,
    exp: 3,
    type: "Monster"
},
{
    name: 'Kobold',
    color: 'purple',
    ascii: 'k',
    offset: {x:4,y:3},
    health: 3,
    attack: 3,
    exp: 2,
    type: "Monster"
},
{
    name: 'Slime',
    color: 'darkgreen',
    ascii: 'S',
    offset: {x:3,y:2},
    health: 2,
    attack: 2,
    exp: 1,
    type: "Monster"
},
{
    name: 'Dragon',
    color: 'red',
    ascii: 'D',
    offset: {x:2,y:3},
    health: 10,
    attack: 5,
    exp: 4,
    type: "Monster"
}
]

const lootTable = [
    {
        name: 'Long Sword', 
        color: 'darkgrey', 
        ascii: '/', 
        offset:{x:6,y:3},
        type: "Treasure"
    },
    {
        name: 'Health Potion', 
        color: 'red', 
        ascii: '!', 
        offset:{x:3,y:3},
        type: "Treasure"
    },
    {
        name: 'Gold Coin', 
        color: 'yellow', 
        ascii: '$', 
        offset:{x:3,y:3},
        type: "Treasure"
    },
    {
        name: 'Light Armor', 
        color: 'lightgrey', 
        ascii: '#', 
        offset:{x:4,y:3},
        type: "Treasure"
    },
]

class Spawner {
    constructor(world){
        this.world = world 
    }
    spawn(spawnCount,createEntity){
        for(let count =0; count<spawnCount;count++){
            let entity = createEntity()
            this.world.add(entity)
            this.world.moveToSpace(entity)
        }
    }
    spawnLoot(spawnCount){
        this.spawn(spawnCount, ()=> {
            return new Loot(getRandomInt(this.world.width-1),getRandomInt(this.world.height-1),this.world.tilesize,lootTable[getRandomInt(lootTable.length)])
        })
    }
    spawnMonsters(spawnCount){
        this.spawn(spawnCount, ()=> {
            return new Monster(getRandomInt(this.world.width-1),getRandomInt(this.world.height-1),this.world.tilesize,monsterTable[getRandomInt(monsterTable.length)])
        })
    }
    spawnStairs(){
        let stairs = new Stairs(this.world.width -5,this.world.height - 5,this.world.tilesize)
        this.world.add(stairs)
        this.world.moveToSpace(stairs)
        this.world.floor += 1
    }
}
function getRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max))
}

export default Spawner