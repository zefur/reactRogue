import Entity from './Entity'

class Monster extends Entity {
   
    levelUp(){
        this.attributes.health *= 3
        this.attributes.attack *=2
        this.attributes.exp += 2
    }
    action(verb,world){
    if(verb === 'bump'){
        console.log(this.attributes.health)
        world.addToHistory(`Player attacks ${this.attributes.name}!`)
        this.attributes.health = this.attributes.health - world.player.attributes.attack
        if(this.attributes.health <= 0){
            world.addToHistory(`${this.attributes.name} dies!`)
            world.remove(this)
            world.player.attributes.exp -= this.attributes.exp
            world.addToHistory(`You gained ${this.attributes.exp} exp`)
            if(world.player.attributes.exp<=0){
                world.player.levelUp()
            }
        } else {
            world.addToHistory(`${this.attributes.name}'s health = ${this.attributes.health}`)
            if((this.attributes.attack- world.player.attributes.defence)>0){
            world.player.attributes.health = world.player.attributes.health - (this.attributes.attack- world.player.attributes.defence)
            }
            if(world.player.attributes.health <= 0){ 
                world.addToHistory("You have died!") 
            } else {
                world.addToHistory(`You have ${world.player.attributes.health} health`)
            }
        }
        }
    }
}

export default Monster