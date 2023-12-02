import * as core from '@actions/core'
import { LambdaClient, PublishLayerVersionCommand } from "@aws-sdk/client-lambda"

async function run() {
    try {
        const bucketName = core.getInput('bucket-name', { required: true });
        const zipFileName = core.getInput('zip-file-name', { required: true })
        const layerName = core.getInput('layer-name', { required: true });
        const lambdaConfig = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            apiVersion: '2015-03-31',
            maxRetries: 2,
            region: process.env.AWS_REGION,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sslEnabled: true,
        }
        const client = new LambdaClient(lambdaConfig);
        const input = { // PublishLayerVersionRequest
            LayerName: layerName, // required
            Description: "STRING_VALUE",
            Content: { // LayerVersionContentInput
                S3Bucket: bucketName,
                S3Key: zipFileName
            },
            CompatibleRuntimes: [ // CompatibleRuntimes
                "nodejs16.x",
            ]
        };
        const command = new PublishLayerVersionCommand(input);
        const response = await client.send(command);
        core.setOutput('layer-version-arn', response.LayerVersionArn);
    } catch (error) {
        core.setFailed(error)
    }
}

run();