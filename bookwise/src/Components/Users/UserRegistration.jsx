import { useEffect, useState } from "react";
import Lookup from "../General/Templates/Lookup";
import { registerUser } from "../../apiservice/users/userservice";
import { fetchAllSubscriptionPlans } from "../../apiservice/subscriptions/SubscriptionService";
import "../../css/General/RegistrationForm.css";

function UserRegistration() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");

    const [subscriptionId, setSubscriptionId] = useState();
    const [subscriptions, setSubscriptions] = useState([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchAllSubscriptionPlans()
            .then(response => {
                setSubscriptions(response.data.data);
            })
            .catch(error => {
                console.error(error);
                setError("Unable to load subscription plans.");
            });

    }, []);

    async function registerUserData(event) {

        event.preventDefault();

        setError("");

        if (!subscriptionId && subscriptionId !== 0) {
            setError("Please select a subscription plan.");
            return;
        }

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
                    plan: subscriptions[subscriptionId].name
                }
            };

            await registerUser(userData);

            alert("User Registered Successfully");

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to register account."
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="registration-form">

            <div className="registration-form-header">
                <h3>Create User Account</h3>
                <p>
                    Create your account to explore and manage your books.
                </p>
            </div>

            <form onSubmit={registerUserData}>

                <div className="registration-fields">

                    <div className="registration-field">
                        <label htmlFor="user-name">
                            Full Name
                        </label>

                        <input
                            id="user-name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="user-email">
                            Email
                        </label>

                        <input
                            id="user-email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="user-username">
                            Username
                        </label>

                        <input
                            id="user-username"
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="user-password">
                            Password
                        </label>

                        <input
                            id="user-password"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="user-contact">
                            Contact Number
                        </label>

                        <input
                            id="user-contact"
                            type="tel"
                            name="contact"
                            placeholder="Enter your contact number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>


                    <div className="registration-field">
                        <label htmlFor="user-address">
                            Address
                        </label>

                        <input
                            id="user-address"
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>


                    <div className="registration-field registration-full-width">
                        <label>
                            Subscription Plan
                        </label>

                        <Lookup
                            title="Subscription"
                            onSelect={setSubscriptionId}
                            values={subscriptions}
                        />
                    </div>

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
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

            </form>

        </div>
    );
}

export default UserRegistration;