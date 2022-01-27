import React from 'react';
const Signin = () => {
    return <div>
        <div className="text-center">
            <div className='container'>
                <div className='position-absolute top-50 start-50 translate-middle'>
                    <h1 className='mb-5'>Welcome</h1>
                    <form action='/register/farmer'>
                        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option selected>Who are you?</option>
                            <option value="1">Doctor</option>
                            <option value="2">Technician</option>
                        </select>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button type="submit" class="btn mt-3 btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>;
};

export default Signin;
