import { useRef, useState } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';

type SpeechResultEvent = {
  results: { [index: number]: { [index: number]: { transcript: string } } };
};

type SpeechErrorEvent = {
  error?: string;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: SpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type VoiceCommand = {
  label: string;
  path?: string;
  opensChat?: boolean;
};

const includesAny = (text: string, phrases: string[]) => phrases.some(phrase => text.includes(phrase));

function findVoiceCommand(spokenText: string): VoiceCommand | null {
  const text = spokenText.toLowerCase().replace(/[?.!,]/g, '').replace(/\s+/g, ' ').trim();

  if (includesAny(text, ['open ai assistant', 'open agribot', 'talk to ai', 'ask ai', 'agribot'])) {
    return { label: 'AgriBot', opensChat: true };
  }
  if (includesAny(text, ['volunteer', 'assistance', 'i need help', 'request help', 'call volunteer', 'need help'])) {
    return { label: 'volunteer help', path: '/farmer/help' };
  }
  if (includesAny(text, ['track delivery', 'track my delivery', 'delivery status', 'where is my delivery', 'track my order', 'delivery'])) {
    return { label: 'delivery tracking', path: '/farmer/delivery' };
  }
  if (includesAny(text, ['rating', 'ratings', 'customer ratings', 'my ratings'])) {
    return { label: 'ratings', path: '/farmer/ratings' };
  }
  if (includesAny(text, ['reward', 'rewards', 'reward points', 'my rewards'])) {
    return { label: 'rewards', path: '/farmer/rewards' };
  }
  if (includesAny(text, ['pending payment', 'pending payments', 'show payments', 'my payments', 'payment', 'payments'])) {
    return { label: text.includes('pending') ? 'pending payments' : 'payments', path: text.includes('pending') ? '/farmer/payments?status=pending' : '/farmer/payments' };
  }
  if (includesAny(text, ['predict crop price', 'price prediction', 'ai price prediction', 'predict tomato price', 'predict price'])) {
    return { label: text.includes('tomato') ? 'AI Price Prediction for Tomato' : 'AI Price Prediction', path: text.includes('tomato') ? '/farmer/prices?view=prediction&crop=Tomato' : '/farmer/prices?view=prediction' };
  }
  if (includesAny(text, ['tomato history', 'tomato price'])) {
    return { label: 'Tomato price monitoring', path: text.includes('history') ? '/farmer/prices?view=history&crop=Tomato' : '/farmer/prices?crop=Tomato' };
  }
  if (includesAny(text, ['show crop prices', 'market prices', 'show price history', 'price history', 'crop price', 'crop prices'])) {
    return { label: 'crop price history', path: '/farmer/prices?view=history' };
  }
  if (includesAny(text, ['high demand', 'crop demand', 'local demand', 'demand'])) {
    return { label: text.includes('high demand') || text.includes('which crop') ? 'high-demand crops' : 'local crop demand', path: text.includes('high demand') || text.includes('which crop') ? '/farmer/demand?highlight=high' : '/farmer/demand' };
  }
  if (includesAny(text, ['sell crop', 'list crop', 'add crop', 'sell my crop'])) {
    return { label: 'Sell Crop', path: '/farmer/sell' };
  }
  if (includesAny(text, ['my crop listings', 'crop listings', 'open crops', 'check crops', 'show my crops', 'my crops', 'crops'])) {
    return { label: 'My Crops', path: '/farmer/crops' };
  }
  if (includesAny(text, ['delivered orders', 'show delivered order', 'ongoing orders', 'ongoing order'])) {
    return { label: text.includes('delivered') ? 'delivered orders' : 'ongoing orders', path: text.includes('delivered') ? '/farmer/orders?status=delivered' : '/farmer/orders?status=ongoing' };
  }
  if (includesAny(text, ['order', 'orders', 'open orders', 'check my orders', 'my orders'])) {
    return { label: 'orders', path: '/farmer/orders' };
  }

  return null;
}

export function VoiceAssistant({ onNavigate, onOpenChat }: { onNavigate: (path: string) => void; onOpenChat: () => void }) {
  const [listening, setListening] = useState(false);
  const [heardText, setHeardText] = useState('');
  const [status, setStatus] = useState('Tap the microphone and speak.');
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
      setStatus('Voice recognition is not supported in this browser. Please use the quick command buttons.');
      return;
    }

    const recognition = new SpeechRecognition();
    let receivedResult = false;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      receivedResult = true;
      const spoken = event.results[0][0].transcript.trim();
      setHeardText(spoken);
      setStatus('Processing your request...');
      const command = findVoiceCommand(spoken);
      window.setTimeout(() => {
        if (command?.opensChat) {
          setStatus('Opening AgriBot...');
          onOpenChat();
        } else if (command?.path) {
          setStatus(`Opening ${command.label}...`);
          onNavigate(command.path);
        } else {
          setStatus('I heard you, but I couldn’t match that command. Try saying “Show my orders”, “Show crop demand”, or “Track my delivery”.');
        }
      }, 350);
    };
    recognition.onerror = event => {
      setListening(false);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setStatus('Microphone permission is required for voice commands. You can use the quick command buttons instead.');
      } else if (event.error === 'no-speech') {
        setStatus('No voice command detected. Please try again.');
      } else {
        setStatus('Sorry, I couldn’t understand the voice command. Please try again.');
      }
    };
    recognition.onend = () => {
      setListening(false);
      if (!receivedResult) setStatus('No voice command detected. Please try again.');
    };
    recognitionRef.current = recognition;
    setHeardText('');
    setStatus('Listening...');
    setListening(true);
    try {
      recognition.start();
    } catch {
      setListening(false);
      setStatus('Sorry, I couldn’t start voice recognition. Please try again.');
    }
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
          {heardText && <p className="mt-1 text-xs font-semibold text-[hsl(var(--primary))]">You said: “{heardText}”</p>}
        </div>
      </div>
      <button type="button" onClick={startListening} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-3 text-sm font-bold text-[hsl(var(--primary-foreground))]" aria-label={listening ? 'Stop listening' : 'Start Voice Assistant'} data-testid="button-voice-assistant">
        {listening ? <Square size={16} /> : <Mic size={16} />}
        {listening ? 'Listening...' : 'Voice Assistant'}
      </button>
    </div>
  </section>;
}