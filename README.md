# Morpheus Github Action

## Usage

```yaml
steps:
- name: Order catalog item
  env:
    MORPHEUS_API_URL: ${{ secrets.MORPHEUS_API_URL }}
    MORPHEUS_API_TOKEN: ${{ secrets.MORPHEUS_API_TOKEN }}
  uses: ./ # Uses an action in the root directory
  with:
    name: 'MongoDB'
    parameters: '{"environment": 1,"databaseplan": 147,"mongodb_version":"4.4"}'
```

## Inputs

The action supports the following inputs:

| Input Name | Description | Required | Default |
| ---------- | ----------- | -------- | ------- |
| name | | Yes | None |
| parameters | | No | None |
| verify_ssl | Whether to verify the SSL certificate of the Morpheus server | No | true |

## Outputs

## License

[Mozilla Public License v2.0](https://github.com/hashicorp/setup-terraform/blob/master/LICENSE)