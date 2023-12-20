import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useDispatch} from 'react-redux';
import UserService from "../service/UserService";
import {updateUserToken} from "../redux/actions/userActions";
import "./Login.css"

const Login = () => {
    const [user, setUser] = useState({});
    const [userRGT, setUserRGT] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [newUser, setNewUser] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem("userToken")
        const loginSec = document.querySelector('.login-section');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');
        if (loginLink && registerLink && loginSec) {
            loginLink.addEventListener('click', () => {
                loginSec.classList.remove('active');
            });
            registerLink.addEventListener('click', () => {
                loginSec.classList.add('active');
            });
        }
    }, []);
    const changeInputLogin = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }
    const changeInputRGT = (event) => {
        const {name, value} = event.target;
        setUserRGT({...userRGT, [name]: value});
    }
    const validateSchemaLogin = Yup.object().shape({
        username: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên Người dùng không thể chứa ký tự đặc biệt')
            .required("Tên người dùng không thể để trống"),
        password: Yup.string()
            .required("Mật khẩu không thể để trống")
            .test('no-spaces', 'Mật khẩu không được chứa dấu cách', value => !/\s/.test(value)),
    })
    const validateSchemaRegister = Yup.object().shape({
        usernameRGT: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'Tên Người dùng không thể chứa ký tự đặc biệt')
            .required("Tên người dùng không thể để trống"),
        passwordRGT: Yup.string()
            .required("Mật khẩu không thể để trống")
            .test('no-spaces', 'Mật khẩu không được chứa dấu cách', value => !/\s/.test(value)),
        email: Yup.string()
            .matches(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/, 'Email Không đúng định dạng !')
            .required("Email không thể để trống")
            .test('no-spaces', 'Email không được chứa dấu cách', value => !/\s/.test(value)),
    })
    const loginIn = async () => {
        try {
            const response = await UserService.login(user);
            toast.success("Đăng nhập thành công !");
            localStorage.setItem("userToken", JSON.stringify(response.data.accessToken));
            console.log(response)
            localStorage.setItem("idAccount", JSON.stringify(response.data.id));
            localStorage.setItem("account", JSON.stringify(response.data));
            dispatch(updateUserToken(response.data));
            setIsLogin(true);
        } catch (error) {
            console.error("Error:", error);
            await checkLogin(user);
        }
    }
    const register = async () => {
        try {
            const userRegister = {
                username: userRGT.usernameRGT,
                email: userRGT.email,
                password: userRGT.passwordRGT
            };
            const response = await UserService.register(userRegister);
            console.log(response)
            toast.success("đăng ký thành công !")
        } catch (error) {
            console.error("Error:", error);
            toast.error("Tên tên tài khoản hoặc gmail đã tồn tại !")
        }
    }
    const checkLogin = async (user) => {
        try {
            const response = await UserService.checkLogin(user);
            if (response.data.includes("username")) {
                toast.error("Tên người dùng sai");
            }
            if (response.data.includes("password")) {
                toast.error("Mật khẩu sai");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <div style={{backgroundColor: "violet"}}>
            <header className="header">
                <nav className="navbar">
                    <a href="#">Trang Chủ</a>
                    <a href="#">Thông tin</a>
                    <a href="#">Nội dung</a>
                    <a href="#">Trợ Giúp</a>
                </nav>
                <form action="" className="search-bar">
                    <input type="text" placeholder="Tìm Kiếm..."/>
                    <button><i className='bx bx-search'></i></button>
                </form>
            </header>
            <div className="background"></div>
            <div className="container">
                <div className="item">
                    <h2 className="logo"><i className='bx bxl-xing'></i>Sơn Nguyễn</h2>
                    <div className="text-item">
                        <h2>
                            Xin Chào! <br/>
                            <span>Đến với ứng dụng quản lý tài chính!</span>
                        </h2>
                        <p>Ứng dụng quản lý tài chính giúp bạn theo dõi và quản lý tình hình tài chính cá nhân một cách
                            hiệu quả. Hãy trải nghiệm ngay để kiểm soát chi tiêu, tiết kiệm và đạt được mục tiêu tài
                            chính của bạn!</p>
                        <div className="social-icon">
                            <a href="#"><i className='bx bxl-facebook'></i></a>
                            <a href="#"><i className='bx bxl-twitter'></i></a>
                            <a href="#"><i className='bx bxl-youtube'></i></a>
                            <a href="#"><i className='bx bxl-instagram'></i></a>
                            <a href="#"><i className='bx bxl-linkedin'></i></a>
                        </div>
                    </div>
                </div>
                <div className="login-section">
                    <div className="form-box login">
                        <Formik initialValues={
                            {
                                username: '',
                                password: ''
                            }
                        }
                                validationSchema={validateSchemaLogin}
                                onSubmit={(values) => {
                                    loginIn().then(console.log(values)).catch();
                                }}>
                            <Form>
                                <h2>Đăng nhập</h2>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-user'></i></span>
                                    <Field type="text" name={"username"} autoComplete="off" required
                                           onInput={changeInputLogin}/>
                                    <ErrorMessage name="username" component="div" className="text-danger"/>
                                    <label>Tên Tài Khoản</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-lock-alt'></i></span>
                                    <Field type="password" autoComplete="off" name={"password"} required
                                           onInput={changeInputLogin}/>
                                    <ErrorMessage name="password" component="div" className="text-danger"/>
                                    <label>Mật Khẩu</label>
                                </div>
                                <div className="remember-password">
                                    <label htmlFor=""><input type="checkbox"/>Đồng ý với điều khoản !</label>
                                    <a href="#">Quên Mật khẩu</a>
                                </div>
                                <button className="btn" type={"submit"}>Đăng nhập</button>
                                <div className="create-account">
                                    <p>bạn chưa có tài khoản? <a href="#" className="register-link">Đăng ký</a></p>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <div className="form-box register">
                        <Formik initialValues={
                            {
                                usernameRGT: '',
                                passwordRGT: '',
                                email:''
                            }
                        }
                                validationSchema={validateSchemaRegister}
                                onSubmit={(values) => {
                                    register().then(console.log(values)).catch();
                                }}>
                            <Form name="Formfill">
                                <h2>Đăng ký</h2>
                                <p id="result"></p>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-user'></i></span>
                                    {/*<input type="text" name="Username" autoComplete="off" required/>*/}
                                    <Field type="text" name={"usernameRGT"} autoComplete="off" required
                                           onInput={changeInputRGT}/>
                                    <ErrorMessage name="usernameRGT" component="div" className="text-danger"/>
                                    <label>Tên tài khoản</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-lock-alt'></i></span>
                                    {/*<input type="password" name="Password" id="PasswordC" autoComplete="off" required/>*/}
                                    <Field type="password" autoComplete="off" name={"passwordRGT"} required
                                           onInput={changeInputRGT}/>
                                    <ErrorMessage name="passwordRGT" component="div" className="text-danger"/>
                                    <label>Mật khẩu</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon"><i className='bx bxs-envelope'></i></span>
                                    {/*<input type="email" name="" id="CPassword" autoComplete="off" required/>*/}
                                    <Field type="email" autoComplete="off" id={"email"} name={"email"} required
                                           onInput={changeInputRGT}/>
                                    <ErrorMessage name="email" component="div" className="text-danger"/>
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="remember-password">
                                    <label htmlFor=""><input type="checkbox"/>Đồng ý với điều khoản và dịch vụ</label>
                                </div>
                                <button className="btn" type={"submit"}>Đăng ký</button>
                                <div className="create-account">
                                    <p>Bạn đã có tài khoản? <a href="#" className="login-link">Đăng nhập</a></p>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            {isLogin && <Navigate to="/admin/default"/>}
        </div>
    );
};

export default Login;