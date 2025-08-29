import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url,slug, description) => {
    // console.log("api",url)
    const response = await axiosInstance.post(
        "/api/v1/url/create",
        { url:url, slug, description }
      );
    //   console.log(response);
      
      return response;
}

export const deleteUrl = async (urlId) =>{
    console.log(urlId, "from api");
    const response = await axiosInstance.delete(`/api/v1/url/delete/${urlId}`)
    return response.data;
}