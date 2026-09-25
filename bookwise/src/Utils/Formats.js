export function formatDateTime(dateTime) {

    if (!dateTime) {
        return "-";
    }

    return new Date(dateTime).toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
 }

 export function formatDate(dateTime) {

    if (!dateTime) {
        return "-";
    }

    return new Date(dateTime).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}