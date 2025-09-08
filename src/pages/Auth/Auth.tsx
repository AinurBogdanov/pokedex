import React from 'react';
import styles from './Auth.module.scss';
import { SignUpForm } from './SignUpForm/SignUpForm';
import { LogInForm } from './LoginForm/LoginForm';

type FormType = 'signIn' | 'signUp';

export default function Auth() {
  const [formType, setFormType] = React.useState<FormType>('signIn');

  return (
    <div className={styles.authWrap}>
      <div className={styles.authControl}>
        <button onClick={() => setFormType('signUp')} className={'btn'}>
          Sign Up
        </button>
        <button onClick={() => setFormType('signIn')} className={'btn'}>
          Sign In
        </button>
      </div>
      {formType === 'signUp' ? <SignUpForm /> : <LogInForm />}
    </div>
  );
}
