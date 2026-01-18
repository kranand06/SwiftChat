// export function getCurrentTime() {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//     return `${formattedHours}:${formattedMinutes} ${ampm}`;
// }

// export function getCurrentDate() {
//     const now = new Date();
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return now.toLocaleDateString(undefined, options);
// }

// export function formatDate(dateString) {
//     const date = new Date(dateString);
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString(undefined, options);
// }

// export function formatTime(dateString) {
//     const date = new Date(dateString);
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//     return `${formattedHours}:${formattedMinutes} ${ampm}`;
// }

export function messageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' , hour12: false });
}

export function scrollToBottom(ref) {
    if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }
}