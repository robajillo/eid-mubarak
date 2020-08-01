var user=prompt("Please enter your name");
alert ("Eid Mubarak: "+user)

//fireworks made by Baron
var fireworks = [];
var particles = [];
var fireworkColors = [
[255,0,0],
[0,255,0],
[0,120,255],
[255,255,0],
[0,255,255],
[255,30,255],
[255,120,0]
];
var fireworkSpeed = 100;
var fireworkDrop = .6;
var fireworkSpeedOffset = 20;
var fireworkExplosionRadius = 30;
function spawnFirework(a,b,c) {
    if(!c) {
        var x = Math.random()*innerWidth;
        var ang = Math.atan2(b-(innerHeight+10),a-x);
        var color = fireworkColors[Math.floor(Math.random()*fireworkColors.length)];
        fireworks.push([x,innerHeight+10,ang,a,b,color]);
    }
}
function gdis(a,b) {
    return Math.sqrt(Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2));
}
var particleAmount = 400;
var particleMultiplier = 6;
var maxParticleSpeed = 3;
var minParticleSpeed = 0;
var particleLifeSpan = 400;
function generateParticles(a,b,c,d) {
    for(var i=0;i<c;i++) {
        var ran = Math.random()*Math.PI*2;
        for(var j=0;j<particleMultiplier;j++) {
        particles.push([a,b,ran,d,Math.random()*(maxParticleSpeed-minParticleSpeed)+minParticleSpeed,0,0]);
        }
    }
}
var fps = 90;
var last;
function frame() {
    ctx.fillStyle="rgba(0,0,0,.075)";
    ctx.fillRect(0,0,innerWidth,innerHeight);
    //-=-//
    var now = Date.now();
    if(!last) last=now;
    var delta = now-last;
    var average = delta/(1000/fps);
    for(var i=0;i<fireworks.length;i++) {
        ctx.fillStyle="rgb("+fireworks[i][5].join(",")+")";
        ctx.beginPath();
        ctx.arc(fireworks[i][0],fireworks[i][1],5,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
        var sp = (Math.sqrt(gdis(fireworks[i],[fireworks[i][3],fireworks[i][4]]))*fireworkSpeedOffset+fireworkSpeed)/fireworkSpeed-fireworkDrop;
        fireworks[i][0]+=Math.cos(fireworks[i][2])*sp*average;
        fireworks[i][1]+=Math.sin(fireworks[i][2])*sp*average;
        if(gdis(fireworks[i],[fireworks[i][3],fireworks[i][4]])<fireworkExplosionRadius) {
            generateParticles(fireworks[i][0],fireworks[i][1],particleAmount,fireworks[i][5]);
            fireworks.splice(i,1);
        }
    }
    for(var i=0;i<particles.length;i++) {
        var opacity = 1-particles[i][5]/particleLifeSpan;
        ctx.fillStyle="rgba("+particles[i][3].join(",")+","+opacity+")";
        ctx.fillRect(particles[i][0],particles[i][1],2,2);
        particles[i][0]+=Math.cos(particles[i][2])*particles[i][4]*average;
        particles[i][1]+=Math.sin(particles[i][2])*particles[i][4]*average+particles[i][6];
        particles[i][6]+=.01*average;
        particles[i][5]+=1*average;
        if(particles[i][5]>particleLifeSpan) particles.splice(i,1);
    }
    last = now;
}
var event = "mousedown";
if("ontouchstart" in document) event="touchstart";
document.addEventListener(event,e=>{
    if(e.changedTouches) e=e.changedTouches[0];
    spawnFirework(e.clientX,e.clientY);
});
var c;
var ctx;
(()=>{
    setTimeout(()=>{
    c=document.querySelector("canvas");
    c.width=innerWidth;
    c.height=innerHeight;
    ctx=c.getContext("2d");
    setInterval(frame);
    });
})();





const playMusic = () =>{
    var m = document.getElementById('mySrc');
    m.play();
};
