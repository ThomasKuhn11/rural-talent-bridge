

## Plan: Voice Transcription for Messages

### Changes

#### 1. Update `src/pages/Messages.tsx`
- Import `VoiceTranscriptionButton`
- Add the mic button next to the message input field (beside the Send button)
- On transcript, append text to `newMessage` state

The `VoiceTranscriptionButton` component already exists and handles all Speech API logic, language detection, and fallback. This is a simple integration.

