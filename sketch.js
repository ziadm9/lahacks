// Face Mesh Detection with ml5.js  
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/facemesh  
// https://youtu.be/R5UZsIwPbJA  

let video;
let faceMesh;
let faces = [];

function preload() {
  // Initialize FaceMesh model with a maximum of one face and flipped video input
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
}

function mousePressed() {
  // Log detected face data tothe console
  console.log(faces);
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  // var canvas = createCanvas(640, 480);
  // 
  
  // video.size(windowWidth, windowHeight);
  // 

  canvas = createCanvas(480, 480);
  canvas.parent('frame');
  video = createCapture(VIDEO, { flipped: true, video: { facingMode: "environment" }});
  document.getElementById('frame').firstChild.style.width = "100%"
  document.getElementById('frame').firstChild.style.height = "100%"
  video.hide();

  // Start detecting faces
  faceMesh.detectStart(video, gotFaces);
}

function getDist(aX, bX, aY, bY){
  return Math.sqrt((aX-bX)**2 + (aY-bY)**2)
}

function draw() {
  background(0);
  image(video, 0, 0);
  //0upperLip, 1lowerLip, 2leftBottomEyelid, 3leftTopEyelid, 4leftEyeOuter, 5leftEyebrowInner, 6leftLip, 7leftEyebrowOuter, 8leftEyebowMiddle, 9leftEyeInner, 
  //10middleForhead, 11chin, 12bridge, 13rightEyebrowInner, 14rightLip, 
  //parts=[0, 17, 61, 291, 23, 27, 33, 133, 63, 66, 55, 151, 152, 168]
  parts=[0, 17, 23, 27, 33, 55, 61, 63, 66, 133, 151, 152, 168, 285, 291]
  partsX=[0,0,0,0,0,0,0,0,0,0,0,0,0]
  partsY=[0,0,0,0,0,0,0,0,0,0,0,0,0]
  // Ensure at least one face is detected
  if (faces.length > 0) {
    let face = faces[0];

    // Draw keypoints on the detected face
    //for (let i = 0; i < face.keypoints.length; i++) {
    j=0
    for (let i = 0; i < 468; i++) {
      if(parts.includes(i)){
        
        let keypoint = face.keypoints[i];
        partsX[j] = keypoint.x
        partsY[j] = keypoint.y
        j+=1
        stroke(255, 255, 0);
        strokeWeight(2);
        point(keypoint.x, keypoint.y);
      }
      
    }
    vertDistance = face.lips.centerY - face.faceOval.centerY
    //print(vertDistance/face.faceOval.height)
    faceDiag = 0.66*(Math.sqrt(face.faceOval.width **2 + face.faceOval.height **2))
    tilt =((vertDistance*4/face.faceOval.height) - 0.5)/30
    mouthWidth = getDist(partsX[14],partsX[6], partsY[14],partsY[6])
    mouthWidth = mouthWidth/face.faceOval.width
    anger = getDist(partsX[5],partsX[13], partsY[5],partsY[13])
    //print(anger/face.faceOval.width)
    eyeOpen = getDist(partsX[2],partsX[8], partsY[2],partsY[8])
    if(Math.floor(100*((0.187-anger/face.faceOval.width)/0.007)) > 10 && Math.floor(100*((mouthWidth+tilt-0.375)/0.135)) > 10){
      text(`anger ${Math.floor(100*((0.187-anger/face.faceOval.width)/0.007))}`, 300, 200)
    }
    else if(Math.floor(100*((0.187-anger/face.faceOval.width)/0.007)) > 10){
      console.log(anger/face.faceOval.width)
      text(`frowning ${Math.floor(100*((0.187-anger/face.faceOval.width)/0.007))}`, 300, 200)
    }
    else if(Math.floor(100*((mouthWidth+tilt-0.375)/0.135)) > 10){
      text(`smiling ${Math.floor(100*((mouthWidth+tilt-0.375)/0.135))}`, 300, 200)
      
    }
    else if(Math.floor(100*((eyeOpen/face.faceOval.width-0.275)/0.05)) > 10){
      text(`surprised ${Math.floor(100*((eyeOpen/face.faceOval.width-0.275)/0.05))}`, 300, 200)
    }
    else{
      text("neutral", 300, 200)
    }
    //print(partsY[1]-partsY[0]) 
    // mouthHeight = mouthHeight/face.faceOval.height
    //print(face.faceOval.width)
    // noStroke();
    // fill(255, 0, 0);
    //circle(face.lips.centerX, face.lips.centerY, 5);
    //circle(face.leftEye.centerX, face.leftEye.centerY, 5);
    //circle(face.leftEyebrow.centerX, face.leftEyebrow.centerY, 5);
    //circle(face.rightEye.centerX, face.rightEye.centerY, 5);
    // circle(face.rightEyebrow.centerX, face.rightEyebrow.centerY, 5);
    //circle(face.faceOval.centerX, face.faceOval.centerY, 5);
    //print(face.faceOval.width)
  }
  
}
