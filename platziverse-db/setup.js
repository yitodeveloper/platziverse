'use strict'

const debug = require('debug')('platziverse:db:setup')
const db = require('./')
const chalk = require('chalk')
const inquirer = require('inquirer')

const propmt = inquirer.createPromptModule()

async function setup () {
  const answer = await propmt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will be destroy your database, are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('success')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}
setup()
