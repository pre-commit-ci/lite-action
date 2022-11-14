[![Build Status](https://github.com/pre-commit-ci/lite-action/actions/workflows/main.yml/badge.svg)](https://github.com/pre-commit-ci/lite-action/actions/workflows/main.yml)

action-lite
===========

**pre-commit.ci lite** is an add-on for GitHub Actions which safely auto
fixes PRs

### setup

1. install the [GitHub Application] on the relevant repositories
2. add the [GitHub action] to your workflow as the last step in your job:

   ```yaml
       - uses: pre-commit-ci/lite-action@v1.0.0
         if: always()
   ```

*note:* the step must have either the default `name` or contain the text
`pre-commit-ci-lite`.  the application uses this to find the right workflow.

### options

- `msg`: (default `[pre-commit.ci lite] apply automatic fixes`): commit message
  used for auto fixing

  ```yaml
      - uses: pre-commit-ci/lite-action@v1.0.0
        if: always()
        with:
          msg: apply code formatting
  ```

### example using [pre-commit/action]

technically _pre-commit.ci lite_ works for any code modification, though it was
built with `pre-commit` in mind.  here is an example workflow:

```yaml
on:
  pull_request:
  push:
    branches: [main, test-me-*]

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-python@v4
      with:
        python-version: 3.x
    - uses: pre-commit/action@v3.0.0
    - uses: pre-commit-ci/lite-action@v1.0.0
      if: always()
```

[GitHub Application]: https://github.com/apps/pre-commit-ci-lite/installations/new
[GitHub action]: https://github.com/pre-commit-ci/lite-action
[pre-commit/action]: https://github.com/pre-commit/action
