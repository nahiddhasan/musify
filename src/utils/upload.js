import toast from "react-hot-toast";

export const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "musify_image");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/nahiddhasan/image/upload", {
        method: "POST",
        body: data,
      });
  
      const resData = await res.json();
      return resData.url;
    } catch (error) {
      console.log(error);
      toast.error("Faild to upload Image!")
    }
  };

//   upload audio 
  export const uploadAudio = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "musify_audio");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/nahiddhasan/video/upload", {
        method: "POST",
        body: data,
      });
  
      const resData = await res.json();
      return resData.url;
    } catch (error) {
      console.log(error);
      toast.error("Faild to upload Audio!")
    }
  };
  

  export const uploadAudio2 = (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "musify_audio");
  
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.cloudinary.com/v1_1/nahiddhasan/video/upload");
  
      // Track the progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded * 100) / event.total);
          if (onProgress) onProgress(percentCompleted);
        }
      };
  
      // Handle the response
      xhr.onload = () => {
        if (xhr.status === 200) {
          const resData = JSON.parse(xhr.responseText);
          resolve(resData.url);
        } else {
          console.error('Error uploading audio:', xhr.responseText);
          toast.error("Failed to upload Audio!");
          reject(new Error('Failed to upload audio'));
        }
      };
  
      xhr.onerror = () => {
        console.error('Upload failed.');
        toast.error("Failed to upload Audio!");
        reject(new Error('Failed to upload audio'));
      };
  
      xhr.send(data);
    });
  };
  