import { simpleGit } from "simple-git";

const git = simpleGit("../");

//Pull the latest dev
export async function checkoutDevBranch() {

    const currentBranch = await git.revparse(["--abbrev-ref", "HEAD"]);

    if (currentBranch !== "dev") {
        await git.checkout("dev");
    }
    // If this fails (merge conflict, auth, network, etc.),
    // the error will automatically propagate to the caller.
    await git.pull("origin", "dev");
}

export async function createFixBranch() {
    const branchName = `ai-fix/${Date.now()}`;
    await git.checkoutLocalBranch(branchName);

    console.log(`Created branch: ${branchName}`);

    return branchName;
}

export async function commitFix(message: string) {
    await git.add(".");
    await git.commit(message);

    console.log("✅ Changes committed");
}

export async function pushBranch(branchName: string) {
    await git.push("origin", branchName);
}
