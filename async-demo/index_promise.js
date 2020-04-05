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

// asynchonous promise based approach

// console.log('before');

// getUser(1)
// .then(user => getRepositories(user.gitUserName))
// .then(repos => getCommits(repos[0]))
// .then(commits => console.log('Commits', commits))
// .catch(erro => console.log('Error', err.message));

// console.log('after');

// Async and await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitUserName);
    const commits = await getCommits(repos[0])
    console.log(commits);
  }
  catch (err) {
    console.log('Error', err.message)
  }
}

console.log('before');
displayCommits();
console.log('after');
// permet de rendre plus compréhensible les promesses

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
      // reject(new Error('Could not get the repos..'))
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
