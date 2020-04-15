const readline = require("readline");
const fetch = require('node-fetch');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getRepos(token, page = 0) {
  fetch(`https://api.github.com/orgs/parchment-io/repos?type=all&per_page=30&page=${page + 1}&sort=name`, {
    headers: { 'Authorization': `token ${token}` },
  }).then(res => res.json())
    .then(json => {
      repos = json.map((repo, i)=>{
        return `${repo.name}`;
      })

      //Spit out repos
      console.log(repos.join("\n"))

      //Fetch next page
      if(repos.length === 30) {
          page = page + 1
          getRepos(token, page)
      }
  });
}

console.log(`A personal access token is required to fetch private repos. https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line`);

rl.question("What is your github token? ", function(token) {
  getRepos(token)
});
