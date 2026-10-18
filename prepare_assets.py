import os
import shutil
import math
import struct
import wave
import subprocess
import asyncio
import edge_tts

PROJECT_DIR = r"C:\Users\Bhoomika\.gemini\antigravity-ide\scratch\sai-intelliverse-reel"
PUBLIC_DIR = os.path.join(PROJECT_DIR, "public")
IMAGES_DIR = os.path.join(PUBLIC_DIR, "images")
AUDIO_DIR = os.path.join(PUBLIC_DIR, "audio")
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(AUDIO_DIR, exist_ok=True)

FFMPEG = r"C:\Users\Bhoomika\AppData\Roaming\Python\Python314\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"

# Copy images
img_srcs = [
    r"C:\Users\Bhoomika\.gemini\antigravity-ide\brain\a8935d08-982c-4974-9840-f8ddf2bca363\scene1_android_bootup_1792301157385.jpg",
    r"C:\Users\Bhoomika\.gemini\antigravity-ide\brain\a8935d08-982c-4974-9840-f8ddf2bca363\scene2_gravity_override_1792301176038.jpg",
    r"C:\Users\Bhoomika\.gemini\antigravity-ide\brain\a8935d08-982c-4974-9840-f8ddf2bca363\scene3_the_convergence_1792301198782.jpg",
    r"C:\Users\Bhoomika\.gemini\antigravity-ide\brain\a8935d08-982c-4974-9840-f8ddf2bca363\scene4_title_reveal_1792301221580.jpg"
]

for idx, src in enumerate(img_srcs, 1):
    dst = os.path.join(IMAGES_DIR, f"scene{idx}.jpg")
    shutil.copy2(src, dst)
    print(f"Copied {src} -> {dst}")

# Generate Synthetic Sounds
SAMPLE_RATE = 44100

def create_subbass_drop():
    # Massive cinematic sub-bass drop at 0:12: 80Hz sweep down to 25Hz with harmonic saturation
    duration = 3.0
    num_samples = int(duration * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        # Exponential frequency drop from 95Hz to 24Hz
        freq = 24.0 + (95.0 - 24.0) * math.exp(-t * 2.8)
        phase = 2 * math.pi * (24.0 * t + (95.0 - 24.0) * (1 - math.exp(-t * 2.8)) / 2.8)
        
        # Fundamental sine + second harmonic + third harmonic saturation
        val1 = math.sin(phase)
        val2 = 0.35 * math.sin(phase * 2.0)
        val3 = 0.15 * math.sin(phase * 3.0)
        
        # Attack fast (0.01s), exponential decay
        if t < 0.02:
            env = t / 0.02
        else:
            env = math.exp(-(t - 0.02) * 1.1)
        
        sample = (val1 + val2 + val3) * env
        # Soft clipping
        sample = math.tanh(sample * 1.8) * 0.95
        samples.append(int(sample * 32767))
        
    path = os.path.join(AUDIO_DIR, "subbass_drop.wav")
    with wave.open(path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(struct.pack(f'<{len(samples)}h', *samples))
    print(f"Generated {path}")

def create_riser():
    # 2-second tension riser building up to 0:12
    duration = 2.0
    num_samples = int(duration * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        # Frequency rise from 100Hz to 1200Hz
        freq = 100.0 + 1100.0 * (t / duration) ** 2
        phase = 2 * math.pi * (100.0 * t + 1100.0 * (t ** 3) / (3 * duration ** 2))
        saw = 2.0 * (phase / (2 * math.pi) - math.floor(phase / (2 * math.pi) + 0.5))
        # Tremolo / stutter effect accelerating
        tremolo = 0.5 + 0.5 * math.sin(2 * math.pi * (4.0 + 20.0 * (t / duration)) * t)
        env = (t / duration) ** 1.5
        sample = saw * tremolo * env * 0.5
        samples.append(int(sample * 32767))
        
    path = os.path.join(AUDIO_DIR, "riser.wav")
    with wave.open(path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(struct.pack(f'<{len(samples)}h', *samples))
    print(f"Generated {path}")

def create_sci_fi_ambience():
    # 15 seconds cinematic dark ambient cyber drone with pulsing bass & matrix glitch sweeps
    duration = 15.0
    num_samples = int(duration * SAMPLE_RATE)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        # Low drone around 55Hz (A1) and 82.4Hz (E2)
        drone = 0.4 * math.sin(2 * math.pi * 55.0 * t) + 0.25 * math.sin(2 * math.pi * 82.4 * t)
        # Pulsing LFO at 1.5 Hz
        pulse = 0.7 + 0.3 * math.sin(2 * math.pi * 1.5 * t)
        
        # Cyber arpeggio pulse
        note_freqs = [110.0, 130.81, 164.81, 196.0, 220.0, 261.63]
        step = int(t * 4) % len(note_freqs)
        sub_t = (t * 4) - int(t * 4)
        arp_env = math.exp(-sub_t * 5.0)
        arp = 0.2 * math.sin(2 * math.pi * note_freqs[step] * t) * arp_env
        
        # Fade out slightly before 12s so the sub-bass drop dominates
        fade = 1.0
        if 11.5 < t < 12.0:
            fade = 1.0 - (t - 11.5) / 0.5 * 0.7
        elif t >= 12.0:
            fade = 0.35 # keep subtle low drone in background of title reveal
            
        sample = (drone * pulse + arp) * fade * 0.6
        samples.append(int(max(-1.0, min(1.0, sample)) * 32767))
        
    path = os.path.join(AUDIO_DIR, "ambience.wav")
    with wave.open(path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(struct.pack(f'<{len(samples)}h', *samples))
    print(f"Generated {path}")

async def generate_and_process_voiceovers():
    # Generate raw edge-tts
    lines = [
        ("raw_vo1.mp3", "System diagnostic complete. Disengaging standard physics.", "en-US-ChristopherNeural", "-12%", "-12Hz"),
        ("raw_vo2.mp3", "Local gravity fields: Overridden.", "en-US-ChristopherNeural", "-8%", "-10Hz"),
        ("raw_vo3.mp3", "Welcome to the next dimension.", "en-US-ChristopherNeural", "-8%", "-14Hz"),
    ]
    
    for filename, text, voice, rate, pitch in lines:
        raw_path = os.path.join(AUDIO_DIR, filename)
        communicate = edge_tts.Communicate(text, voice=voice, rate=rate, pitch=pitch)
        await communicate.save(raw_path)
        
        # Now apply robotic android drone audio DSP filter via FFmpeg:
        # flanger + slight metallic echo + bass boost + presence
        out_name = filename.replace("raw_", "robot_").replace(".mp3", ".wav")
        out_path = os.path.join(AUDIO_DIR, out_name)
        
        cmd = [
            FFMPEG, "-y", "-i", raw_path,
            "-af", "bass=g=5:f=120,treble=g=3:f=3500,flanger=delay=2:depth=1.5:regen=40:width=60:speed=0.6,aecho=0.8:0.7:30:0.35",
            out_path
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"Generated cybernetic VO: {out_path}")

create_subbass_drop()
create_riser()
create_sci_fi_ambience()
asyncio.run(generate_and_process_voiceovers())
print("Assets prepared successfully!")
