Zazu Plugin - GitHub repos
==========================

Zazu plugin that allows searching and opening your GitHub repos.
To search type in Zazu: `gh name`.

Installation
------------

Credentials are read from a netrc file (defaulting to `~/.netrc`).
Create the file with the following:

```
machine api.github.com
  login gabrielpoca
  password supsersafepassword
```

If you want to use oauth instead, just replace the password with the oauth token:

```
machine api.github.com
  login gabrielpoca
  password <your 40 char token>
```

Finally, add the plugin to your list of plugins.

```
{
  "plugins": [
    "gabrielpoca/zazu-github-repos"
  ]
}
```


Keep in mind that it may be slow the first time it runs.

Reloading
---------

If a new repo doesn't show up, you can call the reload command searching for
"reload" in Zazu.
