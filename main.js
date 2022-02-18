function setup() {
  canvas = createCanvas(280, 280);
  canvas.center();
  background("white");
  canvas.mouseReleased(clasifyCanvas);
  synth = window.speechSynthesis;
}
function clearCanvas() {
  background("white");
}
function preload() {
  classifier = ml5.imageClassifier("DoodleNet");
}

var Width = 9;
function draw() {
  Width = document.getElementById("Width").value;

  strokeWeight(Width);
  stroke(0);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function clasifyCanvas() {
  classifier.classify(canvas, gotResult);
}
function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  document.getElementById("label").innerHTML = "Label : " + results[0].label;
  document.getElementById("confidence").innerHTML =
    "Confidence : " + Math.round(results[0].confidence * 100) + "%";
  utterthis = new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utterthis);
}
