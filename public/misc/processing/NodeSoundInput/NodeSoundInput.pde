// websocket
import muthesius.net.*;
import org.webbitserver.*;

// sound
import ddf.minim.*;
import ddf.minim.analysis.*;

// sound input option
boolean use_line_in = true;
String mp3_filename = "dripping.mp3";

AudioPlayer player;
Minim minim;
BeatDetect beat;
BeatListener bl;

int sampleRate = 44100;
int timeSize = 1024;
FFT spect;
int numAvg;

AudioSource audio_cpy;
AudioInput in;

float snd_beat_alpha, snd_snare_alpha, snd_kick_alpha, snd_hat_alpha;

int kick_min = 1;
int kick_max = 4;
int snare_low = 11;
int snare_max = 18;
int hat_low = 20;
int hat_max = 24;
  
int columnCenter = 220;
int columnRight = 430;

WebSocketP5 socket;

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
    player = minim.loadFile(mp3_filename, timeSize);
    player.loop();
    beat = new BeatDetect(player.bufferSize(), player.sampleRate());
    timeSize = player.bufferSize();
    sampleRate = (int) player.sampleRate();
    bl = new BeatListener(beat, player);
  }
  
  spect = new FFT(timeSize, sampleRate);
  spect.logAverages(60, 3);
  spect.window(FFT.HAMMING);
  numAvg = spect.avgSize();
  
  beat.setSensitivity(600);
}

void draw()
{
  background(0);
  
  process_fft();
  get_custom_beat();
  draw_sound_graphic();
  
  socket.broadcast("{\"kick\": " + snd_kick_alpha + ", \"snare\": " + snd_snare_alpha + ", \"hat\": " + snd_hat_alpha + "}");
  
  fade_out_beat_alpha();
}

void fade_out_beat_alpha () {
  float decay = 0.9;
  snd_kick_alpha *= decay;
  snd_snare_alpha *= decay;
  snd_hat_alpha *= decay;
}

void get_custom_beat() {
  int lower = kick_min;
  
  if( beat.isRange(kick_min, kick_max, 1) ) snd_kick_alpha = 1;
  lower = snare_low >= numAvg ? numAvg : snare_low;
  int upper = snare_max - 1;
  if( lower >= upper ) lower = upper - 1;
  int thresh = (upper - lower) / 3 + 1;
  if( beat.isRange(lower, upper, thresh) ) snd_snare_alpha = 1;

  lower = hat_low < 0 ? 0 : hat_low;
  upper = hat_max;
  if( lower >= upper ) lower = upper - 1;
  if( beat.isRange(lower, upper, 1) ) snd_hat_alpha = 1;
}

void process_fft() {
  if (use_line_in == true) {
    float buf2[] = in.left.toArray();
    spect.forward( buf2 );
  } else {
    float buf2[] = player.left.toArray();
    spect.forward( buf2 );
  }
}

void draw_sound_graphic() {
  int offsetX = 40;
  int averagesY = 90;
  fill( 255, snd_kick_alpha*255 );
  rect( offsetX, 10, 90, 2 );
  
  fill( 255, snd_hat_alpha*255 );
  rect( offsetX + columnCenter, 10, 90, 2 );
  
  fill( 255, snd_snare_alpha*255 );
  rect( offsetX + columnRight, 10, 90, 2 );
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
  socket.stop();
  super.stop();
}

