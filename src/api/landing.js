import Swal from "sweetalert2";

//save data to db;
export const saveLandingData = async (landingData) => {
    const landingInfo = {
        email: landingData.email,
        productTitle: landingData.productTitle,
        features1: landingData.features1,
        features2: landingData.features2,
        features3: landingData.features3,
        features4: landingData.features4,
        features5: landingData.features5,
        productRegularPrice: parseFloat(landingData.productRegularPrice),
        productDiscountPrice: parseFloat(landingData.productDiscountPrice),
        productImage: landingData.productImage,
        productGallaries: landingData.productGallaries
    }
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/landing`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(landingInfo)
        })

        if (response.ok) {
            const data = await response.json();
            if (data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Landing page has been created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}


//delete landing page from db;

export const deleteLanding = async (id) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/landing/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Product has been deleted.",
                                icon: "success"
                            });
                            resolve(); // Resolve the promise after successful deletion
                        } else {
                            reject("Delete operation failed"); // Reject the promise if deletion fails
                        }
                    })
                    .catch(error => {
                        reject(error); // Reject the promise if there's an error during fetch
                    });
            }
        });
    });
}