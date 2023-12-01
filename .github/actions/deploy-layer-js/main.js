const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // 1) Get some input values
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true});
    const distFolder = core.getInput('dist-folder', {required: true});
    const packageName = core.getInput('package-name', {required: true});
    const layerName = core.getInput('layer-name', {required: true});
    const layerDescription = core.getInput('layer-description', {required: true});

    // 2) upload layer
    const s3Uri = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    // 2) publish layer
    exec.exec(`aws lambda publish-layer-version \
    --layer-name ${layerName} \
    --description ${layerDescription} \
    --content S3Bucket=${bucket},S3Key=${packageName} \
    --compatible-runtimes nodejs16.x`);


    
    //const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

    //core.setOutput('website-url', websiteUrl);

}
run();