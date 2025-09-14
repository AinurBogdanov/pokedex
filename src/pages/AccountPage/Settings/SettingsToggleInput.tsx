import styles from './Settings.module.scss';
import { useSettings, type Settings } from '../../../Context/SettingsContext';

export function InputToggleSection({ param }: { param: keyof Pick<Settings, 'darkTheme'> }) {
  const { settings, setSettings } = useSettings();

  function onToggleTheme() {
    const changedTheme = !settings[param];
    setSettings((prev) => ({ ...prev, [param]: changedTheme }));

    console.log(settings);
    // setSettings(updatedSettings);
  }

  return (
    <>
      <div className={styles.section}>
        {param}

        <label className={styles.labelToggle}>
          <input
            onChange={onToggleTheme}
            type="checkbox"
            checked={!settings[param]}
            className={styles.toggleInput}
          />
          <div className={styles.toggleControl}></div>
        </label>
      </div>
    </>
  );
}
