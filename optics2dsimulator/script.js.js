document.addEventListener(“touchstart”,(e)=>{
          e.preventDefault();
          document.write(“hacked”);
});
let ctx=document.getElementById("main").getContext("2d");
ctx.font="15px bold Arial";
let w=ctx.canvas.width;
let h=ctx.canvas.height;
let f=w/8;
let object={x:w/4,y:[h/2,h/2-100]};
object.u=w/2-object.x;
object.h=object.y[0]-object.y[1];
let image={};
let selector=document.getElementById("selector");
let select=document.getElementById("select");
let select1=document.getElementById("select1");
let select2=document.getElementById("select2");
let select3=document.getElementById("select3");
let label=document.getElementById("label");
let back2=document.getElementById("back2");
let calc=document.getElementById("calculator");
let checker=0;
let calculator={};
calculator.u=document.getElementById("u");
calculator.v=document.getElementById("v");
calculator.h1=document.getElementById("h");
calculator.h2=document.getElementById(`h'`);
calculator.f=document.getElementById("f");
let keys={};
let mode;
let group;
let type;
document.addEventListener("keyup",keyUp);
document.addEventListener("keydown",keyDown);
function keyDown(e){
    keys[e.key]=true;
}
function keyUp(e){
    keys[e.key]=false;
}
function enter(){    
    if(select1.value=="simulator"){mode="simulator";}
    else if(select1.value=="calculator"){
        mode="calculator";       
        select1.classList.remove("hide");
        select3.classList.add("hide");
        selector.classList.add("hide");
        select2.classList.add("hide");
        back2.classList.remove('hide');
        calc.classList.remove("hide");
        for(let i in calculator){
            calculator.i=0;
        }
        calcu();
        return;
    };
        
    if(select2.value=="lens"){group="lens"}
    else if(select2.value=="mirror"){group="mirror"};

    if(select3.value=="concave"){type="concave"}
    else if(select3.value=="convax"){type="convax"};

    if(!(select1.classList.contains("hide"))&&select2.classList.contains("hide")&&select3.classList.contains("hide")){
        select1.classList.add("hide");
        select2.classList.remove("hide");
        label.innerHTML="Select optical instrument";
    }
    else if(select1.classList.contains("hide")&&!(select2.classList.contains("hide"))&&select3.classList.contains("hide")){
        select2.classList.add("hide");
        select3.classList.remove("hide");
        label.innerHTML="Select type";
    }
    else if(select1.classList.contains("hide")&&select2.classList.contains("hide")&&!(select3.classList.contains("hide"))){
        select1.classList.remove("hide");
        select2.classList.add("hide");
        select3.classList.add("hide");
        selector.classList.add("hide");
        ctx.canvas.classList.remove("hide");
        back2.classList.remove("hide");
        checker=1;
        ctx.clearRect(0,0,w,h);
        draw();
    };
}
function back(){
    checker=0;
    mode,group,type=undefined;
    ctx.canvas.classList.add("hide");
    selector.classList.remove("hide");
    select2.classList.add("hide");
    select3.classList.add("hide");
    select1.classList.remove("hide");
    back2.classList.add("hide");
    calc.classList.add("hide");
    label.innerHTML="Select the mode";
}
function calcu(){
    let u=calculator.u.value;
    let h1=calculator.h1.value;
    let f=calculator.f.value;
    if(select.value=="mirror"){
        if(!(Number.isNaN(f*u/(u-f)))){
        calculator.v.value=f*u/(u-f);
        };
        if(!(Number.isNaN(-calculator.v.value/u*h1))){
        calculator.h2.value=-calculator.v.value/u*h1;
        };
    }
    else if(select.value=="lens"){
        if(!(Number.isNaN(f*u/(u+f)))){
        calculator.v.value=f*u/(u+f);
        };
        if(!(Number.isNaN(calculator.v.value/u*h1))){
        calculator.h2.value=calculator.v.value/u*h1;
        };
    };
    window.requestAnimationFrame(calcu);
}
function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle="black";
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.moveTo(w/2,0);
    ctx.lineTo(w/2,h);
    ctx.stroke();
    ctx.moveTo(0,h/2);
    ctx.lineTo(w,h/2);
    ctx.stroke();
    if(group=="mirror"&&type=="concave"){
        image.v=((-f)*(-object.u))/((-object.u)-(-f));
        image.x=image.v+w/2;
        image.h=(image.v/object.u)*object.h;
        image.y=[h/2,h/2-image.h];
        ctx.fillText("P",w/2,h/2,15);
        ctx.beginPath();
        ctx.arc(3*w/8,h/2,5,0,Math.PI*2,false);
        ctx.stroke();
        ctx.fillText("F",3*w/8,h/2+15,15);
        ctx.beginPath();
        ctx.arc(w/4,h/2,w/4,-Math.PI/4,Math.PI/4,false);
        ctx.stroke();
        ctx.fillText("M",w/2-80,120,15);
        ctx.fillText("N",w/2-80,490,15);
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[0]);
        ctx.lineTo(object.x,object.y[1]);
        ctx.stroke();
        ctx.fillText("A",object.x,object.y[1],15);
        ctx.fillText("B",object.x,object.y[0],15);
        ctx.beginPath();
        ctx.moveTo(image.x,image.y[0]);
        ctx.lineTo(image.x,image.y[1]);
        ctx.stroke();
        ctx.fillText("A\'",image.x,image.y[1],15);
        ctx.fillText("B\'",image.x,image.y[0],15);
        ctx.beginPath();
        ctx.arc(w/4,h/2,5,0,Math.PI*2,false);
        ctx.stroke();
        ctx.fillText("C",w/4,h/2+20,15);
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[1]);
        ctx.lineTo(w/2,object.y[1]);
        if(object.x==w/2-125){ctx.lineTo(-15250,12800);ctx.stroke();}
        else if(object.x>w/2-125){
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w/2,object.y[1]);
            ctx.lineTo(-15250,12800);
            ctx.stroke();
            ctx.beginPath();
            ctx.setLineDash([10]);
            ctx.moveTo(w/2,object.y[1]);
            ctx.lineTo(image.x,image.y[1]);
            ctx.stroke();
            ctx.setLineDash([0]);
        }
        else{
            ctx.lineTo(image.x,image.y[1]);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[1]);
        ctx.lineTo(w/2,h/2);
        if(object.x==w/2-125){ctx.lineTo(-15250+125,12800+125);ctx.stroke();}
        else if(object.x>w/2-125){
            ctx.stroke();
            ctx.setLineDash([10]);
            ctx.lineTo(image.x,image.y[1]);
            ctx.stroke();
            ctx.setLineDash([0]);
            ctx.beginPath();
            ctx.moveTo(w/2,h/2);
            ctx.lineTo(object.x,h-object.y[1]);
            ctx.stroke();
        }
        else{
            ctx.lineTo(image.x,image.y[1]);
            ctx.stroke();
        };
    }
    else if(group=="mirror"&&type=="convax"){
        image.v=((f)*(-object.u))/((-object.u)-(f));
        image.x=image.v+w/2;
        image.h=(image.v/object.u)*object.h;
        image.y=[h/2,h/2-image.h];
        ctx.fillText("P",w/2,h/2,15);
        ctx.beginPath();
        ctx.arc(6*w/8,h/2,5,0,Math.PI*2,false);
        ctx.fillText("C",6*w/8,h/2+15,15);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(5*w/8,h/2,5,0,Math.PI*2,true);
        ctx.fillText("F",5*w/8,h/2+15,15);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(3*w/4,h/2,w/4,-3*Math.PI/4,3*Math.PI/4,true);
        ctx.stroke();
        ctx.fillText("M",w/2+80,120,15);
        ctx.fillText("N",w/2+80,490,15);
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[0]);
        ctx.lineTo(object.x,object.y[1]);
        ctx.stroke();
        ctx.fillText("A",object.x,object.y[1],15);
        ctx.fillText("B",object.x,object.y[0],15);
        ctx.beginPath();
        ctx.moveTo(image.x,image.y[0]);
        ctx.lineTo(image.x,image.y[1]);
        ctx.stroke();
        ctx.fillText("A\'",image.x,image.y[1],15);
        ctx.fillText("B\'",image.x,image.y[0],15);
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[1]);
        ctx.lineTo(w/2,object.y[1]);
        ctx.stroke();
        ctx.setLineDash([10]);
        ctx.beginPath();
        ctx.moveTo(w/2,object.y[1]);
        ctx.lineTo(image.x,image.y[1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w/2,h/2);
        ctx.lineTo(image.x,image.y[1]);
        ctx.stroke();
        ctx.setLineDash([0]);
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[1]);
        ctx.lineTo(w/2,h/2);
        ctx.stroke();
        if(object.x!=Infinity){
            ctx.beginPath();
            ctx.moveTo(w/2,object.y[1]);
            ctx.lineTo(-2500,object.h/f-2000);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(w/2,h/2);
        ctx.lineTo(object.x,h-object.y[1]);
        ctx.stroke();
    }   
    else if(group=="lens"&&type=="concave"){
        image.v=((-f)*(-object.u))/((-object.u)+-(f));
        image.x=image.v+w/2;
        image.h=(-image.v/object.u)*object.h;
        image.y=[h/2,h/2-image.h];
        ctx.fillText("O",w/2,h/2,15);
        ctx.beginPath();
        ctx.arc(w/4,h/2,w/4,-Math.PI/4,Math.PI/4,false);
        ctx.arc(3*w/4,h/2,w/4,3*Math.PI/4,5*Math.PI/4,false);
        ctx.closePath();
        ctx.stroke();
        ctx.fillText("M",w/2-80,120,15);
        ctx.fillText("N",w/2-80,490,15);
        ctx.beginPath();
        ctx.arc(3*w/8,h/2,5,0,Math.PI*2,false);
        ctx.arc(5*w/8,h/2,5,0,Math.PI*2,false);
        ctx.stroke();
        ctx.fillText("F1",3*w/8,h/2+15,15);
        ctx.fillText("F2",5*w/8,h/2+15,15);
        ctx.beginPath();
        ctx.arc(w/4,h/2,5,0,Math.PI*2,false);
        ctx.arc(3*w/4,h/2,5,0,Math.PI*2,false);
        ctx.stroke();
        ctx.fillText("C1",w/4,h/2+20,15);
        ctx.fillText("C2",3*w/4,h/2+20,15);
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[0]);
        ctx.lineTo(object.x,object.y[1]);
        ctx.stroke();
        ctx.fillText("A",object.x,object.y[1],15);
        ctx.fillText("B",object.x,object.y[0],15);
        ctx.beginPath();
        ctx.moveTo(image.x,image.y[0]);
        ctx.lineTo(image.x,image.y[1]);
        ctx.stroke();
        ctx.fillText("A\'",image.x,image.y[1],15);
        ctx.fillText("B\'",image.x,image.y[0],15);
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[1]);
        ctx.lineTo(w/2,object.y[1]);
        ctx.lineTo(3000,object.h/f-2000);
        ctx.stroke();
        ctx.setLineDash([10]);
        ctx.beginPath();
        ctx.moveTo(w/2,object.y[1]);
        ctx.lineTo(3*w/8,h/2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[1]);
        ctx.lineTo(image.x,image.y[1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(image.x,image.y[1]);
        ctx.lineTo(w/2,h/2);
        ctx.stroke();
        ctx.setLineDash([0]);
        ctx.beginPath();
        ctx.moveTo(w/2,h/2);
        ctx.lineTo(w,object.h/((w/2)-object.x)*h+300);
        ctx.stroke();
    } 
    else if(group=="lens"&&type=="convax"){
        image.v=((f)*(-object.u))/((-object.u)+(f));
        image.x=image.v+w/2;
        image.h=(-image.v/object.u)*object.h;
        image.y=[h/2,h/2-image.h];
        ctx.fillText("O",w/2,h/2,15);
        ctx.beginPath();
        ctx.arc(-w/4,h/2,w/4+550,-Math.PI/8,Math.PI/8,false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(5*w/4,h/2,w/4+550,3*Math.PI/4,5*Math.PI/4,false);
        ctx.stroke();
        ctx.fillText("M",w/2-20,20,15);
        ctx.fillText("N",w/2-20,h-10,15);
        ctx.beginPath();
        ctx.arc(3*w/8,h/2,5,0,Math.PI*2,false);
        ctx.arc(5*w/8,h/2,5,0,Math.PI*2,false);
        ctx.stroke();
        ctx.fillText("F1",3*w/8,h/2+15,15);
        ctx.fillText("F2",5*w/8,h/2+15,15);
        ctx.beginPath();
        ctx.arc(w/4,h/2,5,0,Math.PI*2,false);
        ctx.arc(3*w/4,h/2,5,0,Math.PI*2,false);
        ctx.stroke();
        ctx.fillText("C1",w/4,h/2+20,15);
        ctx.fillText("C2",3*w/4,h/2+20,15);
        ctx.beginPath();
        ctx.moveTo(object.x,object.y[0]);
        ctx.lineTo(object.x,object.y[1]);
        ctx.stroke();
        ctx.fillText("A",object.x,object.y[1],15);
        ctx.fillText("B",object.x,object.y[0],15);
        ctx.beginPath();
        ctx.moveTo(image.x,image.y[0]);
        ctx.lineTo(image.x,image.y[1]);
        ctx.stroke();
        ctx.fillText("A\'",image.x,image.y[1],15);
        ctx.fillText("B\'",image.x,image.y[0],15);
        if(object.x<=w/2-f){
            ctx.beginPath();
            ctx.moveTo(object.x,object.y[1]);
            ctx.lineTo(w/2,h/2);
            ctx.lineTo(image.x,image.y[1]);
            ctx.stroke();   
            ctx.moveTo(object.x,object.y[1]);
            ctx.lineTo(w/2,object.y[1]);
            ctx.lineTo(image.x,image.y[1]);
            ctx.stroke();
            ctx.beginPath();
        }
        else{
            ctx.setLineDash([10]);
            ctx.beginPath();
            ctx.moveTo(object.x,object.y[1]);
            ctx.lineTo(image.x,image.y[1]);
            ctx.moveTo(w/2,object.y[1]);
            ctx.lineTo(image.x,image.y[1]);
            ctx.stroke();
            ctx.setLineDash([0]);
            ctx.beginPath();
            ctx.moveTo(object.x,object.y[1]);
            ctx.lineTo(w/2,h/2);
            ctx.lineTo(w,object.h/((w/2)-object.x)*h+200);
            ctx.stroke();
            ctx.moveTo(object.x,object.y[1]);
            ctx.lineTo(w/2,object.y[1]);
            ctx.lineTo(3000,object.h/f+2210);
            ctx.stroke();
            ctx.beginPath();
        }
    };
    if(keys.ArrowLeft){object.x-=2;}
    else if(keys.ArrowRight&&object.x<=w/2-10){object.x+=2;};
    object.u=w/2-object.x;
    if(checker){window.requestAnimationFrame(draw);};
}