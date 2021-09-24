//Profile Information
const profileOverview = document.querySelector(".overview");
const username = "jrocca82";

const getData = async function(){
  const request = await fetch (`https://api.github.com/users/${username}`);
  const getProfile = await request.json();
  displayProfile(getProfile);
}

getData();

const displayProfile = function(getProfile){
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML =
    `<figure>
      <img alt="user avatar" src=${getProfile.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${getProfile.name}</p>
      <p><strong>Bio:</strong> ${getProfile.bio}</p>
      <p><strong>Number of public repos:</strong> ${getProfile.public_repos}</p>
    </div>`;
    profileOverview.append(div);
};
