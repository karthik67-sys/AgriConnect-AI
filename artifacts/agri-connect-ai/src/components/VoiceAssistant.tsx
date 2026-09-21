import { useRef, useState } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';

type SpeechResultEvent = {
  results: { [index: number]: { [index: number]: { transcript: string } } };
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type VoiceCommand = {
  label: string;
  path: string;
};

function findVoiceCommand(spokenText: string): VoiceCommand | null {
  const text = spokenText.toLowerCase().replace(/[?.!,]/g, '').trim();
  const commands: { phrases: string[]; command: VoiceCommand }[] = [
    { phrases: ['predict tomato price'], command: { label: 'AI Price Prediction for Tomato', path: '/farmer/prices?view=prediction&crop=Tomato' } },
    { phrases: ['show price prediction'], command: { label: 'AI Price Prediction', path: '/farmer/prices?view=prediction' } },
    { phrases: ['which crop has high demand'], command: { label: 'high-demand crops', path: '/farmer/demand?highlight=high' } },
    { phrases: ['show ongoing orders'], command: { label: 'ongoing orders', path: '/farmer/orders?status=ongoing' } },
    { phrases: ['show delivered orders'], command: { label: 'delivered orders', path: '/farmer/orders?status=delivered' } },
    { phrases: ['show tomato price'], command: { label: 'Tomato price monitoring', path: '/farmer/prices?crop=Tomato' } },
    { phrases: ['show price history'], command: { label: 'crop price history', path: '/farmer/prices?view=history' } },
    { phrases: ['show pending payments'], command: { label: 'pending payments', path: '/farmer/payments?status=pending' } },
    { phrases: ['show my payments'], command: { label: 'payments', path: '/farmer/payments' } },
    { phrases: ['show crop demand'], command: { label: 'local crop demand', path: '/farmer/demand' } },
    { phrases: ['show my orders'], command: { label: 'orders', path: '/farmer/orders' } },
    { phrases: ['show my crops'], command: { label: 'My Crops', path: '/farmer/crops' } },
    { phrases: ['sell crop'], command: { label: 'Sell Crop', path: '/farmer/sell' } },
    { phrases: ['track my delivery'], command: { label: 'delivery tracking', path: '/farmer/delivery' } },
    { phrases: ['show ratings'], command: { label: 'ratings', path: '/farmer/ratings' } },
  ];

  return commands.find(({ phrases }) => phrases.some(phrase => text === phrase || text.includes(phrase)))?.command || null;
}

export function VoiceAssistant({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [listening, setListening] = useState(false);
  const [heardText, setHeardText] = useState('');
  const [status, setStatus] = useState('Tap the microphone and say a command.');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setStatus('Listening stopped. Tap the microphone to try again.');
  };

  const startListening = () => {
    if (listening) {
      stopListening();
      return;
    }

    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus('Voice recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      const spoken = event.results[0][0].transcript.trim();
      setHeardText(spoken);
      const command = findVoiceCommand(spoken);
      if (command) {
        setStatus(`Opening ${command.label}...`);
        onNavigate(command.path);
      } else {
        setStatus('I did not recognize that command. Try “Show my orders” or “Show tomato price”.');
      }
    };
    recognition.onerror = () => {
      setListening(false);
      setStatus('I could not hear that. Tap the microphone and try again.');
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setHeardText('');
    setStatus('Listening...');
    setListening(true);
    recognition.start();
  };

  return <section className="mb-5 rounded-2xl border border-[hsl(var(--primary)/.25)] bg-[hsl(var(--secondary))] p-5 shadow-sm sm:p-6" aria-label="Voice Assistant" data-testid="card-voice-assistant">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${listening ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'bg-[hsl(var(--accent))] text-[hsl(var(--primary))]'}`}>
          {listening ? <Volume2 size={22} className="animate-pulse" /> : <Mic size={22} />}
        </div>
        <div>
          <h2 className="font-display text-2xl">Voice Assistant</h2>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Speak to access features quickly</p>
          <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]" role="status">{status}</p>
          {heardText && <p className="mt-1 text-xs font-semibold text-[hsl(var(--primary))]">Heard: “{heardText}”</p>}
        </div>
      </div>
      <button type="button" onClick={startListening} className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold ${listening ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'}`} aria-label={listening ? 'Stop listening' : 'Start Voice Assistant'} data-testid="button-voice-assistant">
        {listening ? <Square size={16} /> : <Mic size={16} />}
        {listening ? 'Listening...' : 'Voice Assistant'}
      </button>
    </div>
  </section>;
}