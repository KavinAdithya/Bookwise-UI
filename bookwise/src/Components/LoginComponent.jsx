function LoginComponent() {
    return <>
        <form>
            <h3>Log in</h3>
            <div>
                <label> Username : </label>
                <input type="text" name="username"/> <br/>
            </div>
            <div>
                <label>Password : </label>
                <input type="text" name="password"/> <br/>          
            </div>
            <button type="submit">Submit</button>
        </form>
    </>
}

export default LoginComponent;