const jimp = require('jimp');
const fs = require('fs');
const pathToFfmeg = require('ffmpeg-static');
const util = require('util');
const { spawn } = require("child_process");

const inputFile = 'C:\\dev\\videoEditor\\video_original.mp4';
const output = 'C:\\dev\\videoEditor\\processed_video.mp4';


console.log('encoding video');

let encode_options = [
    ` -i ${inputFile}`,
    '-filter_complex "[0:v]setpts=4.0*PTS[v]"',
    '-map [v]',
    ' -f', 'mp4', `${output}`
];
        
let encode = spawn(pathToFfmeg,  encode_options, {shell: true});

encode.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});
        
encode.on('error', (error) => {
    console.log(error);
});
        
encode.on("close", code => {
    console.log(`child process exited with code ${code}`);
});