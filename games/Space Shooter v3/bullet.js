function bullet(p, id){
    this.id = id;
    this.width = 5;
    this.height = 20;
    if(id=='player'){
    this.img = document.getElementById('playerBullet');
    this.y = p.y - p.height/2 - this.height/2;
    }
    else{
    this.img = document.getElementById('enemyBullet');
    this.y = p.y + p.height/2 + this.height/2;
    }

    
    this.x = p.x + p.width/2 - this.width/2;
    this.speed = 5;

    this.show = function(){
        ctx.drawImage(this.img, this.x,this.y,this.width,this.height);
    }

    this.update = function(){
        if(id=='player')
        this.y -= this.speed;
        else
        this.y += this.speed;
    }
}