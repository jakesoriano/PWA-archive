import { Component } from 'preact';
import { updateStore } from '_unistore';
import { connect } from 'unistore/preact';
import { ImageLoader, FormInput } from '_components/core';
import {
  getDefaultAvatar,
  displayPageLoader,
  getTranslation,
  resizeImage,
  uploadFile
} from '_helpers';
import { updateAvatar } from '_mutations';
import style from './style';

class UserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
			attachment: {
				file: null
			}
    };
  };

  updateUserImage = (file) => {
		this.setState({
			attachment: {
				file: file,
			}
		});
    displayPageLoader(true);
    uploadFile({file: file}).then((res) => {console.error(res);
      displayPageLoader(false);
      if (res.success && res.data) {
        updateAvatar(res.data).then((resUpdate) => {
          if (resUpdate.success) {
            this.showAlertBox(getTranslation('UPDATE_AVATAR_SUCCESS'));
          } else {
            this.showAlertBox(getTranslation(resUpdate.errMessage || 'SOMETHING_WRONG'), true);
          }
        })
      } else {
        this.showAlertBox(getTranslation(res.errMessage || 'SOMETHING_WRONG'), true);
      }
    })
  }

	onAttachmentChange = (file) => {
    if (!file) {
      return;
    }

    resizeImage({
      file: file,
      maxSize: 1200
    })
    .then(resizedImage => {
      console.log("upload resized image", resizedImage);
      this.updateUserImage(resizedImage);
    })
    .catch(err => {
      // console.error(err);
      this.updateUserImage(file);
    });
	};

	showAlertBox = (message, hasError) => {
		updateStore({
			alertShow: {
				success: !hasError,
				content: message
			}
		});
	};

  render = ({ authUser, allowUpdate }, { attachment }) => (
    <div className={style.userAvatarWrap}>
      <label for="inputAttachment">
        <ImageLoader
          src={authUser.profile.image || getDefaultAvatar()}
          style={{ container: style.avatar }}
          lazy
        />
        </label>
        <FormInput
          id='inputAttachment'
          className={style.attachment}
          style={{error: style.attachment}}
          value={attachment.file}
          type="file"
          accept="image/*"
          capture="user"
          disabled={!allowUpdate}
          onBlur={(e) => {
            this.onAttachmentChange(e.target.files[0])
          }}
          onInput={(e) => {
            this.onAttachmentChange(e.target.files[0])
          }}
        />
    </div>
  )
}

export default connect(['authUser'])(UserAvatar);