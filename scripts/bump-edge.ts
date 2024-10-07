import process from 'node:process'
import { execSync } from 'node:child_process'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'

async function main() {
  const commit = execSync('git rev-parse --short HEAD').toString('utf-8').trim()
  const date = Math.round(Date.now() / (1000 * 60))

  const pkgPath = resolve(process.cwd(), 'package.json')
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8').catch(() => '{}'))
  pkg.version = `${pkg.version}-${date}.${commit}`
  pkg.name = pkg.name + '-edge'
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
