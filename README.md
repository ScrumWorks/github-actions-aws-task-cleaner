# Aws task definition cleaner

This action delete old aws ecs [task definitions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html)

## Inputs

### `prefix`

**Required** The prefix of task definition to clean.

### `maxTasks`

**Required** The number of tasks revisions to remain.

### `region`

**Required** AWS region of ECS tasks


## Example usage
```yaml
uses: ScrumWorks/github-actions-aws-task-cleaner@v1
with:
    prefix: taskName
    maxTasks: 6
    region: eu-west-1
```