import styles from '../Auth.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { SignInParams } from '../formsTypes';
import { signInUser } from '../../../firebase/api/auth';

export function LogInForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>();

  function signIn({ email, password }: SignInParams) {
    signInUser({ email, password })
      .then(() => {
        alert('user logged in');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //
  //

  return (
    <form noValidate onSubmit={handleSubmit(signIn)} className={styles.form}>
      <h1 className={styles.formHeading}>Log in</h1>
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
