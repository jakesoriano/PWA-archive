/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-quotes */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable quotes */
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { ImageLoader, FormInput } from '_components/core';
import {
  getDefaultAvatar,
  getTraceID,
  displayPageLoader,
  resizeImage,
  uploadFile,
  showAlertBox,
  platform,
} from '_helpers';
import { updateAvatar } from '_mutations';
import style from './style';

class UserAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachment: {
        file: null,
      },
    };
  }

	updateUserImage = (file) => {
	  this.setState({
	    attachment: {
	      file: file,
	    },
	  });
	  displayPageLoader(true);
	  uploadFile({ file: file }).then((res) => {
	    displayPageLoader(false);
	    if (res.success && res.data) {
	      updateAvatar(res.data).then((resUpdate) => {
	        if (resUpdate.success) {
	          showAlertBox({
	            message: 'UPDATE_AVATAR_SUCCESS',
	            success: true,
	          });
	        } else {
	          showAlertBox({
	            message: resUpdate.errMessage || 'SOMETHING_WRONG',
	          });
	        }
	      });
	    } else {
	      const errorMessage = getTraceID(res);
	      showAlertBox({
	        message: res.errMessage || errorMessage,
	      });
	    }
	  });
	};

	onAttachmentChange = (file) => {
	  if (!file) {
	    return;
	  }

	  resizeImage({
	    file: file,
	    maxSize: 1200,
	  })
	    .then((resizedImage) => {
	      console.log('upload resized image', resizedImage);
	      this.updateUserImage(resizedImage);
	    })
	    .catch((err) => {
	      // console.error(err);
	      this.updateUserImage(file);
	    });
	};

	render = ({ authUser, allowUpdate }, { attachment }) => (
	  <div className={style.userAvatarWrap}>
	    <label for="inputAttachment">
	      <ImageLoader
	        src={authUser.profile.image || getDefaultAvatar()}
	        style={{ container: style.avatar, image: style.img }}
	        lazy
	      />
	    </label>
	    {platform.os === 'ios' ? (
	      <FormInput
	        id="inputAttachment"
	        className={style.attachment}
	        style={{ error: style.attachment }}
	        value={attachment.file}
	        type="file"
	        accept="image/*"
	        disabled={!allowUpdate}
	        onBlur={(e) => {
	          this.onAttachmentChange(e.target.files[0]);
	        }}
	        onInput={(e) => {
	          this.onAttachmentChange(e.target.files[0]);
	        }}
	      />
	    ) : (
	      <FormInput
	        id="inputAttachment"
	        className={style.attachment}
	        style={{ error: style.attachment }}
	        value={attachment.file}
	        type="file"
	        accept="image/*"
	        capture="user"
	        disabled={!allowUpdate}
	        onBlur={(e) => {
	          this.onAttachmentChange(e.target.files[0]);
	        }}
	        onInput={(e) => {
	          this.onAttachmentChange(e.target.files[0]);
	        }}
	      />
	    )}
	  </div>
	);
}

export default connect(['authUser'])(UserAvatar);
