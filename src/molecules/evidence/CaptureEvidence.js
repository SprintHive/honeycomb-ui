
import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, withHandlers, withState} from "recompose";
import CaptureImage from "./CaptureImage";
import ConfirmImage from "./ConfirmImage";
import {nonOptimalStates} from "../../hoc/nonOptimalStates";
import {evidenceCaptured} from "../upload/UploadActions";
import AnalysingSpinner from "../upload/AnalysingSpinner";
import UploadProgressSpinner from "../upload/UploadProgressSpinner";


const uploadInProgress = ({componentKey, identityVerification}) => identityVerification[componentKey].status === "Uploading";
const showUploadInProgress = ({uploadProgress}) => <UploadProgressSpinner {...{uploadProgress}}/>;

const busy = ({componentKey, identityVerification}) => identityVerification[componentKey].status === "InProgress";
const showSpinner = () => <AnalysingSpinner/>;

const enhance = compose(
  setDisplayName("CaptureEvidence"),
  setPropTypes({
    identityVerificationId: PropTypes.string.isRequired,
    dispatch: PropTypes.func,
    done: PropTypes.func,
    componentKey: PropTypes.string,
    componentData: PropTypes.object,
  }),
  withState("uploadProgress", "updateUploadProgress", 0),
  withState("imageBase64Str", "updateBase64ImageStr", undefined),
  withHandlers({
    imageCaptured: props => base64ImageStr => {
      props.updateBase64ImageStr(base64ImageStr);
    },
    reTakeImage: props => () => {
      props.updateBase64ImageStr(undefined);
    },
    acceptImage: props => () => {
      const {endpoint, done, identityVerificationId, imageBase64Str, componentKey, componentData, updateUploadProgress, dispatch} = props;
      const data = new FormData();
      const blob = dataURItoBlob(imageBase64Str);
      data.append("file", blob);

      // where we copy the typeCode over from component data (this is used for proof of identity)
      if (componentData) {
        Object.keys(componentData).forEach(key => data.append(key, componentData[key]));
      }

      dispatch(evidenceCaptured({entityId: identityVerificationId, entityKey: "identityVerification", endpoint, data, componentKey, updateUploadProgress}));
      done && done();
    },
  }),
  nonOptimalStates([
    {when: uploadInProgress, render: showUploadInProgress},
    {when: busy, render: showSpinner}
  ])
);

const CaptureEvidence = (props) => {
  const showConfirmImage = props.imageBase64Str !== undefined;
  return showConfirmImage
    ? <ConfirmImage {...props}/>
    : <CaptureImage imageCaptured={props.imageCaptured}/>;
};

export default enhance(CaptureEvidence);

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type: mimeString});
}
