#!/bin/bash

set -xe

# Check edge release
if [[ ! -z ${EDGE_RELEASE} ]] ; then
  pnpx tsx ./scripts/bump-edge
fi

# Update token
if [[ ! -z ${NPM_TOKEN} ]] ; then
  echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ~/.npmrc
  echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
  echo "always-auth=true" >> ~/.npmrc
  npm whoami
fi

# Release packages
echo "Publishing"
pnpm publish --access public --no-git-checks
