# Chapter 11-2

This directory makes use of `electron-webpack`. Refer to the following link for more details:

https://webpack.electron.build/


## If electron-rebuild fails...

If electron-rebuild fails like below, Download the missing file from https://www.sqlite.org/download.html.

```
PS C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter> yarn postinstall
yarn run v1.22.4
$ electron-rebuild
× Rebuild Failed

An unhandled error occurred inside electron-rebuild
gyp info it worked if it ends with ok
gyp info using node-gyp@6.1.0
gyp info using node@10.20.1 | win32 | x64
gyp info find Python using Python version 3.8.3 found at "C:\Users\1nsan\AppData\Local\Programs\Python\Python38\python.exe"
gyp info find VS using VS2019 (16.5.30104.148) found at:
gyp info find VS "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools"
gyp info find VS run with --verbose for detailed information
gyp info spawn C:\Users\1nsan\AppData\Local\Programs\Python\Python38\python.exe
gyp info spawn args [ 'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\electron-rebuild\\node_modules\\node-gyp\\gyp\\gyp_main.py',
gyp info spawn args   'binding.gyp',
gyp info spawn args   '-f',
gyp info spawn args   'msvs',
gyp info spawn args   '-I',
gyp info spawn args   'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3\\build\\config.gypi',
gyp info spawn args   '-I',
gyp info spawn args   'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\electron-rebuild\\node_modules\\node-gyp\\addon.gypi',
gyp info spawn args   '-I',
gyp info spawn args   'C:\\Users\\1nsan\\.electron-gyp\\8.2.0\\include\\node\\common.gypi',
gyp info spawn args   '-Dlibrary=shared_library',
gyp info spawn args   '-Dvisibility=default',
gyp info spawn args   '-Dnode_root_dir=C:\\Users\\1nsan\\.electron-gyp\\8.2.0',
gyp info spawn args   '-Dnode_gyp_dir=C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\electron-rebuild\\node_modules\\node-gyp',
gyp info spawn args   '-Dnode_lib_file=C:\\\\Users\\\\1nsan\\\\.electron-gyp\\\\8.2.0\\\\<(target_arch)\\\\node.lib',
gyp info spawn args   '-Dmodule_root_dir=C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3',
gyp info spawn args   '-Dnode_engine=v8',
gyp info spawn args   '--depth=.',
gyp info spawn args   '--no-parallel',
gyp info spawn args   '--generator-output',
gyp info spawn args   'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3\\build',
gyp info spawn args   '-Goutput_dir=.' ]
Warning: Missing input files:
C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\sqlite3\build\deps\..\..\deps\sqlite-autoconf-3310100.tar.gz
gyp info spawn C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe
gyp info spawn args [ 'build/binding.sln',
gyp info spawn args   '/clp:Verbosity=minimal',
gyp info spawn args   '/nologo',
gyp info spawn args   '/p:Configuration=Release;Platform=x64' ]
Building the projects in this solution one at a time. To enable parallel build, please add the "-m" switch.
  unpack_sqlite_dep
  Traceback (most recent call last):
    File "..\..\deps\extract.py", line 7, in <module>
      tfile = tarfile.open(tarball,'r:gz');
    File "C:\Users\1nsan\AppData\Local\Programs\Python\Python38\lib\tarfile.py", line 1617, in open
      return func(name, filemode, fileobj, **kwargs)
    File "C:\Users\1nsan\AppData\Local\Programs\Python\Python38\lib\tarfile.py", line 1663, in gzopen
      fileobj = GzipFile(name, mode + "b", compresslevel, fileobj)
    File "C:\Users\1nsan\AppData\Local\Programs\Python\Python38\lib\gzip.py", line 173, in __init__
      fileobj = self.myfileobj = builtins.open(filename, mode or 'rb')
  FileNotFoundError: [Errno 2] No such file or directory: 'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3\\deps\\sqlite-autoconf-3310100.tar.gz'
C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Microsoft\VC\v160\Microsoft.CppCommon.targets(231,5): error MSB6006: "cmd.exe" exited with code 1. [C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\sqlite3\build\deps\action_before_build.vcxproj]
gyp ERR! build error
gyp ERR! stack Error: `C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onExit (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\electron-rebuild\node_modules\node-gyp\lib\build.js:194:23)
gyp ERR! stack     at ChildProcess.emit (events.js:198:13)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:248:12)
gyp ERR! System Windows_NT 10.0.18363
gyp ERR! command "C:\\Program Files\\nodejs\\node.exe" "C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\electron-rebuild\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild" "--target=8.2.0" "--arch=x64" "--dist-url=https://www.electronjs.org/headers" "--build-from-source" "--module_name=node_sqlite3" "--module_path=C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3\\lib\\binding\\electron-v8.2-win32-x64" "--host=https://mapbox-node-binary.s3.amazonaws.com" "--remote_path=./{name}/v4.2.0/{toolset}/" "--package_name=electron-v8.2-win32-x64.tar.gz"
gyp ERR! cwd C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\sqlite3
gyp ERR! node -v v10.20.1
gyp ERR! node-gyp -v v6.1.0
gyp ERR! not ok

Failed with exit code: 1

Error: gyp info it worked if it ends with ok
gyp info using node-gyp@6.1.0
gyp info using node@10.20.1 | win32 | x64
gyp info find Python using Python version 3.8.3 found at "C:\Users\1nsan\AppData\Local\Programs\Python\Python38\python.exe"
gyp info find VS using VS2019 (16.5.30104.148) found at:
gyp info find VS "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools"
gyp info find VS run with --verbose for detailed information
gyp info spawn C:\Users\1nsan\AppData\Local\Programs\Python\Python38\python.exe
gyp info spawn args [ 'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\electron-rebuild\\node_modules\\node-gyp\\gyp\\gyp_main.py',
gyp info spawn args   'binding.gyp',
gyp info spawn args   '-f',
gyp info spawn args   'msvs',
gyp info spawn args   '-I',
gyp info spawn args   'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3\\build\\config.gypi',
gyp info spawn args   '-I',
gyp info spawn args   'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\electron-rebuild\\node_modules\\node-gyp\\addon.gypi',
gyp info spawn args   '-I',
gyp info spawn args   'C:\\Users\\1nsan\\.electron-gyp\\8.2.0\\include\\node\\common.gypi',
gyp info spawn args   '-Dlibrary=shared_library',
gyp info spawn args   '-Dvisibility=default',
gyp info spawn args   '-Dnode_root_dir=C:\\Users\\1nsan\\.electron-gyp\\8.2.0',
gyp info spawn args   '-Dnode_gyp_dir=C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\electron-rebuild\\node_modules\\node-gyp',
gyp info spawn args   '-Dnode_lib_file=C:\\\\Users\\\\1nsan\\\\.electron-gyp\\\\8.2.0\\\\<(target_arch)\\\\node.lib',
gyp info spawn args   '-Dmodule_root_dir=C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3',
gyp info spawn args   '-Dnode_engine=v8',
gyp info spawn args   '--depth=.',
gyp info spawn args   '--no-parallel',
gyp info spawn args   '--generator-output',
gyp info spawn args   'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3\\build',
gyp info spawn args   '-Goutput_dir=.' ]
Warning: Missing input files:
C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\sqlite3\build\deps\..\..\deps\sqlite-autoconf-3310100.tar.gz
gyp info spawn C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe
gyp info spawn args [ 'build/binding.sln',
gyp info spawn args   '/clp:Verbosity=minimal',
gyp info spawn args   '/nologo',
gyp info spawn args   '/p:Configuration=Release;Platform=x64' ]
Building the projects in this solution one at a time. To enable parallel build, please add the "-m" switch.
  unpack_sqlite_dep
  Traceback (most recent call last):
    File "..\..\deps\extract.py", line 7, in <module>
      tfile = tarfile.open(tarball,'r:gz');
    File "C:\Users\1nsan\AppData\Local\Programs\Python\Python38\lib\tarfile.py", line 1617, in open
      return func(name, filemode, fileobj, **kwargs)
    File "C:\Users\1nsan\AppData\Local\Programs\Python\Python38\lib\tarfile.py", line 1663, in gzopen
      fileobj = GzipFile(name, mode + "b", compresslevel, fileobj)
    File "C:\Users\1nsan\AppData\Local\Programs\Python\Python38\lib\gzip.py", line 173, in __init__
      fileobj = self.myfileobj = builtins.open(filename, mode or 'rb')
  FileNotFoundError: [Errno 2] No such file or directory: 'C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3\\deps\\sqlite-autoconf-3310100.tar.gz'
C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Microsoft\VC\v160\Microsoft.CppCommon.targets(231,5): error MSB6006: "cmd.exe" exited with code 1. [C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\sqlite3\build\deps\action_before_build.vcxproj]
gyp ERR! build error
gyp ERR! stack Error: `C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onExit (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\electron-rebuild\node_modules\node-gyp\lib\build.js:194:23)
gyp ERR! stack     at ChildProcess.emit (events.js:198:13)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:248:12)
gyp ERR! System Windows_NT 10.0.18363
gyp ERR! command "C:\\Program Files\\nodejs\\node.exe" "C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\electron-rebuild\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild" "--target=8.2.0" "--arch=x64" "--dist-url=https://www.electronjs.org/headers" "--build-from-source" "--module_name=node_sqlite3" "--module_path=C:\\Users\\1nsan\\Documents\\src\\github\\electron_in_action\\chapter12\\jetsetter\\node_modules\\sqlite3\\lib\\binding\\electron-v8.2-win32-x64" "--host=https://mapbox-node-binary.s3.amazonaws.com" "--remote_path=./{name}/v4.2.0/{toolset}/" "--package_name=electron-v8.2-win32-x64.tar.gz"
gyp ERR! cwd C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\sqlite3
gyp ERR! node -v v10.20.1
gyp ERR! node-gyp -v v6.1.0
gyp ERR! not ok

Failed with exit code: 1
    at SafeSubscriber._error (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\spawn-rx\lib\src\index.js:267:84)
    at SafeSubscriber.__tryOrUnsub (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\rxjs\internal\Subscriber.js:205:16)
    at SafeSubscriber.error (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\rxjs\internal\Subscriber.js:156:26)
    at Subscriber._error (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\rxjs\internal\Subscriber.js:92:26)
    at Subscriber.error (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\rxjs\internal\Subscriber.js:72:18)
    at MapSubscriber.Subscriber._error (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\rxjs\internal\Subscriber.js:92:26)
    at MapSubscriber.Subscriber.error (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\rxjs\internal\Subscriber.js:72:18)
    at SafeSubscriber._next (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\spawn-rx\lib\src\index.js:242:65)
    at SafeSubscriber.__tryOrUnsub (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\rxjs\internal\Subscriber.js:205:16)
    at SafeSubscriber.next (C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter\node_modules\rxjs\internal\Subscriber.js:143:22)
error Command failed with exit code 4294967295.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
PS C:\Users\1nsan\Documents\src\github\electron_in_action\chapter12\jetsetter>
```



