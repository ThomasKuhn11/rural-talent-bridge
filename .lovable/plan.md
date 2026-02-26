

## Plan: Voice-to-Text for Professional Bio Field

### Context
Field workers in Brazil face high illiteracy rates. Adding a microphone button next to the bio textarea lets professionals dictate their bio instead of typing it. This uses the **browser's built-in Web Speech API** (SpeechRecognition) — no external services, no API keys, no edge functions needed. It works offline-capable and supports Portuguese natively.

### Changes

#### 1. New component: `src/components/VoiceTranscriptionButton.tsx`
- A microphone toggle button using the Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`)
- Sets language to `pt-BR` (matching app context) for accurate Portuguese transcription
- Continuous recognition mode — user speaks naturally, text appends to the bio
- Visual feedback: mic icon changes color/animates when recording
- Graceful fallback: if browser doesn't support Speech API, button is hidden

#### 2. Update `src/pages/Profile.tsx`
- Import and render `VoiceTranscriptionButton` next to the bio `Textarea` (only when editing, only for professional users)
- The button appends transcribed text to the current bio value

#### 3. Update `src/contexts/LanguageContext.tsx`
- Add translation keys: `profile.bioVoice` ("Speak your bio" / "Fale sua bio"), `profile.recording` ("Recording..." / "Gravando..."), `profile.voiceNotSupported` ("Voice not supported" / "Voz não suportada")

### Technical Details
- Uses `window.SpeechRecognition || window.webkitSpeechRecognition` (supported in Chrome, Edge, Safari, Android browsers — covers the vast majority of mobile users in Brazil)
- `continuous = true` and `interimResults = true` for real-time feedback
- `lang = 'pt-BR'` for Portuguese recognition
- No backend needed — runs entirely in the browser

