# Portlisten
A simple port scanner utility for Node.js.

This npm package provides a command-line tool for scanning ports on a given host within a specified range. It utilizes the 'net' module in Node.js to establish socket connections and determine if ports are open or closed.

# Demo 
![Portlisten Logo](https://github.com/ShaonMajumder/portlisten/blob/HEAD/demo.gif)

# Features
- Scan ports within a specified range on a given host
- Display a spinning animation during the scanning process
- Output a list of open ports found

# Installation
To install the Portlisten package, use the following command:
```bash
npm install -g portlisten
```

# Usage
The Portlisten package provides a command-line tool for scanning ports on a given host within a specified range.

```bash
portlisten <host> <startPort> <endPort>
```

Example:
```bash
portlisten localhost 1 100
```

This command will scan ports from 1 to 100 on the localhost and display a list of open ports found.

Note: This package requires Node.js to be installed on your system.

For more details and options, please refer to the documentation available on GitHub.

GitHub Repository: https://github.com/ShaonMajumder/portlisten

# Contributing
Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

# License
This project is licensed under the MIT License. See the LICENSE file for details.

# Credits
Author - Shaon Majumder <smazoomder@gmail.com>