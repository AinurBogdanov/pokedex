import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import styles from '../Auth.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface FormData {
  email: string;
  password: string;
}

export function SignUpForm() {
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  function signUpUser({ email, password }: { email: string; password: string }) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('you loged in');
        navigate('/');

        console.log(userCredential.user);
      })
      .catch((error) => {
        if (error.message.includes('email-already-in-use')) {
          alert('email already in use');
        }
      });
  }

  return (
    <form noValidate onSubmit={handleSubmit(signUpUser)} className={styles.form}>
      <h1 className={styles.formHeading}>Sign Up</h1>
      <label className={styles.formLabel}>
        <span>
          Password
          <img className={styles.requiredStar} src="/images/reqired_star.png" alt="" />
        </span>
        <input
          {...register('password', {
            required: 'password is required',
            minLength: { value: 6, message: 'too short password' },
          })}
          className={styles.formInput}
          type="text"
        />
        {errors.password && <div>{errors.password.message as string}</div>}
      </label>

      <label className={styles.formLabel}>
        <span>
          Email
          <img className={styles.requiredStar} src="/images/reqired_star.png" alt="" />
        </span>
        <input
          {...register('email', {
            required: 'email is required',
            validate: (email) => {
              if (!email.includes('@')) return 'email should have @';
              if (!email.endsWith('.com') && !email.endsWith('.ru'))
                return 'email should end with .com / .ru ';
              return true;
            },
          })}
          className={styles.formInput}
          type="email"
        />
        {errors.email && <div>{errors.email.message as string}</div>}
      </label>

      <button className={styles.submitBtn + ' btn'}>Submit</button>
    </form>
  );
}
