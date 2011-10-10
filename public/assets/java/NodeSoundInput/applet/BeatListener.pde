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
  
  void samples(float[] samps)
  {
    if(is_input){
      beat.detect(source.left);
    }else{
      beat.detect(source2.left);
    }
    
  }
  
  void samples(float[] sampsL, float[] sampsR)
  {
    if(is_input){
      beat.detect(source.left);
    }else{
      beat.detect(source2.left);
    }
  }
}
