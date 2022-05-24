song= "";
status ="";
objects = [];
function preload(){
song = loadSound("alert.mp3");

}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video =createCapture(VIDEO);
    video.size(380,380);
    video.height
    objectDetecter=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML ="Status : Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);
    if(status != "")
    {
        objectDetecter.detect(video,gotResult);
        for (i = 0; i< objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+percent+"%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label =="person")
            {
                song.stop();
                
            }
            else{
                song.play();

            }
            if(objects.length==0)
            {
                song.play();
            }
        }
    }

}

function modelLoaded()
{
    console.log("Model Loaded!");
    status= true;
  
}

function gotResult(error, results){

    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}