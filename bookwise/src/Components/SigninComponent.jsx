import { useEffect, useState } from 'react';
import LookupDropdown from './LookupDropdown';
import { registerUser } from '../apiservice/users/userservice';
import { fetchAllSubscriptionPlans } from '../apiservice/subscriptions/SubscriptionService';

function SigninComponent() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [subscriptionId, setSubscriptionId] = useState()
    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
    fetchAllSubscriptionPlans()
        .then(response => setSubscriptions(response.data.data))
        .catch(error => console.error(error));
}, []);

    async function registerUserData() {
        console.log("Before Data set up")
        const userData = {
            "name":name,
            "email":email,
            "username":username,
            "password":password,
            "contact":contact,
            "address":address,
            "subscription": {
                plan:subscriptions[subscriptionId].name
            }
        }
        
        try {
            console.log("Before API call")
            const response = await registerUser(userData);
            console.log(response)
        }
        catch(error) {
            console.log(error)
        }
        

    }
    
    return <>
        <h3>Register Your Details</h3>
        <div>
             <div>
                <label>Name </label>
                <input 
                    type="text" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label>Email</label>
                <input 
                    type="text" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Username</label>
                <input 
                    type="text" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <label>Contact Number</label>
                <input 
                    type="text" 
                    name="contact" 
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}/>
            </div>
            <div>
                <label>Address</label>
                <input 
                    type="text" 
                    name="address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div>
                <label>Subscription</label>
                <LookupDropdown title="Subscription" onSelect={setSubscriptionId} values={subscriptions}/>
            </div>
            <button type="submit" onClick={registerUserData}>Submit</button>
        </div>
    </>
}

export default SigninComponent;