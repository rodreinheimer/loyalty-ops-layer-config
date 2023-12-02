import * as core from '@actions/core'
import Lambda from 'aws-sdk/clients/lambda.js'

async function run() {
    try {
        const bucketName = core.getInput('bucket-name', { required: true });
        const zipFileName = core.getInput('zip-file-name', { required: true })
        const layerName = core.getInput('layer-name', { required: true })

        const lambdaConfig = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            apiVersion: '2015-03-31',
            maxRetries: 2,
            region: process.env.AWS_REGION,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sslEnabled: true,
        }

        const lambda = new Lambda(lambdaConfig)

        core.info('Publishing...')

        const response = await lambda.publishLayerVersion({
                Content: {
                    S3Bucket: bucketName,
                    S3Key: zipFileName
                },
                layerName,
            })
            .promise()

        core.info(`Publish Success : ${response.LayerVersionArn}`)
    } catch (error) {
        core.setFailed(error)
    }
}

run();