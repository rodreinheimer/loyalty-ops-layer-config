const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // 1) Get some input values
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true});
    const distFolder = core.getInput('dist-folder', {required: true});
    const packageName = core.getInput('package-name', {required: true});
    const message = 'bucket[`${bucket}`] bucketRegion[`${bucketRegion}`] distFolder[`${distFolder}`]'

    console.log(message)
    console.log(bucket)
    console.log(bucketRegion)
    console.log(distFolder)

    // 2) upload files
    const s3Uri = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    exec.exec(`aws lambda publish-layer-version \
    --layer-name loyalty-ops-configurations-${ENV_NAME} \
    --description "Loyalty report and monitors configurations layer" \
    --content S3Bucket=${STACK_BUCKET},S3Key=layer_delta_${NOW}.zip \
    --compatible-runtimes nodejs16.x`);


    
    //const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

    //core.setOutput('website-url', websiteUrl);

}
run();