#!/usr/bin/env node
// Clean script to free up space and memory

const fs = require('fs')
const path = require('path')

function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true })
    console.log(`✅ Deleted: ${folderPath}`)
  } else {
    console.log(`⏭️  Not found: ${folderPath}`)
  }
}

function cleanProject() {
  console.log('🧹 Cleaning project...')
  
  // Delete build artifacts
  deleteFolder('dist')
  deleteFolder('.vite')
  deleteFolder('node_modules/.vite')
  deleteFolder('node_modules/.cache')
  
  // Delete common cache folders
  deleteFolder('.next')
  deleteFolder('.nuxt')
  deleteFolder('coverage')
  
  // Delete OS specific folders
  deleteFolder('.DS_Store')
  deleteFolder('Thumbs.db')
  
  console.log('\n📋 Manual cleanup suggestions:')
  console.log('1. Clear browser data (DevTools > Application > Storage)')
  console.log('2. Close other browser tabs to free memory')
  console.log('3. Restart your development server')
  console.log('4. Consider restarting your IDE/editor')
  
  console.log('\n🔧 If you still have memory issues:')
  console.log('npm run clean:full')
}

function cleanFull() {
  console.log('🧹 Full cleanup...')
  cleanProject()
  
  // Delete node_modules for fresh install
  deleteFolder('node_modules')
  deleteFolder('package-lock.json')
  deleteFolder('yarn.lock')
  
  console.log('\n📦 Run: npm install')
  console.log('Then: npm run dev')
}

const command = process.argv[2]

if (command === 'full') {
  cleanFull()
} else {
  cleanProject()
}