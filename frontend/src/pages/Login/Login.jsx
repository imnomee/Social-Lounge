import { Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Veniam obcaecati quae necessitatibus sapiente
                        doloremque quas sed, eaque sunt quia unde ab eum nulla
                        atque earum fugiat eius, ipsum similique error!
                    </p>
                    <span>Don&apos;t have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />

                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
