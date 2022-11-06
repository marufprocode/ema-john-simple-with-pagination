import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import './SignUp.css'

const SignUp = () => {
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm = e.target.confirm.value;
        console.log(email, password, confirm);
        // Varify Password 
        if(password.length<6) {setError('Password Should be at least 6 character'); return};
        if(password !== confirm) {setError("Your Password Doesn't Match"); return};
        // sign In Func 
        createUser(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            e.target.reset();
            console.log(user);
          })
          .catch((error) => {
            console.error('error',error);
            // ..
          });        
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" required />
                </div>
                <p className='text-error'>{error}</p>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p>Already Have an Account <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default SignUp;