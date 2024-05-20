import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {

    const { logIn } = useContext(AuthContext)
    const [showpassword, setShowpassword] = useState(false);
    const [passworderr, setPassworderr] = useState(null)
    const navigate = useNavigate();


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        //reset password error;
        setPassworderr(' ');

        //login admin;

        logIn(email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    navigate('/admin-dashboard/home')
                }
            }).catch(error => {
                if (error?.code === 'auth/invalid-credential') {
                    setPassworderr('Email & Password do not match !');
                    return;
                }
        })


    }

    return (
        <div className="mt-20 mx-10">
            <div className="md:w-1/3 mx-auto">
                <div className="card border border-gray-200 rounded">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Email Address</span>
                            </label>
                            <input type="email" name="email" className="input input-bordered bg-white" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text text-black">Password</span>
                            </label>
                            <input
                                type={showpassword ? "text" : "password"}
                                className="textarea textarea-bordered bg-white" name="password" required />
                            <span onClick={() => setShowpassword(!showpassword)} className="absolute top-[50px] right-3">
                                {showpassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        {passworderr && <span className="text-red-500">{passworderr}</span>}
                    </form>
                </div>
                <p className="mt-5">
                    <Link to='/admin-register'><span>Register</span></Link> | <Link><span>Lost your password?</span></Link></p>
            </div>
        </div>
    );
};

export default Login;