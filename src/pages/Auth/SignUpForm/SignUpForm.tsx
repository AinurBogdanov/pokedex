import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import styles from '../Auth.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getDatabase, ref, set } from 'firebase/database';
import app from '../../../firebase';
import type { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/user/userSlice';

interface SignUpParams {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export function SignUpForm() {
  const dispatch = useDispatch<AppDispatch>();
  const auth = getAuth();
  const db = getDatabase(app);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>();
  const navigate = useNavigate();

  function signUpUser({ name, lastName, email, password }: SignUpParams) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('you logged in');

        set(ref(db, 'users/' + userCredential.user.uid), {
          name,
          lastName,
          email,
          profile_picture: null,
        }).catch((error) => {
          console.log('fucking error:', error);
        });

        updateProfile(userCredential.user, {
          displayName: name + ' ' + lastName,
        })
          .then(() => {
            console.log('Profile updated successfully');
            const updatedUser = auth.currentUser;
            console.log(updatedUser);

            if (updatedUser) {
              const { email, displayName, phoneNumber, photoURL, providerId, uid } = updatedUser;
              dispatch(
                addUser({ user: { email, displayName, phoneNumber, photoURL, providerId, uid } }),
              );
            }

            navigate('/');
          })
          .catch((error) => {
            console.error('Error updating profile:', error);
          });
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
      </label>

      <label className={styles.formLabel}>
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
      </label>

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
