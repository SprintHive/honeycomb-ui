export const errorCodeMapper = (errorCode) => {
  switch (errorCode) {

    case "drivers-license-read-failed":
      return "Looks like we could not read the drivers license.";

    case "self-headshot-trusted-headshot-mismatch":
      return "The headshot does not match the image extracted from the drivers license.";

    case "self-headshot-pop-headshot-mismatch":
      return "The headshot does not match the proof of presence.";

    case "pop-headshot-trusted-headshot-mismatch":
      return "The proof of presence does not match the image extracted from the barcode.";

    case "no-face-found":
      return "We could not detect a face in the provided image.";

    case "pop-action-not-performed":
      return "We could not detect the proof of presence requirement";

    case "drivers-license-photo-unusable":
      return "We could not use the face encoded in your drivers license for identity verification. Please select a different option.";

    case "za-id-data-extraction-failed":
      return "We could not read the information on the id document";

    default:
      console.warn("Unknown error code detected", errorCode);
      return "Yikes, pop goes the weasel..."
  }
};

