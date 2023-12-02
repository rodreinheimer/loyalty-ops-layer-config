import * as core from '@actions/core'
import { LambdaClient, PublishLayerVersionCommand } from "@aws-sdk/client-lambda"

async function run() {
    try {
        const bucketName = core.getInput('bucket-name', { required: true });
        const zipFileName = core.getInput('zip-file-name', { required: true })
        const layerName = core.getInput('layer-name', { required: true });

        console.log(bucketName);
        console.log(zipFileName);
        console.log(bucketName);

        const client = new LambdaClient(config);
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

        core.info(`Publish Success : ${response.LayerVersionArn}`)
    } catch (error) {
        core.setFailed(error)
    }
}

run();