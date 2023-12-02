import * as core from '@actions/core'
import { LambdaClient, PublishLayerVersionCommand, ListVersionsByFunctionCommand, UpdateFunctionConfigurationCommand } from "@aws-sdk/client-lambda"

async function run() {
    try {
        const bucketName = core.getInput('bucket-name', { required: true });
        const zipFileName = core.getInput('zip-file-name', { required: true })
        const layerName = core.getInput('layer-name', { required: true });
        const layerDescription = core.getInput('layer-description', { required: true });
        const functionName = core.getInput('function-name', { required: true });
        
        //Publish Layers
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

        //Prepare Release Layers
        const listInput = { 
            FunctionName: functionName, 
            MaxItems: 1
        };
        const listCommand = new ListVersionsByFunctionCommand(listInput);
        const listResponse = await client.send(listCommand);
        let layersArns = listResponse.Versions[0].Layers
            .map(layer => layer.Arn)
            .filter(layer => layer.indexOf(layerName) == -1);
        layersArns.push(publishResponse.LayerVersionArn);
        core.setOutput('release-layer-arns', layersArns.join(', '));

        //Update Function
        const updateInput = { 
            FunctionName: functionName, 
            Layers: layersArns
        };
        const updateCommand = new UpdateFunctionConfigurationCommand(updateInput);
        const updateResponse = await client.send(updateCommand);
        
    } catch (error) {
        core.setFailed(error)
    }
}

run();