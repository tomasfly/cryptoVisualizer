import Bootstrap from './bootstrap'

// Main entry
// Use command line with command like yarn start "1m" 10
if (process.argv.length !== 5) {
    throw new Error('Script should contain 3 params. Interval, length and which analyzer to launch. For example: yarn start "1d" 100 VolumeAnalyzer')
}

let b = new Bootstrap(process.argv[2], process.argv[3], process.argv[4])
b.launch();