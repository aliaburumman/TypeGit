class Git {
    public name: string;
    public id: number = 0;
    public message: string;
    private static lastId: number = 0;
    public HEAD: Branch;
    public branches: Branch[]


    constructor(name: string, message?: string) {
        this.name = name;
        this.id = Git.lastId++;
        this.message = message || '';
        var master = new Branch("master", null);
        this.HEAD = master;
        this.branches = [];
        this.branches.push(master);
    }

    commit(message: string) {
        const latestCommit = new Commit(message, this.HEAD.commit);
        this.HEAD.commit = (latestCommit);
    }

    log() {
        var commitCounter = this.HEAD.commit;
        var history: Commit[] = [];
        while (commitCounter) {
            history.push(commitCounter);
            commitCounter = commitCounter.parent;
        }

        return history;
    }

    checkout(branchName: string) {
        for (let i = 0; i < this.branches.length; i++) {
            if (this.branches[i].name === branchName) {
                console.log(`Checkout branch ${branchName}`);
                this.HEAD = this.branches[i];
                return this;
            }
        }

        var newBranch = new Branch(branchName, this.HEAD.commit);
        this.HEAD = newBranch;
        this.branches.push(newBranch);
        console.log("Checkout branch: " + branchName);
        return this;
    }
}

class Commit {
    public message: string;
    public timeStamp: number;
    private static lastCommitId: number = 0;
    public parent: Commit | null;
    public id: number;


    constructor(message: string, parent: Commit | null) {
        this.message = message;
        this.timeStamp = Date.now();
        this.id = ++Commit.lastCommitId;
        this.parent = parent;
    }

}

class Branch {
    public name: string;
    public commit: Commit | null;

    constructor(name: string, commit: Commit | null) {
        this.name = name;
        this.commit = commit;
    }
}


var repo = new Git("alo");
repo.commit("Make a commit");
repo.commit("Make another commit");
repo.log();
repo.checkout("Ali's-Branch");

