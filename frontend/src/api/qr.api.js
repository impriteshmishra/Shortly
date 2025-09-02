import axiosInstance from '../utils/axiosInstance';

export const generateQr = async (url, description, expireAt) => {
    const response = await axiosInstance.post('/api/v1/qr/generate', {url, description, expireAt})
    return response.data;
}
export const deleteQR = async (QrId) =>{
    // console.log(QrId, "from api");
    const response = await axiosInstance.delete(`/api/v1/qr/delete/${QrId}`)
    return response.data;
}