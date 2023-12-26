# jsLSA - JavaScript Linear System Analysis

![jsLSA Logo](https://timdevelopers.com/img/jslsa.png)

[jsLSA](https://github.com/TIMdavidIglesias/jsLSA/) is a JavaScript library for linear system analysis, providing tools for static and real-time analysis. This README provides a quick start guide and essential information for using the library.

## Table of Contents
- [Download](#download)
- [Installation](#installation)
- [Usage](#usage)
  - [Static Analysis](#static-analysis)
  - [Real-Time Analysis](#real-time-analysis)
- [Examples](#examples)

## Download

[jsLSA](https://github.com/TIMdavidIglesias/jsLSA/) can be directly downloaded from the GitHub repository. Use the following link to download the latest version:

[Download jsLSA](https://github.com/TIMdavidIglesias/jsLSA/)

## Installation

You can install jsLSA using npm or Yarn. Use the following commands:

### NPM
```bash
npm install jslsa
```

### YARN
```bash
yarn add jslsa
```

## Usage
To use jsLSA in your project, follow the steps below:

### Static Analysis
```javascript
const system = new jsLSA(Wn, Zeta, K, At, maxRealTimeSamples);

// Input for static analysis (Dirac's step)
const input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1 ...];

// Perform static analysis
const staticAnalysis = system.simpleLinearSimulation(input);

// Display results on a chart
// (chart code and parameters)

// Additional details about the transfer function:
// - Wn (ωₙ): 2.4
// - Zeta (ζ): 0.2
// - K: 1
// - At (Δt): 0.1
```

### Real-Time Analysis
```javascript
const system = new jsLSA(Wn, Zeta, K, At, maxRealTimeSamples = 2000);

// Input for real-time analysis
const realTimeAnalysis = system.realTimeLinearSimulation(input);

// Display real-time analysis results
// (chart code and parameters)
```

### Examples

You can find live examples for static and real-time jsLSA usage:

[![Edit xenodochial-violet-428ylt](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/xenodochial-violet-428ylt)
