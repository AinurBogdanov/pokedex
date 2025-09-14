import styles from './Settings.module.scss';
import { useSettings, type Settings } from '../../../Context/SettingsContext';
import { useDispatch } from 'react-redux';
import { updateTheme } from '../../../redux/user/userSlice';

export function InputToggleSection({ param }: { param: keyof Pick<Settings, 'darkTheme'> }) {
  const { settings, setSettings } = useSettings();
  const dispatch = useDispatch();

  function onToggleTheme() {
    setSettings((prev) => {
      setTimeout(() => {
        dispatch(updateTheme(!prev[param]));
      }, 400);

      return { ...prev, [param]: !prev[param] };
    });
    // setSettings(updateSettings);
  }

  //settings полсле сохранения равны false
  return (
    <>
      <div className={styles.section}>
        {param}

        <label className={styles.labelToggle}>
          <input
            onChange={onToggleTheme}
            type="checkbox"
            checked={settings[param]}
            className={styles.toggleInput}
          />
          <div className={styles.toggleControl}></div>
        </label>
      </div>
    </>
  );
}
