import {del, get, post, postFormData, put, ServerURL} from '@/apis/index.js'

const getAllCart = async ()=>{
    return await get('cart/all');
}

const deleteCart = async (cid) =>{
    return await del(`cart/remove/${cid}`);
}

const getImgId = async (cid)=>{
    return await get(`/shop/item/${cid}`);
}
const getImg = async (cid)=>{
    const id = await getImgId(cid);
    const ImgId = (id.data.images[0]);
    return `${ServerURL}/shop/image/${ImgId}`
}

const addOrder = async (body) =>{
    const response = await post(`/order/add`, body)
    if (response.status_code !== 201) {
        console.error(response);
        return Response.reject(response);
    }

    return response;
}

export default {getAllCart,deleteCart,getImg,addOrder};