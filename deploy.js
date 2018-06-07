const exec      = require('child_process').exec;

let zipName = 'extension.zip';

// credentials and IDs from gitlab-ci.yml file
let REFRESH_TOKEN = process.env.REFRESH_TOKEN; 
let EXTENSION_ID = process.env.EXTENSION_ID;
let CLIENT_SECRET = process.env.CLIENT_SECRET;
let CLIENT_ID = process.env.CLIENT_ID;

// to fetch it from node_modules
let webstoreLocation = './node_modules/.bin/webstore';
console.log("directory is " + __dirname);
uploadZip().then(function(returnvalue) {
    if(returnvalue > 0){
        return 1;
    }
}); 

async function uploadZip() {
  let cmd = getUploadCommand();
  await exec(cmd, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
      return 2;
    } else {
      console.log('Successfully Uploaded the zip to chrome web store');
      publishExtension().then(function(returnvalue) {
          if(returnvalue === 3){
              return 3;
          }
      }); // on successful upload, call publish 
      return 0;
    }
  });
}



async function publishExtension() {
  let cmd = getPublishCommand();
  await exec(cmd, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
      return 3;
    } else {
      console.log('Successfully published the newer version');
    }
  });
}

function getUploadCommand() {
  return `${webstoreLocation} upload --source ${zipName} --extension-id ${EXTENSION_ID} --client-id ${CLIENT_ID} --client-secret ${CLIENT_SECRET} --refresh-token ${REFRESH_TOKEN}`;
}

function getPublishCommand() {
  return `${webstoreLocation} publish --extension-id ${EXTENSION_ID} --client-id ${CLIENT_ID} --client-secret ${CLIENT_SECRET} --refresh-token ${REFRESH_TOKEN}`;
}