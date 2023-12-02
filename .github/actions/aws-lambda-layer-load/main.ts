import * as exec from '@actions/exec'
import * as core from '@actions/core'

function run() {
    // 1) Get Input Values
    const bucketName = core.getInput('bucke-name', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true});
    const distFolder = core.getInput('dist-folder', {required: true});
    // 2) Upload Layer Package
    const s3Uri = `s3://${bucketName}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);
}
run();