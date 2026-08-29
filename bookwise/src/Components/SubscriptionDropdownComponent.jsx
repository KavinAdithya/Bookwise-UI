import { useState } from "react";

function SubscriptionDropdownComponent() {
  const [selectedSubscription, setSelectedSubscription] = useState("");

  const subscriptions = [
    { id: 1, name: "Free" },
    { id: 2, name: "Basic" },
    { id: 3, name: "Premium" },
    { id: 4, name: "Lifetime"}
  ];

  return (
    <div>
      <label>Subscription</label>

      <select
        value={selectedSubscription}
        onChange={(e) => setSelectedSubscription(e.target.value)}
      >
        <option value="">-- Select Plan --</option>

        {subscriptions.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SubscriptionDropdownComponent;