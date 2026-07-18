import { simpleGit } from "simple-git";

const git = simpleGit("../");

/**
 * Checks out the `dev` branch and pulls the latest changes.
 */
export async function checkoutDevBranch() {
    await ensureCleanWorkingTree();
    const currentBranch = await git.revparse(["--abbrev-ref", "HEAD"]);

    if (currentBranch !== "dev") {
        await git.checkout("dev");
    }
    // If this fails (merge conflict, auth, network, etc.),
    // the error will automatically propagate to the caller.
    await git.pull("origin", "dev");
}

/**
 * Creates and checks out a new AI fix branch.
 */
export async function createFixBranch() {
    const branchName = `ai-fix/${Date.now()}`;
    await git.checkoutLocalBranch(branchName);

    console.log(`Created branch: ${branchName}`);

    return branchName;
}

/**
 * Stages all changes and creates a Git commit.
 *
 * @param message - Commit message.
 */
export async function commitFix(message: string) {
    await git.add(".");
    await git.commit(message);

    console.log("✅ Changes committed");
}

/**
 * Pushes the specified branch to the remote repository.
 *
 * @param branchName - Name of the branch to push.
 */
export async function pushBranch(branchName: string) {
    await git.push("origin", branchName);
}

/**
 * Ensures the Git working tree is clean before proceeding.
 */
export async function ensureCleanWorkingTree() {
    const status = await git.status();

    const relevantFiles = status.files.filter(
        (file) => file.path !== "logs/error.log"
    );

    if (relevantFiles.length > 0) {
        throw new Error(
            `Git working tree is not clean. Modified files: ${relevantFiles
                .map((f) => f.path)
                .join(", ")}`
        );
    }
}
