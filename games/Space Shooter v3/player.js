function player(){
    this.img = document.getElementById('player');
    this.width = 50;
    this.height = 50;
    this.x = canvas.width/2 - this.width/2;
    this.y = canvas.height - 100;

    this.show = function(){
        ctx.drawImage(this.img, this.x,this.y,this.width,this.height);
    }

    this.move = function(k){
        this.x = k.offsetX - this.width/2;
        this.y = k.offsetY - this.height/2;
    }
}