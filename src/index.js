import Bootstrap from './bootstrap'

// Main entry
// Use command line with command like yarn start "1m" 10
let b = new Bootstrap(process.argv[2],process.argv[3])
b.launch();