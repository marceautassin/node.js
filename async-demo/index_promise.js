//asynchronous callback Hell

// console.log('before');

// getUser(1, (user) => {
//   getRepositories(user.gitUserName, (repos) => {
//     getCommits(user.gitUserName.repo, (commits) => {
//       console.log('commit', commits);
//     });
//   });
// });
// console.log('after');

// asynchonous promise

console.log('before');

getUser(1)
  .then(user => getRepositories(user.gitUserName))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commits', commits))
  .catch(erro => console.log('Error', err.message));

console.log('after');

//function
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('reading the database...');
      resolve({
        id: id,
        gitUserName: 'Marceau21'
      });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("checking on github for repositories...");
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("checking on github for commmits...");
      resolve(['first commit']);
    }, 2000);
  });
}
