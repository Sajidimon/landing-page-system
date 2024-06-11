import Swal from "sweetalert2";

//save users to db;

export const saveUser = user => {
    const currentUser = {
        email: user.email,
        role: 'admin'
    }

    fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log('signup is successfull', data);
        })
}

//save role to db;

export const saveRole = user => {
    const currentUser = {
        adminEmail: user.adminEmail,
        userEmail: user.email,
        role: user.role
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            if (data.upsertedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User has been added",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (data.matchedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You are admin now",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
}