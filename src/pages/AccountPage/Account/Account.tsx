import styles from '../AccountPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/userSlice';
import { updatePhotoUrl } from '../../../firebase/api/auth';

export function Account() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const API_KEY = '546eedf0b0c983b81e084ca6344ea481';
  const uploadIamgeURl = 'https://api.imgbb.com/1/upload';

  async function onFileUpload(e) {
    const newAvatarImage = e.target.files[0];

    const formData = new FormData();
    formData.append('image', newAvatarImage);

    fetch(`${uploadIamgeURl}?key=${API_KEY}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const newPhotoUrl = data.data.display_url;
        updatePhotoUrl(user.uid as string, newPhotoUrl, dispatch);
      });
  }

  return (
    <div className={styles.content}>
      <div className={styles.personalInfo}>
        <div>
          <div className={styles.avatarImageCont}>
            <img
              className={styles.avatarImage}
              src={user.photoURL ? user.photoURL : '/images/avatarPlaceholder.jpg'}
              alt=""
            />
            <label htmlFor="file-upload" className={styles.uploadImageIcon}>
              <input onChange={onFileUpload} id="file-upload" type="file" />
            </label>
          </div>

          <label htmlFor="file-upload-2" className={styles.uploadImageIconMobile}>
            <input onChange={onFileUpload} id="file-upload-2" type="file" />
          </label>
          <h2 className={styles.userName}>{user.displayName}</h2>
        </div>
      </div>
      <div className={styles.accountInfo}>
        <div className={styles.accInfoSection}>
          <p className={styles.accountInfoHeading}>Account info</p>
          <div className={styles.accInfoCouple}>
            Email address <span className={styles.infoVal}>{user.email}</span>
          </div>
          <div className={styles.accInfoCouple}>
            Phone number
            <span className={styles.infoVal}>
              {user.phoneNumber ? user.phoneNumber : 'unknown'}
            </span>
          </div>
          <div className={styles.accInfoCouple}>
            City
            <span className={styles.infoVal}>{user.city ? user.city : 'unknown'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
