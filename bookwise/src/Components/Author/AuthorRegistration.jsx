import {  useState } from 'react';
import { registerAuthor } from '../../apiservice/authors/AuthorService';


function AuthorRegistration() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [bio, setBio] = useState("")

    async function registerAuthorData() {
        const userData = {
            "name":name,
            "email":email,
            "username":username,
            "password":password,
            "contact":contact,
            "address":address,
            "subscription": {
                plan:"FREE"
            }
        }

        const authorData = {
            "bio": bio,
            "user": userData
        }

        
        await registerAuthor(authorData)
                .then(response => alert("Author Registered Successfully"))
                .catch(error => console.error(error))
    }
    
    return <>
        <h3>Create Author Account</h3>
        <div>
             <div>
                <label>Name </label>
                <input 
                    name="name"
                    type = "text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label>Bio</label>
                <input 
                    name="bio"
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}/>
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
           

            <button type="submit" onClick={registerAuthorData}>Submit</button>
        </div>
    </>
}

export default AuthorRegistration;