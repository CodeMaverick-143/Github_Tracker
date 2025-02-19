const GITHUB_TOKEN = "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"; // Replace with your actual GitHub token

async function fetchGitHubData() {
    const username = document.getElementById('username').value.trim();
    if (!username) return alert('Enter a GitHub username!');

    const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json"
    };

    const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    const starsUrl = `https://api.github.com/search/repositories?q=user:${username}`;
    const pullsUrl = `https://api.github.com/search/issues?q=author:${username}+type:pr`;
    const eventsUrl = `https://api.github.com/users/${username}/events`;

    try {
        const [reposRes, starsRes, pullsRes, eventsRes] = await Promise.all([
            fetch(reposUrl, { headers }),
            fetch(starsUrl, { headers }),
            fetch(pullsUrl, { headers }),
            fetch(eventsUrl, { headers })
        ]);

        const reposData = await reposRes.json();
        const starsData = await starsRes.json();
        const pullsData = await pullsRes.json();
        const eventsData = await eventsRes.json();

        console.log("Repositories:", reposData);
        console.log("Stars Data:", starsData);
        console.log("Pull Requests Data:", pullsData);
        console.log("Events Data:", eventsData);

        updateStats(reposData, starsData.total_count, pullsData.items);
        updateRepoDropdown(reposData);
        drawChart(eventsData);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching GitHub data');
    }
}

// Update the total stats
function updateStats(repos, totalStars, pullRequests) {
    document.getElementById('totalRepos').textContent = repos.length;
    document.getElementById('totalStars').textContent = totalStars;
    document.getElementById('totalPRs').textContent = pullRequests.length;
    
    const mergedPRs = pullRequests.filter(pr => pr.pull_request && pr.pull_request.merged_at);
    document.getElementById('mergedPRs').textContent = mergedPRs.length;
}

// Populate the repository dropdown
function updateRepoDropdown(repos) {
    const repoDropdown = document.getElementById('repoDropdown');
    repoDropdown.innerHTML = `<option value="">Select a repository</option>`;

    repos.forEach(repo => {
        let option = document.createElement("option");
        option.value = repo.html_url;
        option.textContent = repo.name;
        repoDropdown.appendChild(option);
    });

    repoDropdown.addEventListener("change", function () {
        if (this.value) window.open(this.value, "_blank");
    });
}

// Draw the activity chart
function drawChart(eventsData) {
    const days = {};
    const pushEvents = eventsData.filter(event => event.type === 'PushEvent');

    pushEvents.forEach(event => {
        const date = event.created_at.split('T')[0];
        days[date] = (days[date] || 0) + 1;
    });

    const labels = Object.keys(days).sort();
    const data = labels.map(date => days[date]);

    const ctx = document.getElementById('activityChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Commits per Day',
                data,
                borderColor: '#00eaff',
                backgroundColor: 'rgba(0, 234, 255, 0.2)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: '#444'
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: '#444'
                    }
                }
            }
        }
    });
}
