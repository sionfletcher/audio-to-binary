var mic, fft;

function setup() {
   createCanvas(400, 1024);
   noFill();

   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT();
   fft.setInput(mic);
}

function draw() {
   background(200);

   var spectrum = fft.analyze();

   for (i = 0; i < spectrum.length; i++) {
     stroke(spectrum[i]);
     point(frameCount % width, i);
   }
}
