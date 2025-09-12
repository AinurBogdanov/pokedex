import settingsStyles from './Settings.module.scss';
import { InputSection } from './SettingsInput';
import { InputToggleSection } from './SettingsToggleInput';
export function Settings() {
  return (
    <div className={settingsStyles.settingsCont}>
      <InputSection param="Display name" value="Ainur Bogdanov" />
      <InputSection param={'Gmail'} value={'ainurBogdanov69@gmail.com'} />
      <InputToggleSection param={'Dark theme'} value={'off'} />
      {/* <div className={settingsStyles.currentName}>Ainur</div> */}
      {/* <button className={styles.signOutButton} onClick={onSignOut}>
        Sign out
      </button> */}
    </div>
  );
}
