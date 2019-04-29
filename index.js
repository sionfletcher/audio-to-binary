var mic, fft;

function setup() {
   createCanvas(1,1);
   noFill();

   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT();
   fft.setInput(mic);
}

function draw() {
   background(200);

   var spectrum = fft.analyze();
   var body = document.body;
  
    var total = 0;
    for (i = 0; i < spectrum.length; i++) {
      total += spectrum[i];
    }
  
    // Sensitivity between 0...255
    if((total / spectrum.length) < 5) return;
      

   for (i = 0; i < spectrum.length / 4; i+= 8) {
     var a = spectrum[i];
     var bin = convertBase.dec2bin(a);
     bin = pad(bin, 8) + ' ';
     
     body.insertAdjacentHTML('beforeend', bin);
   }
  
  window.scrollTo(0,document.body.scrollHeight);
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var convertBase = function() {

    var ConvertBase = function (num) {
        return {
            from : function (baseFrom) {
                return {
                    to : function (baseTo) {
                        return parseInt(num, baseFrom).toString(baseTo);
                    }
                };
            }
        };
    };
        
    // binary to decimal
    ConvertBase.bin2dec = function (num) {
        return ConvertBase(num).from(2).to(10);
    };
    
    // binary to hexadecimal
    ConvertBase.bin2hex = function (num) {
        return ConvertBase(num).from(2).to(16);
    };
    
    // decimal to binary
    ConvertBase.dec2bin = function (num) {
        return ConvertBase(num).from(10).to(2);
    };
    
    // decimal to hexadecimal
    ConvertBase.dec2hex = function (num) {
        return ConvertBase(num).from(10).to(16);
    };
    
    // hexadecimal to binary
    ConvertBase.hex2bin = function (num) {
        return ConvertBase(num).from(16).to(2);
    };
    
    // hexadecimal to decimal
    ConvertBase.hex2dec = function (num) {
        return ConvertBase(num).from(16).to(10);
    };
    
    return ConvertBase;
    
}();