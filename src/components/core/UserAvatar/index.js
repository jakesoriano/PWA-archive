import { Component } from 'preact';
import { updateStore } from '_unistore';
import { connect } from 'unistore/preact';
import { ImageLoader, FormInput } from '_components/core';
import { getDefaultAvatar, displayPageLoader } from '_helpers';
import { updateAvatar, uploadFile } from '_mutations';
import { getTranslation } from '../../../helpers';
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

	onAttachmentChange = (file) => {
		this.setState({
			attachment: {
				file: file,
			}
		});
    displayPageLoader(true);
    uploadFile({file: file}).then((res) => {
      displayPageLoader(false);
      if (res.success && res.data) {
        updateAvatar(res.data).then((res) => {
          if (res.success) {
            this.showAlertBox(getTranslation('UPDATE_AVATAR_SUCCESS'));
          } else {
            this.showAlertBox(getTranslation('SOMETHING_WRONG'), true);
          }
        })
      } else {
        this.showAlertBox(getTranslation('SOMETHING_WRONG'), true);
      }
    })
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