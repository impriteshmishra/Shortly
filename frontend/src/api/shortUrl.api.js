import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url,slug) => {
    // console.log("api",url)
    const response = await axiosInstance.post(
        "/api/v1/create/url",
        { url:url, slug }
      );
    //   console.log(response);
      
      return response;
}