import { Link } from 'react-router-dom';
import './Register.scss';

const Register = () => {
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Social Lounge.</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Veniam obcaecati quae necessitatibus sapiente
                        doloremque quas sed, eaque sunt quia unde ab eum nulla
                        atque earum fugiat eius, ipsum similique error!
                    </p>
                    <span>Already have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
