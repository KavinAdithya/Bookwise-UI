import { useState } from "react";
import { registerAuthor } from "../../apiservice/authors/AuthorService";
import "../../css/General/RegistrationForm.css";

function AuthorRegistration() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function registerAuthorData(event) {

        event.preventDefault();

        setError("");

        try {

            setLoading(true);

            const userData = {
                name: name,
                email: email,
                username: username,
                password: password,
                contact: contact,
                address: address,
                subscription: {
                    plan: "FREE"
                }
            };

            const authorData = {
                bio: bio,
                user: userData
            };

            await registerAuthor(authorData);

            alert("Author Registered Successfully");

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to register author account."
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="registration-form">

            <div className="registration-form-header">
                <h3>Create Author Account</h3>
                <p>
                    Submit your author profile and start publishing with BookWise.
                </p>
            </div>

            <form onSubmit={registerAuthorData}>

                <div className="registration-fields">

                    <div className="registration-field">
                        <label htmlFor="author-name">
                            Full Name
                        </label>

                        <input
                            id="author-name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="author-email">
                            Email
                        </label>

                        <input
                            id="author-email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="author-username">
                            Username
                        </label>

                        <input
                            id="author-username"
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="author-password">
                            Password
                        </label>

                        <input
                            id="author-password"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="author-contact">
                            Contact Number
                        </label>

                        <input
                            id="author-contact"
                            type="tel"
                            name="contact"
                            placeholder="Enter your contact number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="author-address">
                            Address
                        </label>

                        <input
                            id="author-address"
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>


                    <div className="registration-field registration-full-width">
                        <label htmlFor="author-bio">
                            About You
                        </label>

                        <textarea
                            id="author-bio"
                            name="bio"
                            placeholder="Tell us a little about yourself and your writing..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                </div>


                <div className="author-registration-note">
                    <strong>Author approval:</strong>
                    {" "}
                    Your account will be reviewed by an administrator before
                    author publishing features are enabled.
                </div>


                {error && (
                    <p className="registration-error">
                        {error}
                    </p>
                )}


                <button
                    type="submit"
                    className="registration-submit-btn"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Application"}
                </button>

            </form>

        </div>
    );
}

export default AuthorRegistration;