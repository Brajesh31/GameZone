// var levelLoop;
// var c;
// var enemyGap;
// var text;
// function levelUpdate(){
//     clearInterval(text);
//     if(c<enemysToSpawn){
//         if(enemys.length!=0){
//             if(enemys[enemys.length-1].x + enemys[enemys.length-1].width*2 + enemyGap <= canvas.width){
//                 enemys.push(new enemy());
//                 c++;
//             }
//         }else{
//             enemys.push(new enemy());
//             c++;
//         }
//     }else{
//         if(enemys.length == 0){
//             level ++;
//             clearInterval(levelLoop);
//             setTimeout(function(){levelStarted = false}, 5000);
//         }
//     }
// }


// function startLevel(){
//     c = 0;

//     text = setInterval(showText,1000/1000);

//     setTimeout(function(){
//         levelLoop = setInterval(levelUpdate, 1000/fps);
//     }, 5000);

// }




function startWave(x,y,d,e,g,waveNo,delay){
    var waveLoop;
    var c;
    
    function waveLoop(){
        if(c<e){
            if(waves[waveNo].length!=0){
                if((x - waves[waveNo][waves[waveNo].length-1].x - waves[waveNo][waves[waveNo].length-1].width >= g)||(waves[waveNo][waves[waveNo].length-1].x - waves[waveNo][waves[waveNo].length-1].width - x >= g && d=='right')){
                    waves[waveNo].push(new enemy(x,y,d));
                    c++;
                }
            }else{
                waves[waveNo].push(new enemy(x,y,d));
                c++;
            }
        }else{  
                clearInterval(waveLoop);
            }
        }
    
    
    
    
    c = 0;
    
    setTimeout(function(){
        waveLoop = setInterval(waveLoop, 1000/fps);
    }, delay);
}


function levels(l){
    switch(l){
        case 1 : startWave(50,50,'right',15,10,1,5000);
        startWave(750,250,'left',5,50,2,7000);
        break;

        case 2 : startWave(50,50,'right',30,10,1,5000);
        startWave(750,250,'left',20,50,2,7000);
        break;

        case 3 : startWave(50,50,'right',30,0,1,5000);
        startWave(750,250,'left',20,50,2,7000);
        break;

        case 4 : startWave(50,50,'right',30,0,1,5000);
        startWave(750,250,'left',20,50,2,7000);
        break;

        case 5 : startWave(50,50,'right',30,0,1,5000);
        startWave(750,250,'left',20,50,2,7000);
        break;

        case 6 : startWave(50,50,'right',30,0,1,5000);
        startWave(750,250,'left',20,50,2,7000);
        break;

        case 7 : startWave(50,50,'right',30,0,1,5000);
        startWave(750,250,'left',20,50,2,7000);
        break;
    }
}