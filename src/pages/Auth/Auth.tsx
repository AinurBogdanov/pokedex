import styles from './Auth.module.scss';
import { SignUpForm } from './SignUpForm/SignUpForm';

export default function Auth() {
  return (
    <div className={styles.authWrap}>
      <SignUpForm />
    </div>
  );
}
