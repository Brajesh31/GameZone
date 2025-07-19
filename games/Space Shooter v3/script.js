function addBullet(){
    if(addBullets){
        if(playerBullets.length!=0){
            if(playerBullets[playerBullets.length-1].y + 150 <= player.y){
                playerBullets.push(new bullet(player, 'player'));
                bulletSound.play();
            }
        }
        else{
            playerBullets.push(new bullet(player, 'player'));
            bulletSound.play();
        }
    }
}

function checkOutOfBound(item){
    if(item.y + item.height < 0 || item.y >= canvas.height)
    return true;
    else
    return false;
}



function checkHit(item1, item2){
    if((item1.y <= item2.y + item2.height && item1.y >= item2.y) && (item1.x<=item2.x+item2.width && item1.x+item1.width > item2.x))
    return true;
    else if((item2.y <= item1.y + item1.height && item2.y >= item1.y) && (item2.x<=item1.x+item1.width && item2.x+item2.width > item1.x))
    return true;
    else
    return false;
}




function textLoop(){
    ctx.fillStyle = 'White';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("LEVEL "  + level, canvas.width/2,canvas.height/2);
}

function showText(){
    var text = setInterval(textLoop,1000/1000);
    setTimeout(function(){
        clearInterval(text);
    },3000);
}


function level1(){
    
}