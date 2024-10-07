import process from 'node:process'
import { spawnSync } from 'child_process'

const { status } = spawnSync('which', ['deno'], { stdio: 'ignore' })

if (status) {
  console.warn(
    `\u001b[33mThis repository requires using deno` +
      ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
