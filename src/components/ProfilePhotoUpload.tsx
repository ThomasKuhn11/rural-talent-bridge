import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Camera, Loader2, User, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProfilePhotoUploadProps {
  userId: string;
  currentPhotoUrl?: string;
  onPhotoUploaded: (url: string) => void;
  isEditing?: boolean;
  fallbackIcon?: 'user' | 'building';
  size?: 'sm' | 'lg';
}

export const ProfilePhotoUpload = ({
  userId,
  currentPhotoUrl,
  onPhotoUploaded,
  isEditing = false,
  fallbackIcon = 'user',
  size = 'lg',
}: ProfilePhotoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const sizeClasses = size === 'lg' ? 'h-20 w-20' : 'h-14 w-14';
  const iconSize = size === 'lg' ? 'h-10 w-10' : 'h-7 w-7';
  const cameraSize = size === 'lg' ? 'h-8 w-8' : 'h-6 w-6';

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const filePath = `${userId}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(filePath);

      // Append timestamp to bust cache
      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      onPhotoUploaded(publicUrl);
      toast.success(t('profile.saved'));
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const FallbackIcon = fallbackIcon === 'building' ? Building2 : User;

  return (
    <div className="relative group">
      <Avatar className={cn(sizeClasses, 'cursor-pointer')} onClick={() => isEditing && fileInputRef.current?.click()}>
        <AvatarImage src={currentPhotoUrl} alt="Profile" />
        <AvatarFallback className="bg-muted">
          {isUploading ? (
            <Loader2 className={cn(iconSize, 'text-muted-foreground animate-spin')} />
          ) : (
            <FallbackIcon className={cn(iconSize, 'text-muted-foreground')} />
          )}
        </AvatarFallback>
      </Avatar>

      {isEditing && !isUploading && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center',
            cameraSize
          )}
        >
          <Camera className="h-4 w-4" />
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};
