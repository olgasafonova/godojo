const ctx = () => {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
};

let audioCtx: AudioContext | null = null;

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.3,
) {
  const c = ctx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

export function playCorrect() {
  playTone(523, 0.15); // C5
  setTimeout(() => playTone(659, 0.15), 100); // E5
  setTimeout(() => playTone(784, 0.25), 200); // G5
}

export function playWrong() {
  playTone(311, 0.3, "triangle", 0.25); // Eb4
  setTimeout(() => playTone(277, 0.4, "triangle", 0.2), 150); // Db4
}
