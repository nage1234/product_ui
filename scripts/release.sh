#!/usr/bin/env bash
# Usage: scripts/release.sh 1.2.0
# Sets package.json to the version, commits, and tags vX.Y.Z. Release product_backend with the same version first.
set -euo pipefail

version="${1:-}"
if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "usage: $0 X.Y.Z" >&2
    exit 1
fi
if [[ -n "$(git status --porcelain)" ]]; then
    echo "working tree is not clean; commit or stash first" >&2
    exit 1
fi
if [[ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]]; then
    echo "releases are cut from main" >&2
    exit 1
fi
if git rev-parse -q --verify "refs/tags/v$version" > /dev/null; then
    echo "tag v$version already exists" >&2
    exit 1
fi

npm version "$version" --no-git-tag-version > /dev/null
git add package.json package-lock.json
git commit -m "Release $version"
git tag -a "v$version" -m "Release $version"

echo "Tagged v$version. Publish with:"
echo "  git push origin main && git push origin v$version"
echo "(the workflow refuses to publish product-ui:$version until product-backend:$version exists)"
