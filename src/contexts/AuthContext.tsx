import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/supabaseClient';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<{ error: any }>;
  loading: boolean;
  showProfileSetup: boolean;
  setShowProfileSetup: (show: boolean) => void;
  profileComplete: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileComplete, setProfileComplete] = useState(true);
  const navigate = useNavigate();

  // Check if user has completed profile
  const checkProfileComplete = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, age')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error checking profile:', error);
        return false;
      }

      // Consider profile complete if both username and age are set
      const isComplete = !!(data?.username && data?.age);
      setProfileComplete(isComplete);
      
      // If not complete and user is authenticated, show the profile setup
      if (!isComplete && session) {
        setShowProfileSetup(true);
      }
      
      return isComplete;
    } catch (error) {
      console.error('Error in profile check:', error);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle authentication events
        if (event === 'SIGNED_IN') {
          if (session?.user) {
            // Check if profile is complete
            const isComplete = await checkProfileComplete(session.user.id);
            if (!isComplete) {
              setShowProfileSetup(true);
            } else {
              navigate('/dashboard');
            }
          }
        } else if (event === 'SIGNED_OUT') {
          navigate('/auth');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkProfileComplete(session.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error };
  };

  const resendConfirmationEmail = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    signIn,
    signUp,
    signOut,
    resendConfirmationEmail,
    loading,
    showProfileSetup,
    setShowProfileSetup,
    profileComplete,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
