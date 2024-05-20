

export const uploadImageToImgBB = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMBB_SECRET_API}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const imageData = await response.json();
            return imageData.data.display_url;
        } else {
            console.error('Failed to upload image');
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};

export const uploadImagesToImgBB = async (images) => {
    const imageUrls = [];

    for (const image of images) {
        const imageUrl = await uploadImageToImgBB(image);
        if (imageUrl) {
            imageUrls.push(imageUrl);
        }
    }

    return imageUrls;
};
