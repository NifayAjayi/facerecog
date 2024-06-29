 function startVideo(){
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing the webcam: ', error);
    });
 }

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('snapshot');
    const captureButton = document.getElementById('capture');
    const context = canvas.getContext('2d');

 
    if (!video || !canvas || !captureButton || !context) {
        console.error('One or more required elements are missing from the DOM.');
        return;
    }

   
   Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("../models/tiny_face_detector"), 
    faceapi.nets.faceLandmark68Net.loadFromUri("../models/face_landmark_68"), 
    faceapi.nets.faceRecognitionNet.loadFromUri("../models/face_recognition"), 
    faceapi.nets.faceExpressionNet.loadFromUri("../models/face_expression"), 

   ]) .then(startVideo)
   .catch(error => {
    console.log('Models could not be loaded.', error);
   })

    
    captureButton.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';
    });
});