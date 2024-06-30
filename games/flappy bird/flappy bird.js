const canvas=document.getElementById("main");
const ctx=canvas.getContext("2d");  

let gravity=1;

let bird=new Image();
bird.src="images/bird.png";

let bg=new Image();
bg.src="images/bg.png";

let images={nPipe:new Image(30,300),sPipe:new Image()};
images.nPipe.src="images/npipe.png";
images.sPipe.src="images/spipe.png";

let pipes=[[{xPos:429,yPos:-100}]];
pipes[0][1]={xPos:429,yPos:pipes[0][0].yPos+images.nPipe.height+100};

let ground=new Image();
ground.src="images/ground.png";
ground.xPos=0;
bird.yPos=0;
bird.xPos=70;

let keys={ArrowUp:false};
let player={ready:false,score:0};

window.onload=function(){
ctx.drawImage(bg,0,0);
ctx.drawImage(images.nPipe,300,-100);
ctx.drawImage(images.sPipe,300,300);
ctx.drawImage(images.nPipe,100,-50);
ctx.drawImage(images.sPipe,100,350);
ctx.drawImage(ground,0,500);
ctx.drawImage(bird,70,250);

ctx.fillStyle="yellow";
ctx.font="60px Arial";
ctx.fillText("Press shift to start the game",10,300,400);
};

document.addEventListener("keyup",keyUp);
document.addEventListener("keydown",keyDown);

function NPipeMaker(){
    this.xPos=429;
    this.yPos=Number.parseInt(Math.random()*-100);
    this.score=false;
}
function SPipeMaker(){
    this.xPos=429;
    this.yPos=pipes[pipes.length-1][0].yPos+images.nPipe.height+100;
}

function keyUp(e){
    keys[e.key]=false;
}
function keyDown(e){
    keys[e.key]=true;
}

function isCollide(value,axPos,ayPos,bxPos,byPos){
    switch(value){
        case "p":
        return (axPos>=bxPos&&ayPos<=byPos);
        break;
        case "s":
        return (axPos>=bxPos&&ayPos>=byPos);
        break;
        default:
        break;
    }
}

function endgame(){
    player.score=0;
    player.ready=false;
}

function checker(){
    if(keys.Shift&&player.ready==false){window.requestAnimationFrame(start);};
    window.requestAnimationFrame(checker);
}

function start(){
    player.ready=true;
    pipes=[[{xPos:429,yPos:-100}]];
    pipes[0][1]={xPos:429,yPos:pipes[0][0].yPos+images.nPipe.height+100};
    bird.yPos=0;
    ground.xPos=0;
    window.requestAnimationFrame(draw);
}

function draw(){
    ctx.drawImage(bg,0,0);

    if(pipes[pipes.length-1][0].xPos<=214){pipes.push([new NPipeMaker()]);pipes[pipes.length-1].push(new SPipeMaker())};

    pipes.forEach(function(value,index){ctx.drawImage(images.nPipe,value[0].xPos,value[0].yPos);ctx.drawImage(images.nPipe,value[1].xPos,value[1].yPos);});

    ctx.drawImage(bird,bird.xPos,bird.yPos);
    ctx.drawImage(ground,(function(){if(ground.xPos>=-429&&ground.xPos<0){return ground.xPos+429}else{return ground.xPos-429};})(),500);
    ctx.drawImage(ground,ground.xPos,500);

    if(keys.ArrowUp&&bird.yPos>0){bird.yPos-=gravity}else{bird.yPos+=gravity};
    if(bird.yPos>=470){endgame();};

    if(ground.xPos>-429){ground.xPos-=gravity}
    else{ground.xPos=429};

    pipes.forEach(function(value,index){value[0].xPos-=gravity;value[1].xPos-=gravity;});
    if(pipes[0][0].xPos<=-30){pipes.shift()};
    if(pipes[0][0].xPos<40&&!(pipes[0][0].score)){player.score++;pipes[0][0].score=true;};

    pipes.forEach(function(value,index){
        if(bird.xPos+15<=value[0].xPos+30){
            if(isCollide("p",bird.xPos+25,bird.yPos,value[0].xPos,value[0].yPos+images.nPipe.height)){endgame();};
        };   
        if(bird.xPos+15<=value[1].xPos+30){
            if(isCollide("s",bird.xPos+25,bird.yPos+30,value[1].xPos,value[1].yPos)){endgame();};
        };
    }
    );
    ctx.fillStyle="yellow";
    ctx.font="40px Arial";
    ctx.fillText(`Score:${player.score}`,20,585,150);
    if(player.ready){this.requestAnimationFrame(draw)};
}

window.requestAnimationFrame(checker);