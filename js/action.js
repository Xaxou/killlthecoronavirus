class Action {

    constructor(price, cooldown, bonus, buttonid){
        this.price = price;
        this.cooldown = cooldown;
        this.bonus = bonus;
        this.buttonid = buttonid;
    }

    utiliser(points)
    {
        return this;
    }

    
}