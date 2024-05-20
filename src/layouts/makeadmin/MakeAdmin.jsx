import { useState } from "react";
import useAuth from "../../hook/useAuth/useAuth";
import { saveRole } from "../../api/auth";


const MakeAdmin = () => {

    const { disableSignup, setDisableSignup, user } = useAuth();
    const [role, setRole] = useState('user')

    //pick selected checkbox;
    const handleChangeCheckbox = event => {
        setDisableSignup(event.target.checked);
    }

    //pick selected role;

    const handleChangeRole = event => {
        const role = event.target.value;
        setRole(role)
        if (role === 'user') {
            setRole('user')
        } else if (role === 'admin') {
            setRole('admin')
        }
    }


    //add user;

    const handleAddUser = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const adminEmail = user?.email;

        const userInfo = {
            email, role, adminEmail
        }

        saveRole(userInfo);
        form.reset();

    }

    return (
        <div>
            <div className="mx-10">
                <div className="text-black font-medium my-5">
                    <h2 className="text-2xl mb-2">Add New admin</h2>
                    <p>Create a brand new user and add them to this site.</p>
                </div>
                <div className="md:w-1/3 ">
                    <div className="card border border-gray-200 rounded">
                        <form onSubmit={handleAddUser} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black">Email Address</span>
                                </label>
                                <input type="email" name="email" className="input input-bordered bg-white" required />
                            </div>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Select role</span>
                                </div>
                                <select className="select select-bordered text-black bg-white" value={role} onChange={handleChangeRole} required>
                                    <option value={'user'}>User</option>
                                    <option value={'admin'}>Administrator</option>
                                </select>
                            </label>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Add User</button>
                            </div>
                        </form>
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">Disable Signup?</span>
                            <input
                                checked={disableSignup}
                                onChange={handleChangeCheckbox}
                                type="checkbox"
                                className="checkbox checkbox-accent" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;