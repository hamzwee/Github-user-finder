document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    if (username) {
        fetchGitHubProfile(username);
    }
});

function fetchGitHubProfile(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Not Found') {
                showProfile(null);
            } else {
                showProfile(data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function showProfile(user) {
    const profileContainer = document.getElementById('profile');
    if (!user) {
        profileContainer.innerHTML = '<p>User not found</p>';
        return;
    }
    profileContainer.innerHTML = `
        <div class="profile">
            <img src="${user.avatar_url}" alt="${user.login}">
            <h2>${user.name || user.login}</h2>
            <p>${user.bio || ''}</p>
            <div class="info">
                <div>
                    <span>${user.public_repos}</span>
                    <small>Repositories</small>
                </div>
                <div>
                    <span>${user.followers}</span>
                    <small>Followers</small>
                </div>
                <div>
                    <span>${user.following}</span>
                    <small>Following</small>
                </div>
            </div>
        </div>
    `;
}
