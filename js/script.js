//Global Variables
const profileOverview = document.querySelector(".overview");
const username = "jrocca82";
const repoList = document.querySelector(".repo-list");
const reposInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");


//Fetch profile data
const getData = async function(){
  const request = await fetch (`https://api.github.com/users/${username}`);
  const getProfile = await request.json();
  displayProfile(getProfile);
}

getData();

//Display profile
const displayProfile = function(getProfile){
  const profileDiv = document.createElement("div");
  profileDiv.classList.add("user-info");
  profileDiv.innerHTML =
    `<figure>
      <img alt="user avatar" src=${getProfile.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${getProfile.name}</p>
      <p><strong>Bio:</strong> ${getProfile.bio}</p>
      <p><strong>Number of public repos:</strong> ${getProfile.public_repos}</p>
    </div>`;
    profileOverview.append(profileDiv);
    fetchRepos();
};

//Populate repos
const fetchRepos = async function(){
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await response.json();
  displayRepos(repoData);
};

//Display repos
const displayRepos = function(repos){
  for (const repo of repos){
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  };
};


//Click repo event listener
repoList.addEventListener("click", function(e){
  if (e.target.matches("h3")){
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

//Fetch single repo data
const getRepoInfo = async function (repoName){
  const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await getInfo.json();

//Fetch Languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

//Languages Array
  const languages = [];
    for (key in languageData){
      languages.push(languageData);
    }

  displayRepoInfo(repoInfo, languages);
};

//Display single repo info
const displayRepoInfo = function(repoInfo, languages){
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  reposInfo.classList.add("hide");
  const repoDiv = document.createElement("div");
  repoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(repoDiv);
};
