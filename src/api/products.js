
import Swal from 'sweetalert2'


//save products to db;

export const saveProducts = products => {
    const productData = {
        email: products.email,
        productTitle: products.productTitle,
        productCategory: products.productCategory,
        productRegularPrice: products.productRegularPrice,
        productDiscountPrice: products.productDiscountPrice,
        productDescription: products.productDescription,
        productImg: products.productImg
    }

    fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(productData)
    }).then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                alert('Product has been saved')
            }
        })
}


// delete product from db;

export const deleteProduct = id => {
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
                fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
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
};



// update product to db;

export const updateProduct = updateItem => {
    const updatedProductData = {
        productId: updateItem.productId,
        productTitle: updateItem.productTitle,
        productCategory: updateItem.productCategory,
        productRegularPrice: updateItem.productRegularPrice,
        productDiscountPrice: updateItem.productDiscountPrice,
        productImg: updateItem.productImg,
        productDescription: updateItem.productDescription
    }

    fetch(`${import.meta.env.VITE_API_URL}/products/${updateItem.productId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatedProductData)
    }).then(res => res.json())
        .then(data => {
            if (data.modifiedCount) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
}


