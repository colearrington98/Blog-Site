const logoutHandler = async (event) => { // This function is called when the logout button is clicked
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}
document.querySelector("#logout").addEventListener("click", logoutHandler); // may need to change event listener to "submit"