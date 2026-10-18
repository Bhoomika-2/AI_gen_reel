import asyncio
import edge_tts
import os
import subprocess

async def generate_voiceovers():
    assets_dir = r"C:\Users\Bhoomika\.gemini\antigravity-ide\scratch\sai-intelliverse-reel\audio"
    os.makedirs(assets_dir, exist_ok=True)
    
    # Scene 1: "System diagnostic complete. Disengaging standard physics."
    # Scene 2: "Local gravity fields: Overridden."
    # Scene 3: "Welcome to the next dimension."
    
    lines = [
        ("vo_scene1.mp3", "System diagnostic complete. Disengaging standard physics.", "en-US-ChristopherNeural", "-15%", "-10Hz"),
        ("vo_scene2.mp3", "Local gravity fields: Overridden.", "en-US-ChristopherNeural", "-10%", "-10Hz"),
        ("vo_scene3.mp3", "Welcome to the next dimension.", "en-US-ChristopherNeural", "-10%", "-12Hz"),
    ]
    
    for filename, text, voice, rate, pitch in lines:
        filepath = os.path.join(assets_dir, filename)
        print(f"Generating {filename}...")
        communicate = edge_tts.Communicate(text, voice=voice, rate=rate, pitch=pitch)
        await communicate.save(filepath)
        print(f"Saved {filepath} ({os.path.getsize(filepath)} bytes)")

if __name__ == "__main__":
    asyncio.run(generate_voiceovers())
