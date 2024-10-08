import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'
import config from '../../config'
import { useNavigate, Link } from 'react-router-dom'

const SignIn = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            if(!user.user || !user.pass){
                Swal.fire({
                    title: 'Sign In',
                    text: 'Please enter username and password',
                    icon: 'warning'
                });
                return;
            }
            const res = await axios.post(config.apiPath + "/user/signin", user);

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate('/home');
            }
        } catch (e) {
            if (e.response.status === 401) {
                Swal.fire({
                    title: 'sign in',
                    text: 'username or password invalid',
                    icon: 'warning'
                })
            } else {
                Swal.fire({
                    title: "error",
                    text: e.message,
                    icon: "error"
                });
            }
        }
    };

    return (
        <>
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <Link to="../../index2.html" className="h1"><b>Hello</b>World</Link>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <div action="../../index3.html" method="post">
                                <div className="input-group mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Email"
                                        onChange={e => setUser({ ...user, user: e.target.value })}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={e => setUser({ ...user, pass: e.target.value })}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="remember" />
                                            <label htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button                                          
                                            className="btn btn-primary btn-block"
                                            onClick={handleSignIn}
                                        >
                                            Sign In
                                            </button>
                                    </div>
                                </div>
                            </div>
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <Link to="#" className="btn btn-block btn-primary">
                                    <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                                </Link>
                                <Link to="#" className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                                </Link>
                            </div>
                            <p className="mb-1">
                                <Link to="forgot-password.html">I forgot my password</Link>
                            </p>
                            <p className="mb-0">
                                <Link to="register.html" className="text-center">Register a new membership</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn