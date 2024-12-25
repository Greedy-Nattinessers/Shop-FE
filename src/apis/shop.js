import {del, get, post, postFormData, ServerURL} from '@/apis/index.js'

const allCommodities = async (page = 1) => {
    const response = await get('/shop/all', {page})
    if (response.status_code !== 200) {
        console.error(response)
        return Response.reject(response)
    }
    return response
}

const commodityDetail = async (id) => {
    const response = await get(`/shop/item/${id}`)
    if (response.status_code !== 200) {
        console.error(response)
        return Response.reject(response)
    }
    return response
}

const commodityAlbum = (id) => {
    return `${ServerURL}/shop/item/${id}/album`
}

const commodityImage = (id) => {
    return `${ServerURL}/shop/image/${id}`
}

const createCommodity = async (body, images) => {
    const formData = new FormData();

    // 将body对象的各个字段添加到formData中
    formData.append('name', body.name);
    formData.append('price', body.price);
    formData.append('description', body.description);

    // 将images数组中的每个图像添加到formData中
    images.forEach(image => {
        formData.append('images', image);
    });

    console.log('FormData:', formData);

    const response = await post('/shop/add', formData);

    if (response.status !== 201) {
        console.error('Response Error:', response);
        return Promise.reject(response);
    }
    return response;
}

const updateCommodity = async (id, body, images, no_images = false) => {
    const formData = new FormData()
    formData.append('body', JSON.stringify(body))
    images.forEach(image => {
        formData.append('images', image)
    })
    const response = await postFormData(`/shop/update/${id}?no_images=${no_images}`, formData)
    if (response.status !== 200) {
        console.error(response)
        return Response.reject(response)
    }
    return response
}

const deleteCommodity = async (id) => {
    const response = await post(`/shop/item/${id}`)
    if (response.status_code !== 200) {
        console.error(response)
        return Response.reject(response)
    }
    return response
}

const getComments = async (cid) => {
    const response = await get(`/shop/item/${cid}/comment`)
    if (response.status_code !== 200) {
        console.error(response)
        return Response.reject(response)
    }
    return response
}

const addComment = async (cid, body) => {
    console.log("2")
    const response = await post(`/shop/item/${cid}/comment`, body)

    if (response.status_code !== 201) {
        console.error(response);
        return Response.reject(response);
    }

    return response;
}

const addCart = async (id) => {
    const response = await post(`/cart/add/${id}`)
    if (response.status_code !== 200) {
        console.error(response)
        return Response.reject(response)
    }
    return response
}

const removeCart = async (id, remove_all = false) => {
    const response = await del(`/cart/remove/${id}?remove_all=${remove_all}`)
    if (response.status !== 200) {
        console.error(response)
        return Response.reject(response)
    }
    return response
}

const allCart = async () => {
    const response = await get('/cart/all')
    if (response.status !== 200) {
        console.error(response)
        return Response.reject(response)
    }
    return response
}

const clearCart = async () => {
    const response = await del('/cart/all')
    if (response.status !== 200) {
        console.error(response)
        return Response.reject(response)
    }
    return response
}

export default {
    allCommodities,
    commodityDetail,
    commodityAlbum,
    commodityImage,
    createCommodity,
    updateCommodity,
    deleteCommodity,
    getComments,
    addComment,
    addCart,
    removeCart,
    allCart,
    clearCart
}