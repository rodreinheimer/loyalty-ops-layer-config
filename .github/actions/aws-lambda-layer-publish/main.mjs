import * as core from '@actions/core'
import { LambdaClient, PublishLayerVersionCommand, ListVersionsByFunctionCommand } from "@aws-sdk/client-lambda"

async function run() {
    try {
        const bucketName = core.getInput('bucket-name', { required: true });
        const zipFileName = core.getInput('zip-file-name', { required: true })
        const layerName = core.getInput('layer-name', { required: true });
        const layerDescription = core.getInput('layer-description', { required: true });
        const functionName = core.getInput('function-name', { required: true });
        const lambdaConfig = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            apiVersion: '2015-03-31',
            maxRetries: 2,
            region: process.env.AWS_REGION,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            sslEnabled: true,
        }
        const client = new LambdaClient(lambdaConfig);
        const publishInput = { 
            LayerName: layerName, 
            Description: layerDescription,
            Content: { 
                S3Bucket: bucketName,
                S3Key: zipFileName
            },
            CompatibleRuntimes: [ 
                "nodejs16.x",
            ]
        };
        const publishCommand = new PublishLayerVersionCommand(publishInput);
        const publishResponse = await client.send(publishCommand);

        core.setOutput('layer-version-arn', publishResponse.LayerVersionArn);

        const listInput = { 
            FunctionName: functionName, 
            MaxItems: 1
        };
        const ListCommand = new ListVersionsByFunctionCommand(listInput);
        const ListResponse = await client.send(ListCommand);

        //
        const layersArns = ListResponse.Versions[0].Layers.map(layer => layer.Arn);
        console.log(layersArns);

        console.log(layerName);

        const layersArns2 = layersArns.filter(layer => layer.indexOf(layerName) > -1);
        console.log(layersArns2);

    } catch (error) {
        core.setFailed(error)
    }
}

run();