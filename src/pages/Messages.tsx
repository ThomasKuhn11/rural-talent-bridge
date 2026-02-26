import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useMessages, useProfessionalProfiles, useEmployerProfiles } from '@/hooks/useData';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  User, 
  Building2, 
  Send,
  ArrowLeft
} from 'lucide-react';
import { VoiceTranscriptionButton } from '@/components/VoiceTranscriptionButton';
import { cn } from '@/lib/utils';

const Messages = () => {
  const { recipientId } = useParams<{ recipientId: string }>();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    getConversation, 
    getConversationPartners, 
    sendMessage,
    markAsRead 
  } = useMessages();
  const { profiles: professionalProfiles } = useProfessionalProfiles();
  const { profiles: employerProfiles } = useEmployerProfiles();
  const navigate = useNavigate();
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationPartners = user ? getConversationPartners(user.id) : [];
  const currentConversation = user && recipientId ? getConversation(user.id, recipientId) : [];

  const getRecipientInfo = (recipientId: string) => {
    const professional = professionalProfiles.find(p => p.userId === recipientId);
    if (professional) {
      return { name: professional.fullName, type: 'professional', photoUrl: professional.photoUrl };
    }
    const employer = employerProfiles.find(p => p.userId === recipientId);
    if (employer) {
      return { name: employer.companyName, type: 'employer', photoUrl: employer.photoUrl };
    }
    return { name: 'Usuário', type: 'unknown', photoUrl: undefined };
  };

  // Mark messages as read when viewing conversation
  useEffect(() => {
    if (user && recipientId && currentConversation.length > 0) {
      const unreadMessageIds = currentConversation
        .filter(m => m.toUserId === user.id && !m.read)
        .map(m => m.id);
      if (unreadMessageIds.length > 0) {
        markAsRead(unreadMessageIds);
      }
    }
  }, [user, recipientId, currentConversation, markAsRead]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation]);

  const handleSendMessage = () => {
    if (!user || !recipientId || !newMessage.trim()) return;
    
    sendMessage(user.id, recipientId, newMessage.trim());
    setNewMessage('');
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  // Show conversation list if no recipient selected
  if (!recipientId) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-6">{t('nav.messages')}</h1>

          {conversationPartners.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">{t('messages.noMessages')}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {conversationPartners.map(partnerId => {
                const info = getRecipientInfo(partnerId);
                const conversation = user ? getConversation(user.id, partnerId) : [];
                const lastMessage = conversation[conversation.length - 1];
                const unreadCount = conversation.filter(m => m.toUserId === user?.id && !m.read).length;

                return (
                  <Card 
                    key={partnerId}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/messages/${partnerId}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={info.photoUrl} alt={info.name} />
                          <AvatarFallback className="bg-muted">
                            {info.type === 'employer' ? (
                              <Building2 className="h-6 w-6 text-muted-foreground" />
                            ) : (
                              <User className="h-6 w-6 text-muted-foreground" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-foreground truncate">{info.name}</h3>
                            {lastMessage && (
                              <span className="text-xs text-muted-foreground">
                                {formatDate(lastMessage.createdAt)}
                              </span>
                            )}
                          </div>
                          {lastMessage && (
                            <p className="text-sm text-muted-foreground truncate">
                              {lastMessage.body}
                            </p>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xs text-primary-foreground font-medium">
                              {unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </AppLayout>
    );
  }

  // Show conversation view
  const recipientInfo = getRecipientInfo(recipientId);

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-180px)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/messages')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={recipientInfo.photoUrl} alt={recipientInfo.name} />
            <AvatarFallback className="bg-muted">
              {recipientInfo.type === 'employer' ? (
                <Building2 className="h-5 w-5 text-muted-foreground" />
              ) : (
                <User className="h-5 w-5 text-muted-foreground" />
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground">{recipientInfo.name}</h2>
          </div>
        </div>

        {/* Messages */}
        <Card className="flex-1 overflow-hidden">
          <CardContent className="p-4 h-full overflow-y-auto">
            {currentConversation.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                {t('messages.startConversation')}
              </div>
            ) : (
              <div className="space-y-4">
                {currentConversation.map(message => {
                  const isOwn = message.fromUserId === user?.id;
                  
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        isOwn ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-4 py-2",
                          isOwn 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-foreground"
                        )}
                      >
                        <p className="text-sm">{message.body}</p>
                        <p 
                          className={cn(
                            "text-xs mt-1",
                            isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}
                        >
                          {formatTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Input */}
        <div className="flex gap-2 mt-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t('messages.typeMessage')}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <VoiceTranscriptionButton
            onTranscript={(text) => setNewMessage(prev => prev ? `${prev} ${text}` : text)}
          />
          <Button onClick={handleSendMessage} size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
