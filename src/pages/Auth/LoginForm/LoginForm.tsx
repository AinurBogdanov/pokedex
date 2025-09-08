import { getAuth, signInWithEmailAndPassword, type User } from 'firebase/auth';
import styles from '../Auth.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

type SignInParams = {
  user?: User;
  email: string;
  password: string;
};

export function LogInForm() {
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>();
  const navigate = useNavigate();

  function signIn({ user, email, password }: SignInParams) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('your are in');
        navigate('/');
        return userCredential.user;
      })
      .catch((error) => {
        alert('something went wrong');
        console.error('auth error : ', error);
      });
    console.log(user ? '' : 'user wasnt passed in');
  }

  //123123
  //ainurbogdanov19@gmail.com

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
