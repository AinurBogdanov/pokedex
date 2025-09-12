import React from 'react';
import styles from './Settings.module.scss';

export function InputToggleSection({ param, value }: { param: string; value: 'on' | 'off' }) {
  const [theme, setTheme] = React.useState(value);

  return (
    <>
      <div className={styles.section}>
        {param}

        <label className={styles.labelToggle}>
          <input type="checkbox" className={styles.toggleInput} />
          <div className={styles.toggleControl}></div>
        </label>
      </div>
    </>
  );
}
