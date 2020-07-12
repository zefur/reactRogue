import Entity from './Entity'

class Player extends Entity{
    inventory = []
    attributes = {
        name: 'Player',
        ascii: '@',
        health: 20,
        attack: 1,
        defence: 1,
        level: 1,
        exp: 10,
        type: "Human"
    }
    move(dx,dy) {
        if(this.attributes.health <= 0) return;
        this.x += dx
        this.y += dy
    }
    add(item){
        this.inventory.push(item)
    }
    
    useItem(item){
        switch (this.inventory[item].attributes.name) {
            case 'Health Potion':
            this.attributes.health = 20 
            break
            case 'Long Sword':
            this.attributes.attack += 1
            break
            case 'Light Armor':
            this.attributes.defence +=1
            break
            default:
            break

        }
        this.inventory.splice(item,1)
        
        
        
        
    }
    levelUp(){
        this.attributes.attack += 1
        this.attributes.defence += 1
        this.attributes.level += 1
        this.attributes.exp = 10 + (this.attributes.level*2)
    }

    copyPlayer(){
        let newPlayer = new Player()
        Object.assign(newPlayer,this)
        return newPlayer
    }
    
}

export default Player