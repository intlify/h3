import { spawnSync } from 'node:child_process'
import process from 'node:process'

const { status } = spawnSync('which', ['deno'], { stdio: 'ignore' })

if (status) {
  console.warn(
    `\u001B[33mThis repository requires using deno` + ` for scripts to work properly.\u001B[39m\n`
  )
  process.exit(1) // eslint-disable-line unicorn/no-process-exit -- NOTE(kazupon): exit script
}
