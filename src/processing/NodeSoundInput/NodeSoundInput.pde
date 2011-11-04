// websocket
import muthesius.net.*;
import org.webbitserver.*;

// sound
import ddf.minim.*;
import ddf.minim.analysis.*;

AudioPlayer player;
Minim minim;
BeatDetect beat;
BeatListener bl;

int sampleRate = 44100;
int timeSize = 1024;
FFT spect, spect2;
int numAvg;

AudioSource audio_cpy;
AudioInput in;

float snd_beat_alpha, snd_snare_alpha, snd_kick_alpha, snd_hat_alpha;

float getKick() {
  return snd_kick_alpha;
}

float get_snare() {
  return snd_snare_alpha;
}

float get_hat() {
  return snd_hat_alpha;
}

int kick_min = 1;
int kick_max = 4;
int snare_low = 11;
int snare_max = 18;
int hat_low = 20;
int hat_max = 24;

int lineWidth = 3;
int lineMargin = 1;
  
int columnCenter = 220;
int columnRight = 430;


WebSocketP5 socket;

boolean use_line_in = true;

void setup() {
  size(630, 300, P2D);
  frame.setLocation(800, 517);
  frameRate(30);
  
  socket = new WebSocketP5(this,8080);
  
  minim = new Minim(this);
  if (use_line_in == true) {
    // get a line in from Minim, default bit depth is 16
    in = minim.getLineIn(Minim.STEREO, timeSize);
    beat = new BeatDetect(in.bufferSize(), in.sampleRate());
    timeSize = in.bufferSize();
    sampleRate = (int) in.sampleRate();
    bl = new BeatListener(beat, in);
  } else {
    player = minim.loadFile("dripping.mp3", timeSize);
    player.loop();
    beat = new BeatDetect(player.bufferSize(), player.sampleRate());
    timeSize = player.bufferSize();
    sampleRate = (int) player.sampleRate();
    bl = new BeatListener(beat, player);
  }
  
  spect = new FFT(timeSize, sampleRate);
  spect.logAverages(60, 3);
  spect.window(FFT.HAMMING);
  
  spect2 = new FFT(timeSize, sampleRate);
  spect2.logAverages(60, 3);
  spect2.window(FFT.HAMMING);
  numAvg = spect.avgSize();
  
  beat.setSensitivity(600);
}


void draw()
{
  int offsetX = 40;
  smooth();
  float decay = 0.9;
  background(0);
  //stroke(255);
  if (use_line_in == true) {
    spect.forward(in.left);
    
    float buf2[] = in.left.toArray();
    spect2.forward( buf2 );
  } else {
    spect.forward(player.left);
    
    float buf2[] = player.left.toArray();
    spect2.forward( buf2 );
  }
  
  int averagesY = 90;
  
  int lower = kick_min;
  fill( 255, 70 );
  rect( offsetX + lower*(lineWidth + lineMargin), averagesY, (kick_max - lower) * (lineWidth + lineMargin), 100 );
  
  if( beat.isRange(kick_min, kick_max, 1) ) snd_kick_alpha = 1;
  // http://github.com/ddf/Minim/blob/master/src/ddf/minim/analysis/BeatDetect.java
  // l-318
  lower = snare_low >= numAvg ? numAvg : snare_low;
  int upper = snare_max - 1;
  if( lower >= upper ) lower = upper - 1;
  int thresh = (upper - lower) / 3 + 1;
  if( beat.isRange(lower, upper, thresh) ) snd_snare_alpha = 1;
  fill( 255, 70 );
  rect( offsetX + columnCenter + lower*(lineWidth + lineMargin), averagesY, (upper - lower) * (lineWidth + lineMargin), 100 );
  
  lower = hat_low < 0 ? 0 : hat_low;
  upper = hat_max;
  if( lower >= upper ) lower = upper - 1;
  fill( 255, 70 );
  rect( offsetX + columnRight + lower*(lineWidth + lineMargin), averagesY, (upper - lower) * (lineWidth + lineMargin), 100 );
  if( beat.isRange(lower, upper, 1) ) snd_hat_alpha = 1;
  
  fill( 255, snd_kick_alpha*255 );
  rect( offsetX, 10, 90, 2 );
  
  
  fill( 255, snd_hat_alpha*255 );
  rect( offsetX + columnCenter, 10, 90, 2 );
  
  fill( 255, snd_snare_alpha*255 );
  rect( offsetX + columnRight, 10, 90, 2 );
  
  snd_kick_alpha *= decay;
  snd_snare_alpha *= decay;
  snd_hat_alpha *= decay;
  //println(snd_kick_alpha);
  socket.broadcast("{\"kick\": " + snd_kick_alpha + ", \"snare\": " + snd_snare_alpha + ", \"hat\": " + snd_hat_alpha + "}");
}

void stop()
{
  // always close Minim audio classes when you are done with them
  if( use_line_in == true){
    in.close();
  }else{
    player.close();
  }
  
  minim.stop();
  //socket.stop();
  super.stop();
}
/*
void websocketOnMessage(WebSocketConnection con, String msg){
	println(msg);
}

void websocketOnOpen(WebSocketConnection con){
  println("A client joined");
}

void websocketOnClosed(WebSocketConnection con){
  println("A client left");
}*/

