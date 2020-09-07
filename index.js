const core = require('@actions/core');
const github = require('@actions/github');
const AWS = require('aws-sdk')

try {
    const prefix = core.getInput('prefix');
    if (prefix === undefined || prefix === '') {
        throw new Error('Invalid prefix')
    }
    const maxTasks = core.getInput('maxTasks');
    if (isNaN(maxTasks) || maxTasks < 1) {
        throw new Error('Invalid max Tasks')
    }
    const region = core.getInput('region');
    const ECS = new AWS.ECS({region: region});
    ECS.listTaskDefinitions({
        familyPrefix: prefix,
        sort: 'DESC',
        maxResults: maxTasks * 10
    }, function (err, data) {
        if (err) {
            throw new Error(err)
        }
        if (data.taskDefinitionArns.length > maxTasks) {
            data.taskDefinitionArns.slice(maxTasks).forEach(function (item) {
                ECS.deregisterTaskDefinition({
                    taskDefinition: item
                }, function (err, data) {
                    console.log(`deleting: ${item}`)
                });
            })
        }
    });

} catch (error) {
    core.setFailed(error.message);
}
