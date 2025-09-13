import React from 'react';
import styles from './Auth.module.scss';
import { SignUpForm } from './SignUpForm/SignUpForm';
import { LogInForm } from './LoginForm/LoginForm';

type FormType = 'signIn' | 'signUp';

export default function Auth() {
  const [formType, setFormType] = React.useState<FormType>('signIn');

  return (
    <div className={styles.authWrap}>
      {formType === 'signUp' ? (
        <SignUpForm setFormType={setFormType} />
      ) : (
        <LogInForm setFormType={setFormType} />
      )}
    </div>
  );
}
