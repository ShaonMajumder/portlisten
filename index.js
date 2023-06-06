#!/usr/bin/env node

const net = require('net');

/**
 * Displays a spinner animation in the console.
 * @returns {Object} An object with a `clear` method to stop the spinner animation.
 */
const displaySpinner = () => {
  const spinnerChars = ['|', '/', '-', '\\'];
  let currentChar = 0;

  const interval = setInterval(() => {
    process.stdout.write(`Scanning ports... ${spinnerChars[currentChar]} \r`);
    currentChar = (currentChar + 1) % spinnerChars.length;
  }, 100);

  return {
    clear: () => {
      clearInterval(interval);
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
    },
  };
};

/**
 * Scans a specific port on the given host.
 * @param {number} port - The port to scan.
 * @returns {Promise<number>} A promise that resolves to the open port if successful.
 */
const scanPort = (port) => {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();

    socket.connect(port, host, () => {
      socket.destroy();
      resolve(port);
    });

    socket.on('error', (err) => {
      reject(err);
    });
  });
};

/**
 * Delays the execution for a specified time.
 * @param {number} ms - The delay duration in milliseconds.
 * @returns {Promise} A promise that resolves after the specified delay.
 */
const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * Scans a range of ports on the given host.
 * @param {number} startPort - The starting port of the range.
 * @param {number} endPort - The ending port of the range.
 * @returns {Promise<number[]>} A promise that resolves to an array of open ports.
 */
const scanPorts = async (startPort, endPort) => {
  const spinner = displaySpinner();
  const openPorts = [];

  for (let port = startPort; port <= endPort; port++) {
    try {
      await delay(0);
      const result = await scanPort(port);
      openPorts.push(result);
      console.log(`Port ${result}: OPEN`);
    } catch (err) {
      // console.log(`Port ${port}: CLOSED`);
    }
  }

  spinner.clear();
  return openPorts;
};

const args = process.argv.slice(2);
const host = args[0];
const startPort = parseInt(args[1]);
const endPort = parseInt(args[2]);

/**
 * Validates the command-line arguments.
 * @returns {boolean} True if the arguments are valid, false otherwise.
 */
const validateArguments = () => {
  if (args.length !== 3) {
    console.log('Invalid command. Please provide the following arguments:');
    console.log('Usage: portlisten <host> <startPort> <endPort>');
    console.log('Example: portlisten localhost 1 100');
    return false;
  }

  if (isNaN(startPort) || isNaN(endPort)) {
    console.log('Please provide valid start and end ports as command-line arguments.');
    console.log('Example usage: portlisten localhost 1 100');
    return false;
  }

  return true;
};

/**
 * Prints the list of open ports.
 * @param {number[]} openPorts - An array of open ports.
 */
const printOpenPorts = (openPorts) => {
  console.log('Open Ports:');
  if (openPorts.length === 0) {
    console.log('No open ports found.');
  } else {
    console.log(openPorts.join(', '));
  }
};

/**
 * The main function that orchestrates the port scanning process.
 */
const main = async () => {
  if (!validateArguments()) {
    return;
  }

  try {
    const openPorts = await scanPorts(startPort, endPort);
    printOpenPorts(openPorts);
  } catch (err) {
    console.error('Error:', err);
  }
};

main();
