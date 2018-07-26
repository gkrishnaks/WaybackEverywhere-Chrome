#!/usr/bin/env node
// Built upon https://github.com/LinusU/wext-shipit 
// Refer the github link above for using wext-shipit package 
// I just needed the opera deploy from that package

require('dotenv').config()

const neodoc = require('neodoc')

const firefox = require('./.firefoxdeploy.js')
const UserError = require('./.user-error')
const opera = require('./lib/opera')

const usage = `
Usage:
  shipit chrome <source>
  shipit firefox <source>
  shipit opera <source>
`

async function main () {
  const args = neodoc.run(usage)

 

 if (args.opera) {
    await opera(args['<source>'])
  }

}

main().catch((err) => {
  process.exitCode = 1
  console.error((err instanceof UserError) ? err.message : err.stack)
})