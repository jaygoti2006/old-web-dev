function gcd(){
    let n1=document.getElementById("n1").value;
    let n2=document.getElementById("n2").value;
    let max=Math.max(n1,n2);
    let min=Math.min(n1,n2);
    let rem=[[max,min]];
    let i=0;
    do{
        rem.push([rem[i][1],rem[i][0]%rem[i][1]]);
        i++;
    }while(rem[i][1]%rem[i][0]!=0)
    let ans="";
    rem.forEach(function(val,num){
        console.log(rem);
        ans+=`\n${val[0]}=${val[1]}*${Math.floor(val[0]/val[1])}+${(function(){if(val!=rem[rem.length-1]){return rem[num+1][1]}else{return rem[num-1][1]%rem[num-1][0]}})()}`
    })
    ans+=`\n\n gcd:${rem[rem.length-1][0]}`
    document.getElementById("ans").innerText=ans;
}