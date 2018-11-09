import React from 'react'
import ImageButton from "../../atoms/imageButton/ImageButton";
import FlexBox from "../../layout/FlexBox";
import PropTypes from "prop-types";
import SpinnerWithText from "../../atoms/spinner/SpinnerWithText";

class CaptureImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loadingCamera: true};
  }

  componentDidMount() {
    const constraints = {
      video: {
        width: 320,
        height: 240,
        facingMode: "user"
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.player.srcObject = stream;
        setTimeout(() => {
          this.setState({loadingCamera: false});
        }, 2000)
      })
      .catch(e => console.log("An error occurred", e));
  }

  componentWillUnmount() {
    // Stop all video streams when we are unmounted
    const player = this.player;
    if (player && player.srcObject) {
      player.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }

  takePic() {
    const {player, canvas, props} = this;
    const {imageCaptured} = props;
    const context = canvas.getContext('2d');
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    imageCaptured(dataURL);
  }

  render() {
    const {loadingCamera} = this.state;
    return (
      <FlexBox style={{marginTop: 10}} column item centered>
        <FlexBox style={{display: loadingCamera ? null : "none", minWidth: 320}} centered>
          <SpinnerWithText text="Loading the camera"/>
        </FlexBox>
        <FlexBox style={{display: !loadingCamera ? null : "none"}} column>
          <FlexBox centered>
            <video ref={player => this.player = player} autoPlay={true} width={320} height={240}/>
          </FlexBox>
          <FlexBox style={[{marginTop: 10}]} centered>
            <ImageButton style={{marginRight: 10}} glyphIcon="glyphicons-camera" text="Snap" onClick={() => this.takePic()}/>
          </FlexBox>
        </FlexBox>
        <FlexBox centered>
          <canvas ref={canvas => this.canvas = canvas} style={{display: "none"}} width={320} height={240}/>
        </FlexBox>
      </FlexBox>
    );
  }
}

CaptureImage.propTypes = {
  imageCaptured: PropTypes.func.isRequired
};

export default CaptureImage;