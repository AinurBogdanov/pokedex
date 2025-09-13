import styles from '../Auth.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { registerUser, signInWithGoogle } from '../../../firebase/api/auth';
import type { SignUpParams } from '../formsTypes';

export function SignUpForm({ setFormType }: { setFormType: (type: 'signUp' | 'signIn') => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // console.log('@', googleAuthProvider);
  function onSignUpWithGoogle() {
    signInWithGoogle('SignUp').then(() => {
      navigate('/');
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>();

  async function signUpUser({ name, lastName, email, password }: SignUpParams) {
    try {
      const user = await registerUser({ name, lastName, email, password, dispatch });
      alert(`user:  ${user.displayName} is registered`);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit(signUpUser)} className={styles.form}>
        <div className={styles.formHeading}>
          <h1 className={styles.formHeading}>Sign Up</h1>
          <button
            type="button"
            onClick={() => setFormType('signIn')}
            className={styles.switchFormBtn}
          >
            Sign in ➡
          </button>
        </div>

        <div className={styles.formLabel}>
          <span>
            Name
            <img className={styles.requiredStar} src="/images/reqired_star.png" alt="" />
          </span>
          <input
            {...register('name', {
              required: 'name is required',
            })}
            className={styles.formInput}
            type="text"
          />
          {errors.name && <div>{errors.name.message as string}</div>}
        </div>

        <div className={styles.formLabel}>
          <span>
            Last name
            <img className={styles.requiredStar} src="/images/reqired_star.png" alt="" />
          </span>
          <input
            {...register('lastName', {
              required: 'lastName is required',
            })}
            className={styles.formInput}
            type="text"
          />
          {errors.lastName && <div>{errors.lastName.message as string}</div>}
        </div>

        <div className={styles.formLabel}>
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
        </div>

        <div className={styles.formLabel}>
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
        </div>
        <div className={styles.submitBtnCont}>
          <button className={styles.submitBtn + ' btn'}>Submit</button>
          <div onClick={onSignUpWithGoogle} className={styles.googleVer}>
            <img className={styles.googleLogo} src="/images/google_logo.png" alt="" />
            Continue with Google
          </div>
        </div>
      </form>
    </>
  );
}
