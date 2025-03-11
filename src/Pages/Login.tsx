function Login(){
    return (
    <>
        <div className="register">
            <form className="myform">
                <div className="formtitle">
                    LOGIN
                </div>

                <div className="inputrow">
                    <label>Username</label>
                    <input />
                </div>

                <div className="inputrow">
                    <label>Password</label>
                    <input type="password" />
                </div>
            </form>
        </div>
    </>
    );
}

export default Login;