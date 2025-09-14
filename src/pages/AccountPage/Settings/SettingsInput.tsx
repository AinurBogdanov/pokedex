import { useSettings, type Settings } from '../../../Context/SettingsContext';
import settingsStyles from './Settings.module.scss';
import React from 'react';

export function InputSection<K extends keyof Omit<Settings, 'darkTheme'>>({
  param,
  placeholder,
  editable,
}: {
  param: K;
  placeholder?: string;
  editable: boolean;
}) {
  const inputRef = React.useRef(null);
  const { settings, setSettings } = useSettings();

  function handleInputChange(e) {
    if (editable) {
      setSettings((prev) => ({ ...prev, [param]: e.target.value }));
    }
  }

  const value = settings[param];

  return (
    <div className={settingsStyles.section}>
      {param}
      <input
        ref={inputRef}
        className={settingsStyles.input + ' ' + (editable ? settingsStyles.editable : '')}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        disabled={editable === false}
      />
    </div>
  );
}
