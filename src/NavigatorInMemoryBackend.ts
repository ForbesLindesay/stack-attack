import type { Commit, NavigatorBackend } from "./NavigatorBackendType";

function makeCommits() {
  const existingStuffCommit: Commit = {
    title: "Existing stuff",
    hash: "1234",
    timestamp: new Date(0),
    author: "Commit McCommitFace",
    branchNames: ["master"],
    parentCommits: [],
    childCommits: [],
  };

  const newMasterCommit: Commit = {
    title: "Other peoples trash",
    hash: "1235",
    timestamp: new Date(100),
    author: "Commit McCommitFace",
    branchNames: ["origin/master"],
    parentCommits: [existingStuffCommit],
    childCommits: [],
  };
  existingStuffCommit.childCommits.push(newMasterCommit);

  const commit1: Commit = {
    title: "1",
    hash: "abc1",
    timestamp: new Date(1),
    author: "Commit McCommitFace",
    branchNames: [],
    parentCommits: [existingStuffCommit],
    childCommits: [],
  };
  existingStuffCommit.childCommits.push(commit1);

  const commit2: Commit = {
    title: "2",
    hash: "abc2",
    timestamp: new Date(2),
    author: "Commit McCommitFace",
    branchNames: [],
    parentCommits: [commit1],
    childCommits: [],
  };
  commit1.childCommits.push(commit2);

  return existingStuffCommit;
}

export const backend: NavigatorBackend = {
  getRepositoryInformation(repoPath: string) {
    const repo = {
      path: "/",
      hasUncommittedChanges: true,
      headHash: "1234",
      rootDisplayCommit: makeCommits(),
    };
    return Promise.resolve({
      repo,
      remoteRepoInfoPromise: Promise.resolve(repo),
    });
  },

  createOrUpdateBranchesForCommitStack(
    repoPath: string,
    commitStack: Commit[],
  ) {
    return Promise.reject("NOT IMPLEMENTED");
  },

  rebaseCommits(repoPath: string, rootCommit: Commit, targetCommit: Commit) {
    return Promise.reject("NOT IMPLEMENTED");
  },

  amendAndRebaseDependentTree(repoPath: string) {
    return Promise.reject("NOT IMPLEMENTED");
  },

  createOrUpdatePRsForCommits(repoPath: string, commitStack: Commit[]) {
    return Promise.reject("NOT IMPLEMENTED");
  },
};