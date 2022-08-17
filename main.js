const APIURL = "https://api.github.com/users/";

const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

async function getUser(username) {
  const response = await fetch(APIURL + username);
  const responseData = await response.json();

  createUserCard(responseData);

  getRepos(username);
}

async function getRepos(username) {
  const response = await fetch(APIURL + username + "/repos");
  const responseData = await response.json();

  addReposToCard(responseData);
}

getUser("BogusFrontend");

function createUserCard(user) {
  const cardHTML = `
        <div class="card">
            <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
          </div>
          <div>
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
              <li><i class="fa-solid fa-users"></i>${user.followers} <span>Followers</span> </li>
              <li><i class="fa-solid fa-user-group"></i>${user.following}<span>Following</span></li>
              <li><i class="fa-solid fa-bars-progress"></i>${user.public_repos}<span>Repos</span></li>
            </ul>
            <h4>Repos:</h4>
            <div class="repos" id="repos"></div>
          </div>
        </div>

  `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerHTML = repo.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
