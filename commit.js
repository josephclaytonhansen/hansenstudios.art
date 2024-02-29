import { execSync } from "child_process"

const date = new Date()
const formattedDate = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`
const commitMessage = `buildbot: ${formattedDate}`

execSync(
  `git add . && git commit --allow-empty -m "${commitMessage}" && git push`,
  { stdio: "inherit" },
)
