import {del, get, post, postFormData, put, ServerURL} from '@/apis/index.js'

const getOrders = async ()=>{
    return await get('/order/list');
}

const receiveOrder = async (oid,status) =>{
    return await put(`/order/${oid}?status=${status}`);
}

const deleteOrder = async (oid) =>{
    return await put(`/order/${oid}/cancel`);
}

export default {getOrders,receiveOrder,deleteOrder};