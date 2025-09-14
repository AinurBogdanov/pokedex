import { useDispatch, useSelector } from 'react-redux';
import settingsStyles from './Settings.module.scss';
import { InputSection } from './SettingsInput';
import { InputToggleSection } from './SettingsToggleInput';
import { selectUser, selectUserId } from '../../../redux/user/userSlice';
import { useSettings } from '../../../Context/SettingsContext';
import { updateUserInfo } from '../../../firebase/api/db';
import React from 'react';

export function Settings() {
  const uid = useSelector(selectUserId);
  const user = useSelector(selectUser);
  const { settings, setSettings } = useSettings();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [editable, setEditable] = React.useState(false);

  async function onSave() {
    if (uid) {
      setIsLoading(true);
      await updateUserInfo(settings, uid, dispatch);
      setIsLoading(false);
    }
  }

  function onReset() {
    const { displayName, email, phoneNumber, city, darkTheme } = user;
    setSettings(() => ({
      displayName: displayName || '',
      email: email || '',
      phoneNumber: phoneNumber || '',
      city: city || '',
      darkTheme: darkTheme ?? false,
    }));
  }

  return (
    <div className={settingsStyles.settingsCont}>
      <InputSection editable={editable} param="displayName" placeholder={'enter name'} />
      <InputSection editable={editable} param="email" placeholder={'enter gmail'} />
      <InputSection editable={editable} param="phoneNumber" placeholder={'enter number'} />
      <InputSection editable={editable} param="city" placeholder={'enter city'} />
      <InputToggleSection param="darkTheme" />

      <div className={settingsStyles.settingsController}>
        <button onClick={() => setEditable(!editable)} className={settingsStyles.editBtn}>
          {editable ? 'Stop' : 'Edit'}
        </button>
        <button
          className={settingsStyles.controlBtn}
          style={{ cursor: isLoading ? 'wait' : 'pointer' }}
          onClick={onSave}
        >
          <img src="/images/diskette.png" alt="" />
        </button>
        <button onClick={onReset} className={settingsStyles.controlBtn}>
          <img src="/images/undo.png" alt="" />
        </button>
      </div>
    </div>
  );
}
