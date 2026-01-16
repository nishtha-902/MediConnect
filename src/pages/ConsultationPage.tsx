import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare, 
  Send,
  FileText,
  Settings,
  Maximize2,
  X,
  Languages
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  content: string;
  timestamp: Date;
}

interface TranscriptLine {
  id: string;
  speaker: string;
  text: string;
  timestamp: Date;
}

const ConsultationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'doctor', content: 'Hello! How can I help you today?', timestamp: new Date() },
  ]);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([
    { id: '1', speaker: 'Dr. Sarah Williams', text: 'Hello! How can I help you today?', timestamp: new Date() },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate real-time transcript updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newLine: TranscriptLine = {
          id: Date.now().toString(),
          speaker: Math.random() > 0.5 ? 'Dr. Sarah Williams' : 'You',
          text: Math.random() > 0.5 
            ? 'I understand your concern. Let me explain...'
            : 'Yes, I have been experiencing that symptom.',
          timestamp: new Date(),
        };
        setTranscript(prev => [...prev, newLine]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'patient',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate doctor response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        content: 'Thank you for sharing that information. Let me review your symptoms.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleEndCall = () => {
    toast({
      title: "Consultation Ended",
      description: "Your session summary will be sent to your email.",
    });
    navigate('/dashboard');
  };

  return (
    <div className="h-screen bg-foreground flex flex-col">
      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Main Video (Doctor) */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
          <div className="text-center text-background/50">
            <Video className="h-20 w-20 mx-auto mb-4" />
            <p className="text-lg font-medium">Dr. Sarah Williams</p>
            <p className="text-sm">Video call in progress...</p>
          </div>
        </div>

        {/* Self Video (Patient) */}
        <div className="absolute bottom-4 right-4 w-48 h-36 bg-muted rounded-xl shadow-lg flex items-center justify-center border-2 border-background/20">
          {isVideoOn ? (
            <div className="text-background/50 text-center">
              <Video className="h-8 w-8 mx-auto mb-2" />
              <p className="text-xs">You</p>
            </div>
          ) : (
            <VideoOff className="h-8 w-8 text-background/50" />
          )}
        </div>

        {/* Doctor Name Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-3 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="h-3 w-3 bg-success rounded-full animate-pulse" />
            <span className="font-medium text-foreground">Dr. Sarah Williams</span>
          </div>
        </div>

        {/* Consultation Timer */}
        <div className="absolute top-4 right-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <span className="font-mono text-foreground">12:34</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-background border-t border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant={isAudioOn ? 'secondary' : 'destructive'}
              size="icon"
              onClick={() => setIsAudioOn(!isAudioOn)}
              className="rounded-full h-12 w-12"
            >
              {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            <Button
              variant={isVideoOn ? 'secondary' : 'destructive'}
              size="icon"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className="rounded-full h-12 w-12"
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant={isChatOpen ? 'default' : 'secondary'}
              size="icon"
              onClick={() => { setIsChatOpen(!isChatOpen); setIsTranscriptOpen(false); }}
              className="rounded-full h-12 w-12"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant={isTranscriptOpen ? 'default' : 'secondary'}
              size="icon"
              onClick={() => { setIsTranscriptOpen(!isTranscriptOpen); setIsChatOpen(false); }}
              className="rounded-full h-12 w-12"
            >
              <Languages className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full h-12 w-12"
            >
              <FileText className="h-5 w-5" />
            </Button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              onClick={handleEndCall}
              className="rounded-full px-6"
            >
              <Phone className="h-5 w-5 mr-2" />
              End Call
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="absolute right-4 bottom-24 w-80 h-96 bg-background rounded-xl shadow-2xl border border-border flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">Chat</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2 ${
                      msg.sender === 'patient'
                        ? 'gradient-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Transcript Panel */}
      {isTranscriptOpen && (
        <div className="absolute right-4 bottom-24 w-96 h-96 bg-background rounded-xl shadow-2xl border border-border flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Live Transcription</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsTranscriptOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {transcript.map((line) => (
                <div key={line.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${
                      line.speaker === 'You' ? 'text-primary' : 'text-accent'
                    }`}>
                      {line.speaker}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {line.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{line.text}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-3 border-t bg-muted/50">
            <p className="text-xs text-muted-foreground text-center">
              🎙️ Transcription is active and recording
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationPage;
