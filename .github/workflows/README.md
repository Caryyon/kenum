# GitHub Actions Workflows

This repository includes several automated workflows:

## 🧪 Test Workflow (`test.yml`)
- **Triggers**: Push to master/main, Pull Requests
- **Purpose**: Run tests across Node.js versions 16, 18, 20
- **Actions**: Install deps, run tests, build package, verify import

## 🚀 Release Workflow (`release.yml`) 
- **Triggers**: Push to master when `package.json` version changes
- **Purpose**: Automatically create GitHub releases
- **Actions**: Detect version changes, run tests, create release with changelog

## 📦 Publish Workflow (`publish.yml`)
- **Triggers**: 
  - When a GitHub release is published 
  - Manual trigger with optional version override
- **Purpose**: Publish to npm registry
- **Actions**: Run tests, build, publish to npm

## Setup Instructions

### 1. Create NPM Token
1. Login to npm as `caryyon`
2. Go to https://www.npmjs.com/settings/caryyon/tokens
3. Create a new **Automation** token
4. Copy the token (starts with `npm_`)

### 2. Add NPM Token to GitHub Secrets
1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Your npm token from step 1
5. Click "Add secret"

### 3. Usage Options

#### Option A: Automatic Release & Publish
1. Update version in `package.json`: `npm version patch|minor|major`
2. Commit and push: `git push origin master`
3. GitHub will automatically:
   - Create a release
   - Publish to npm

#### Option B: Manual Publish
1. Go to Actions tab → "Publish to npm" workflow
2. Click "Run workflow"
3. Optionally specify a version
4. Click "Run workflow"

#### Option C: Release-based Publish  
1. Create a release manually on GitHub
2. Publishing will trigger automatically

## Security Notes
- The `NPM_TOKEN` secret is only accessible to the publish workflow
- Workflows run in isolated environments
- No local npm login required