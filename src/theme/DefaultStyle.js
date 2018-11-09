export const defaultStyle = {
  menu: {
    container: {
      position: 'fixed',
      top: 0,
      right: 0,
    },
    slider: {
      position: "relative",
      width: 200,
      backgroundColor: "rgba(0,0,0,0.8)",
      right: -200,
      transitionProperty: "right",
      transitionDuration: "0.5s",
      transitionTimingFunction: "ease-in"
    },
    showMenu: {
      right: 0,
    },
    menuItem: {
      alignItems: "center",
      cursor: "pointer"
    }
  },
  inputStyle: {
    backgroundColor: 'transparent',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottomWidth: 2,
    borderBottomColor: '#c1c1c1',
    borderBottomStyle: 'solid',
    outline: 'none',
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    maxWidth: 400,
    minWidth: 300,
    fontSize: '130%',
    color: '#c1c1c1'
  },
  buttonStyle: {
    base: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#db7400',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      outline: 'none',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: 'center',
      fontSize: '100%',
      color: '#db7400',
      ':hover': {
        color: '#ff8700',
        borderColor: '#ff8700',
        cursor: 'pointer'

      }
    },
    tiny: {
      fontSize: 12,
    },
    disabled: {
      borderColor: '#7d3600',
      color: '#7d3600'
    }
  },
  buttonNoHover: {
    base: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#db7400',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      outline: 'none',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: 'center',
      fontSize: '200%',
      color: '#db7400',
      ':hover': {
        cursor: 'pointer'
      }
    },
    tiny: {
      fontSize: 12,
    }
  },
  uploadOrCaptureImage: {
    container: {
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: "#db7400",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 10,
      maxWidth: 250,
      minWidth: 250,
      width: 250,
    },
    labelStyle: {cursor: "pointer"},
    hideFileInput: {
      width: 0.1,
      height: 0.1,
      opacity: 0,
      overflow: "hidden",
      position: "absolute",
      zIndex: -1
    }
  },
  toggleGroup: {
    base: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: "#db7400",

      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      overflow: 'hidden',
      justifyContent: 'space-evenly'
    },
    noRadius: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    noBorder: {
      borderStyle: 'none',
    },
    firstChild: {
      borderRightStyle: `solid`,
    },
    lastChild: {
      borderLeftStyle: 'solid',
    },
    label: {
      fontSize: 10
    }
  },
  toggleButton: {
    base: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderStyle: 'none'
    },

    toggledOn: {
      backgroundColor: "#db7400",
      color: '#c1c1c1',
    }
  },
  addressCard: {
    ':hover': {
      color: '#f79733'
    },
    cursor: 'pointer'
  },
  spinnerWithText: {
    container: {
      color: '#c1c1c1',
      marginTop: 10
    },
    textBoxStyle: {
      marginTop: 5
    }
  },
  spinner: {
    backgroundColor: "#c1c1c1"
  }
};