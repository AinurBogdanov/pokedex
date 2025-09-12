import settingsStyles from './Settings.module.scss';
import React from 'react';

export function InputSection({ param, value }: { param: string; value: string }) {
  const [text, setText] = React.useState(value);
  const [isEditing, setIsEditing] = React.useState(false);
  const [draftText, setDraftText] = React.useState(text);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    } else setDraftText(text);
  }, [isEditing]);

  function onEditBtn() {
    setIsEditing(!isEditing);
  }

  function handleInputChange(e) {
    if (isEditing) {
      setDraftText(e.target.value);
    }
  }

  return (
    <div className={settingsStyles.section}>
      {param}
      <input
        ref={inputRef}
        className={settingsStyles.input}
        type="text"
        placeholder="name"
        value={draftText}
        onChange={handleInputChange}
        disabled={!isEditing}
      />
      <span onClick={onEditBtn} className={settingsStyles.editBtn}>
        {isEditing ? 'Reset' : 'Edit'}
      </span>
    </div>
  );
}
