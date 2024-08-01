const faceapi = require('face-api.js');
const tf = require('@tensorflow/tfjs-node');
const modelsPath=require("./weights")

async function loadFaceModels(modelsPath) {
  // Load the pre-trained models
  await faceapi.loadTinyFaceDetectorModel(`${modelsPath}/tiny_face_detector_model-weights_manifest.json`);
  await faceapi.loadFaceLandmarkTinyModel(`${modelsPath}/face_landmark_68_tiny_model-shard1`);
  await faceapi.loadFaceRecognitionModel(`${modelsPath}/face_recognition_model-shard1`);
}

module.exports = {
  loadFaceModels,
};