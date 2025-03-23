
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Mail, LogOut, Upload, X, Check, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    async function getProfile() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }
    
    getProfile();
  }, [user, navigate]);

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Необходимо выбрать изображение');
      }
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user!.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Check if the file is an image and not too large
      if (!file.type.startsWith('image/')) {
        throw new Error('Пожалуйста, загрузите изображение');
      }
      
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('Изображение должно быть меньше 2MB');
      }
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL of the uploaded file
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const avatarUrl = data.publicUrl;
      
      // Update the user's profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user!.id);
        
      if (updateError) {
        throw updateError;
      }
      
      setAvatarUrl(avatarUrl);
      toast({
        title: "Аватар обновлен",
        description: "Ваш аватар успешно обновлен",
      });
      
    } catch (error: any) {
      toast({
        title: "Ошибка загрузки аватара",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  }

  const getInitials = () => {
    if (username) return username.substring(0, 2).toUpperCase();
    if (user?.email) return user.email.substring(0, 1).toUpperCase();
    return 'U';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-8">
        <h1 className="text-2xl font-bold mb-8">Личный кабинет</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="items-center text-center">
                <div className="relative mb-4 group">
                  <Avatar className="w-24 h-24 border-2 border-white shadow-md">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt="Аватар пользователя" />
                    ) : (
                      <AvatarFallback className="bg-dns-blue text-white text-lg">
                        {getInitials()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute bottom-0 right-0 w-8 h-8 bg-dns-blue text-white rounded-full flex items-center justify-center cursor-pointer shadow-md"
                  >
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={uploadAvatar}
                      disabled={uploading}
                      className="hidden"
                    />
                    {uploading ? (
                      <span className="animate-spin">⟳</span>
                    ) : (
                      <Camera size={14} />
                    )}
                  </label>
                </div>
                
                <CardTitle className="mb-2">
                  {username || 'Пользователь'}
                </CardTitle>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={signOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Выйти из аккаунта
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Личные данные</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <User className="text-gray-500 mr-3" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Имя пользователя</p>
                        <p className="font-medium">{username || 'Не указано'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Mail className="text-gray-500 mr-3" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>История заказов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">У вас пока нет заказов</h3>
                  <p className="text-gray-500 mb-4">
                    Перейдите в каталог, чтобы совершить первую покупку
                  </p>
                  <Button onClick={() => navigate('/catalog')}>
                    Перейти в каталог
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
