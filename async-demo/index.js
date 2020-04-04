//asynchronous v1

// console.log('before');

// getUser(1, (user) => {
//   getRepositories(user.gitUserName, (repos) => {
//     getCommits(user.gitUserName.repo, (commits) => {
//       console.log('commit', commits);
//     });
//   });
// });
// console.log('after');

//asynchronous v2

console.log('before');

getUser(1, getRepos);

console.log('after');

function getRepos(user) {
  getRepositories(user.gitUserName, getCommit);
}

function getCommit(repos) {
  getCommits(repos, displayCommits);
};

function displayCommits(commits) {
  console.log('commit', commits);
};

// //synchronous
// console.log('before');
// const getUser = getUser(1);
// const getRepositories = getRepositories(user.gitUserName);
// const getCommits = getCommits(repos[0]);
// console.log('after');

//function
function getUser(id, callback) {
  setTimeout(() => {
    console.log('reading the database...');
    callback({ id: id, gitUserName: 'Marceau21' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("checking on github for repositories...");
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}
function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("checking on github for commmits...");
    callback(['first commit']);
  }, 2000);
}
