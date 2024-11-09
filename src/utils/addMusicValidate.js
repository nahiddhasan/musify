export const addMusicValidate = (title,image, audio) => {
    const errors = {};
    const allowedAudioTypes = ['audio/mpeg'];
    const allowedImageTypes = ['image/jpeg', 'image/png'];
    if (!title) {
      errors.title = "Title Required!";
    }
    if (!allowedImageTypes.includes(image.type)){
      errors.title = "Please select a valid Photo!";
    }
    if (!audio) {
      errors.audio = "Audio is required";
    }else if (!allowedAudioTypes.includes(audio.type)){
        errors.audio = "Please select a valid audio file";
    }
    return errors;
  };
  
  export const updateMusicValidate = (title,image, audio) => {
    const errors = {};
    const allowedAudioTypes = ['audio/mpeg'];
    const allowedImageTypes = ['image/jpeg', 'image/png'];
    if (!title) {
      errors.title = "Title Required!";
    }
    if(image){
      if (!allowedImageTypes.includes(image.type)){
        errors.title = "Please select a valid Photo!";
      }
    }
    if(audio){
      if (!allowedAudioTypes.includes(audio.type)){
        errors.audio = "Please select a valid audio file";
    }
    }
    return errors;
  };