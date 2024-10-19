const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDIARY_CLOUD_NAME}/auto/upload`

console.log("process.env.REACT_APP_CLOUDIARY_CLOUD_NAME", process.env.REACT_APP_CLOUDIARY_CLOUD_NAME)

const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "productImage")

    const dataResponse = await fetch(url, {
        method: "post",
        body: formData
    })

    return dataResponse.json()
}

export default uploadImage