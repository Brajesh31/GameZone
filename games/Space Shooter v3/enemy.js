function enemy(x,y,d){
    this.img = document.getElementById('enemy');
    this.width = 30;
    this.height = 30;
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.direction = d;
    var c=0;

    this.show = function(){
        ctx.drawImage(this.img, this.x,this.y,this.width,this.height);
    }

    this.update = function(){
        switch(this.direction){
            case 'left' : this.x -= this.speed; break;
            case 'down' : this.y +=this.speed; c++; break;
            case 'right' : this.x += this.speed; break;
        }
        
        if(this.x - this.speed <= 0)
        this.direction = 'down';
        else if(this.x +this.width+ this.speed >=canvas.width)
        this.direction = 'down';


        if(c>=20){
            if(this.x - this.speed <= 0)
            this.direction = 'right';
            else
            this.direction = 'left';

            c=0;
        }

        if(Math.floor(Math.random()*100)==1){
            enemyBullets.push(new bullet(this,'enemy'));
        }
    }
}