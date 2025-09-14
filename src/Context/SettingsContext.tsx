import React from 'react';
import { createContext, useContext } from 'react';
import { selectUser } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

export type Settings = {
  displayName: string;
  email: string;
  phoneNumber: string;
  city: string;
  darkTheme: boolean;
};

type SettingsContextType = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const user = useSelector(selectUser);
  const { displayName, email, phoneNumber, city, darkTheme } = user;

  React.useEffect(() => {
    if (user) {
      setSettings({
        displayName: user.displayName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        city: user.city || '',
        darkTheme: user.darkTheme || false,
      });
    }
  }, [user]);

  const [settings, setSettings] = React.useState<Settings>({
    displayName: displayName || '',
    email: email || '',
    phoneNumber: phoneNumber || '',
    city: city || '',
    darkTheme: darkTheme || false,
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be inside SettingsProvider');
  return ctx;
}
