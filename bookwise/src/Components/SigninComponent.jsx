import SubscriptionDropdownComponent from './SubscriptionDropdownComponent'

function SigninComponent() {
    return <>
        <h3>Register Your Details</h3>
        <form>
             <div>
                <label>Name </label>
                <input type="text" name="name"></input>
            </div>
            <div>
                <label>Email</label>
                <input type="text" name="email"></input>
            </div>
            <div>
                <label>Username</label>
                <input type="text" name="username"></input>
            </div>
            <div>
                <label>Password</label>
                <input type="text" name="password"></input>
            </div>
            <div>
                <label>Contact Number</label>
                <input type="text" name="contact"></input>
            </div>
            <div>
                <label>Address</label>
                <input type="text" name="address"></input>
            </div>
            <SubscriptionDropdownComponent/>
            <button type="submit">Submit</button>
        </form>
    </>
}

export default SigninComponent;