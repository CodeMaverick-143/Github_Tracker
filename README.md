# GitHub Activity Tracker

GitHub Activity Tracker is a web application that allows users to track GitHub repositories, pull requests, merged PRs, and activity graphs by entering a GitHub username.

## Features
- Fetch and display the total number of repositories, stars, and pull requests.
- View a list of repositories with links.
- Check open and merged pull requests.
- Visualize GitHub activity (commits per day) using Chart.js.

## Technologies Used
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend API**: GitHub API
- **Chart Library**: Chart.js

## Setup and Usage

### Prerequisites
- A web browser
- A GitHub personal access token (required for authentication)

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/github_tracker.git
   cd github_tracker
   ```
2. Open `index.html` in a browser.
3. Enter a GitHub username and click "Track" to fetch data.

## API Integration
This project uses GitHub's REST API to retrieve data. The following endpoints are used:

- **Repositories**: `https://api.github.com/users/{username}/repos?per_page=100`
- **Stars Count**: `https://api.github.com/search/repositories?q=user:{username}`
- **Pull Requests**: `https://api.github.com/search/issues?q=author:{username}+type:pr`
- **Activity Events**: `https://api.github.com/users/{username}/events`

## Project Structure
```
📂 github-activity-tracker
├── 📄 index.html      # Main HTML file
├── 📄 script.js       # JavaScript logic for fetching data
├── 📄 styles.css      # Custom CSS styles (optional)
├── 📄 README.md       # Documentation
```

## Screenshots
(You can add screenshots here to showcase the project UI)

## Contributing
Feel free to contribute by opening a pull request or reporting issues.

## License
This project is open-source and available under the MIT License.

## Contact
For any queries, reach out at [nexawebs.tech@gmail.com](mailto:nexawebs.tech@gmail.com).
