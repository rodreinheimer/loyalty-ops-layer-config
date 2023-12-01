const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // 1) Get some input values
    const bucket = core.getInput('bucket', { required: false });
    const bucketRegion = core.getInput('bucket-region', { required: false});
    const distFolder = core.getInput('dist-folder', {required: false});
    const message = 'bucket[`${bucket}`] bucketRegion[`${bucketRegion}`] distFolder[`${distFolder}`]'

    console.log(message)
    onsole.log(bucket)
    onsole.log(bucketRegion)
    onsole.log(distFolder)

    //2) upload files
    //const s3Uri = `s3://${bucket}`;
    //exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);
    
    //const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

    //core.setOutput('website-url', websiteUrl);

}
run();