var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var bg = document.getElementById('bg');
var bulletSound = document.getElementById('bulletSound');
var enemyDie = document.getElementById('enemyDie');
var player = new player();
var playerBullets = [];
var fps=60;
var addBullets;
var waves = [[],[],[],[],[],[],[],[],[],[],[]];
var enemyBullets = [];
var enemysToSpawn;
var levelStarted = false;
var gameStarted = false;
var level = 1;


ctx.drawImage(bg,0,0, canvas.width,canvas.height);


function setup(){
    ctx.drawImage(bg,0,0, canvas.width,canvas.height);
    canvas.addEventListener('mousemove', function(k){
        player.move(k);
    });
    
    document.addEventListener('mousedown', function(){
        addBullets = true;
    });
    
    document.addEventListener('mouseup', function(){
        addBullets = false;
    });
}


function render(){
    ctx.drawImage(bg,0,0, canvas.width,canvas.height);
    player.show();
    
    
    // SHOW EVERYTHING
    for(var i=0;i<playerBullets.length;i++){
        playerBullets[i].show();
    }
    
    for(var i=0;i<enemyBullets.length;i++){
        enemyBullets[i].show();
    }
    for(var i=0;i<waves.length;i++){
        for(var j=0;j<waves[i].length;j++){
            waves[i][j].show();
        }
    }
}

function update(){
    if(!levelStarted){
        showText();
        levels(level);
        levelStarted = true;
        setTimeout(function(){
            gameStarted = true;
        }, 10000);
    }
    
    
    
    // REMOVE BULLETS
    for(var i=0;i<playerBullets.length;i++){
        if(checkOutOfBound(playerBullets[i]))
        playerBullets.splice(i,1);
    }
    for(var i=0;i<enemyBullets.length;i++){
        if(checkOutOfBound(enemyBullets[i]))
        enemyBullets.splice(i,1);
    }
    
    
    
    // UPDATE BULLETS
    for(var i=0;i<playerBullets.length;i++){
        playerBullets[i].update();
    }
    for(var i=0;i<enemyBullets.length;i++){
        enemyBullets[i].update();
    }
    
    // ADD BULLETS
    addBullet();
    
    
    
    
    // UPDATE ENEMYS
    for(var i=0;i<waves.length;i++){
        for(var j=0;j<waves[i].length;j++){
            waves[i][j].update();
        }
    }
    
    // REMOVE ENEMYS
    for(var i=0;i<waves.length;i++){
        for(var j=0;j<waves[i].length;j++){
            if(waves[i][j].y + waves[i][j].height >= canvas.height)
            waves[i].splice(j,1);
        }
    }
    
    
    
    // COLLIDER FOR BULLET AND ENEMYS
    for(var i=0;i<waves.length;i++){
        for(var j=0;j<waves[i].length;j++){
            for(var k=0;k<playerBullets.length;k++)
            {
                if(checkHit(waves[i][j], playerBullets[k])){
                    waves[i].splice(j,1);
                    playerBullets.splice(k,1);
                    enemyDie.play();
                    break;
                }
            }
        }
    }
    
    
    // COLLIDER FOR PLAYER AND BULLETS
    for(var j=0;j<enemyBullets.length;j++)
    {
        if(checkHit(player, enemyBullets[j])){
            enemyBullets.splice(j,1);
            gameOver();
            break;
        }
    }
    
    // COLLIDER FOR PLAYER AND ENEMYS
    for(var i=0;i<waves.length;i++){
        for(var j=0;j<waves[i].length;j++){
            if(checkHit(waves[i][j], player)){
                waves[i].splice(j,1);
                gameOver();
                break;
            }
        }
    }
    
    
    // LEVELS
    if(gameStarted){
        var flag=0;
        for(var i=0;i<waves.length;i++){
            if(waves[i].length==0)
            flag++;
        }
        if(flag==waves.length){
            gameStarted = false;
            levelStarted = false;
            level++;
        }
    }
    
}


function gameOver(){
    clearInterval(startRender);
    clearInterval(startUpdate);
    ctx.fillStyle = 'White';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("GAME OVER", canvas.width/2,canvas.height/2);
}

function gameInput(){
    ctx.fillStyle = 'White';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("CLICK TO START THE GAME", canvas.width/2,canvas.height/2);
    canvas.addEventListener('click', gameLoop);
}

function gameLoop(){
    canvas.removeEventListener('click', gameLoop);
    setup();
    startRender = setInterval(render,1000/fps);
    startUpdate = setInterval(update, 1000/fps);
}


gameInput();
