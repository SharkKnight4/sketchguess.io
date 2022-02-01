function setup(){
    canvas=createCanvas(380,280);
    canvas.center();
    background("grey");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function clearCanvas(){
    background("grey");
}
function draw(){
    //set stroke weight to 13
    strokeWeight(13);
    stroke("#39ff14");
    //if mouse is pressed, draw line between pprevious and current mouse positions
    if (mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML='Label:'+results[0].label;
    document.getElementById('confidence').innerHTML="Confidence"+Math.round(results[0].confidence*100)+"%";
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}
