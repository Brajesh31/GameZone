c = 0;
p1Index = 0;
p2Index = 0;
p1unlock = false;
p2unlock = false;
player1 = "Player 1";
player2 = "Player 2";

window.onload = function(){
    document.getElementById('dice').addEventListener('click', rollDice);
};

function rollDice(){
    c++;
    document.getElementById('dice').setAttribute('style', 'animation: diceRoll 800ms ease-in;');

    setTimeout(function(){
        document.getElementById('dice').setAttribute('style', 'animation: none 800ms ease-in;');
    }, 800);

    var x = Math.floor(Math.random() * 6) + 1;
    

    document.getElementById('diceValue').style.opacity = '0';

    setTimeout(function(){
        document.getElementById('diceValue').innerHTML = x;   
    }, 400);
    
    setTimeout(function(){
        document.getElementById('diceValue').style.opacity = '1';    
    }, 400);
    
    
    if(p2unlock){
        if(p2Index+x<=100 && c%2==0)
        p2Index+=x;
    }
    if(p1unlock){
        if(p1Index+x<=100 && c%2!=0)
        p1Index+=x;
    }

    if(x==6){
        if(c%2==0)
        p2unlock = true;
        else if(c%2!=0) 
        p1unlock = true;
        
        c--;
    }
    
    if(c%2==0){
        
        document.getElementById('turn').style.opacity = '0';
        setTimeout(function(){
            document.getElementById('turn').innerHTML = player1 + "'s Turn";    
        }, 400)

        setTimeout(function(){
            document.getElementById('turn').style.opacity = '1';    
        }, 400)
    }
    else{
        
        document.getElementById('turn').style.opacity = '0';
        setTimeout(function(){
            document.getElementById('turn').innerHTML = player2 + "'s Turn";    
        }, 400)
        setTimeout(function(){
            document.getElementById('turn').style.opacity = '1';    
        }, 400)
    }

    
    
    setTimeout(move, 800);
    setTimeout(check, 800);
    setTimeout(winStatus, 800);
} // End Of RollDice

function move(){
    document.getElementById('player1').style.left = getPos(p1Index, 1).left + "px";
    document.getElementById('player1').style.bottom = getPos(p1Index, 1).bottom + "px";
    document.getElementById('player2').style.left = getPos(p2Index, 2).left + "px";
    document.getElementById('player2').style.bottom = getPos(p2Index, 2).bottom + "px";
} // End Of Move

function getPos(x, p){
    var left=0;
    if(p==1)
    var bottom=25;
    else
    var bottom=0;
    
    
    if(x<=10){
        bottom+=0;
    }
    else if(x==100)
    bottom += 450;
    else if(x%10!=0){
        bottom += parseInt(x.toString().charAt(0))*50;
    }
    else{
        bottom += (parseInt(x.toString().charAt(0))-1)*50
    }
    
    if(x==0){
        left = -50;
    }
    else if(x<=10){
        left = (x-1)*50;
    }
    else{
        var y = x.toString();
        var t = parseInt(y.charAt(y.length-1));
        if(t==0){
            left = 450
        }
        else{
            left = (t-1)*50;
        }
    }
    
    return {
        left: left,
        bottom: bottom
    };
} // End Of getPos



function check(){
    
    // check for p1
    
    if(p1Index == 3){
        p1Index = 51;
        setTimeout(move, 800);
    }
    else if(p1Index == 6){
        p1Index = 27;
        setTimeout(move, 800);
    }
    else if(p1Index == 20){
        p1Index = 70;
        setTimeout(move, 800);
    }
    else if(p1Index == 36){
        p1Index = 55;
        setTimeout(move, 800);
    }
    else if(p1Index == 63){
        p1Index = 95;
        setTimeout(move, 800);
    }
    else if(p1Index == 68){
        p1Index = 98;
        setTimeout(move, 800);
    }
    else if(p1Index == 25){
        p1Index = 5;
        setTimeout(move, 800);
    }
    else if(p1Index == 34){
        p1Index = 1;
        setTimeout(move, 800);
    }
    else if(p1Index == 47){
        p1Index = 19;
        setTimeout(move, 800);
    }
    else if(p1Index == 65){
        p1Index = 52;
        setTimeout(move, 800);
    }
    else if(p1Index == 87){
        p1Index = 57;
        setTimeout(move, 800);
    }
    else if(p1Index == 91){
        p1Index = 61;
        setTimeout(move, 800);
    }
    else if(p1Index == 99){
        p1Index = 69;
        setTimeout(move, 800);
    }
    
    
    
    // Check for p2
    
    if(p2Index == 3){
        p2Index = 51;
        setTimeout(move, 800);
    }
    else if(p2Index == 6){
        p2Index = 27;
        setTimeout(move, 800);
    }
    else if(p2Index == 20){
        p2Index = 70;
        setTimeout(move, 800);
    }
    else if(p2Index == 36){
        p2Index = 55;
        setTimeout(move, 800);
    }
    else if(p2Index == 63){
        p2Index = 95;
        setTimeout(move, 800);
    }
    else if(p2Index == 68){
        p2Index = 98;
        setTimeout(move, 800);
    }
    else if(p2Index == 25){
        p2Index = 5;
        setTimeout(move, 800);
    }
    else if(p2Index == 34){
        p2Index = 1;
        setTimeout(move, 800);
    }
    else if(p2Index == 47){
        p2Index = 19;
        setTimeout(move, 800);
    }
    else if(p2Index == 65){
        p2Index = 52;
        setTimeout(move, 800);
    }
    else if(p2Index == 87){
        p2Index = 57;
        setTimeout(move, 800);
    }
    else if(p2Index == 91){
        p2Index = 61;
        setTimeout(move, 800);
    }
    else if(p2Index == 99){
        p2Index = 69;
        setTimeout(move, 800);
    }
    
    
} //End Of Check

function winStatus(){
    if(p1Index==100){
        document.getElementById('dice').removeEventListener('click', rollDice);
        document.getElementById('turn').innerHTML = '';
        document.getElementById('result').innerHTML = player1 + ' Won';
        
    }
    else if(p2Index == 100){
        document.getElementById('dice').removeEventListener('click', rollDice);
        document.getElementById('turn').innerHTML = '';
        document.getElementById('result').innerHTML = player2 + ' Won';
        
    }
}

function reset(){
    c=0;
    p1Index = 0;
    p2Index = 0;
    p1unlock = false;
    p2unlock = false;
    move();
    document.getElementById('result').innerHTML = '';
    document.getElementById('dice').addEventListener('click', rollDice);
    document.getElementById('diceValue').innerHTML = '0';
    player1 = "Player 1";
    player2 = "Player 2";
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
    document.getElementById('turn').innerHTML = player1 + "'s Turn";
}

function updateName(){
    if(document.getElementById('player1Name').value)
    player1 = document.getElementById('player1Name').value;

    if(document.getElementById('player2Name').value)
    player2 = document.getElementById('player2Name').value;
}