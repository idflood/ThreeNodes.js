import processing.core.*; 
import processing.xml.*; 

import ddf.minim.*; 
import ddf.minim.analysis.*; 
import ddf.minim.effects.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class NodeSoundInput extends PApplet {



//import controlP5.*;


boolean use_line_in = true;

//ControlP5 controlP5;
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


public void setup()
{
  size(630, 300, P2D);
  frame.setLocation(800, 517);
  frameRate(30);
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
  /*
  controlP5 = new ControlP5(this);
  controlP5.begin(10,24);
  controlP5.addSlider("kick_min",1,8).linebreak();
  controlP5.addSlider("kick_max",2,12);
  controlP5.end();
  controlP5.begin(columnCenter,24);
  controlP5.addSlider("snare_low",4,26).linebreak();
  controlP5.addSlider("snare_max",4,26);
  controlP5.begin(columnCenter,24);

  controlP5.begin(columnRight,24);
  controlP5.addSlider("hat_low",4,26).linebreak();
  controlP5.addSlider("hat_max",4,26);
  controlP5.begin(columnRight,24);*/
}

public void draw()
{
  
  int offsetX = 40;
  smooth();
  float decay = 0.9f;
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
  /*
  drawAverages( offsetX, averagesY );
  drawAverages( columnCenter + offsetX, averagesY );
  drawAverages( columnRight + offsetX, averagesY );*/

  
  // draw the waveforms
  // the values returned by left.get() and right.get() will be between -1 and 1,
  // so we need to scale them up to see the waveform
  // note that if the file is MONO, left.get() and right.get() will return the same value
  stroke(255);
  int waveformX = 180;
  int waveformY = 200;
  /*for(int i = 0; i < player.left.size()-8; i+=8)
  {
    stroke( 10, 170, 255, 170 );
    line( waveformX + i/4, 50 + player.left.get(i)*16 + waveformY , waveformX + i/4+1, 50 + player.left.get(i+4)*10 + waveformY);
  }*/
  //beat.drawGraph(this);
  
  println(snd_kick_alpha);
  //controlP5.draw();
}

public void drawAverages( int dx, int dy ){
  int dh = 100;
  fill(255, 155);
  noStroke();
  for(int i = 0; i < numAvg-1; i++)
  {
    //float instant = spect.getAvg(i);
    float instant = spect.getBand(i);
    //line( 10 + i*2, height, 10 + i*2, height - instant);
    //int lheight = 
    rect( dx + i*(lineWidth+lineMargin), dh + dy, lineWidth, -(instant * i / 10) * 0.5f );
  }
}

public void stop()
{
  // always close Minim audio classes when you are done with them
  if( use_line_in == true){
    in.close();
  }else{
    player.close();
  }
  
  minim.stop();
  
  super.stop();
}

class BeatListener implements AudioListener
{
  private BeatDetect beat;
  private AudioInput source;
  private AudioPlayer source2;
  private boolean is_input = false;
  
  BeatListener(BeatDetect beat, AudioInput source)
  {
    this.is_input = true;
    this.source = source;
    this.source.addListener(this);
    this.beat = beat;
  }
  
  BeatListener(BeatDetect beat, AudioPlayer source)
  {
    this.source2 = source;
    this.source2.addListener(this);
    this.beat = beat;
  }
  
  public void samples(float[] samps)
  {
    if(is_input){
      beat.detect(source.left);
    }else{
      beat.detect(source2.left);
    }
    
  }
  
  public void samples(float[] sampsL, float[] sampsR)
  {
    if(is_input){
      beat.detect(source.left);
    }else{
      beat.detect(source2.left);
    }
  }
}



  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#FFFFFF", "NodeSoundInput" });
  }
}
