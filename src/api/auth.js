import Swal from "sweetalert2";

//save users to db;

export const saveUser = user => {
    const currentUser = {
        email: user.email,
        role: 'admin'
    }

    fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Signup is Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
}

//save role to db;

export const saveRole = user => {
    const currentUser = {
        adminEmail: user.adminEmail,
        userEmail: user.email,
        role: user.role
    }

    fetch(`http://localhost:5000/users/${user?.email}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
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



//get role;

export const getRole = email => {
   return fetch(`http://localhost:5000/users/${email}`)
    .then(res=>res.json())
        
}