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
  