# Morpheus Github Action

This is a GitHub Action to order a Morpheus catalog item. 

## Usage

```yaml
steps:
- name: Order catalog item
  env:
    MORPHEUS_API_URL: ${{ secrets.MORPHEUS_API_URL }}
    MORPHEUS_API_TOKEN: ${{ secrets.MORPHEUS_API_TOKEN }}
  uses: martezr/morpheus-github-action@v1
  with:
    name: 'MongoDB'
    parameters: |
      environment=${{ env.TEST_ENV }}
      databaseplan=147
      mongodb_version=4.4
    timeout: 2
```

## Environment Variables

The action supports the following environment variables:

| Environment Variable | Description |
| ---------- | ----------- |
| MORPHEUS_API_URL | The URL of the Morpheus server |
| MORPHEUS_API_TOKEN | The API token for authenticating to the Morpheus server |

## Inputs

The action supports the following inputs:

| Input Name | Description | Required | Default |
| ---------- | ----------- | -------- | ------- |
| name | The name of the catalog item | Yes | None |
| parameters | Input parameter key-value pairs to pass to the catalog item. Use the form param_name=param_value, and separate arguments with newlines. | No | None |
| timeout | The timeout duration in minutes to wait for the completion of the catalog item request | No | 45 |
| verify_ssl | Whether to verify the SSL certificate of the Morpheus server | No | true |

## Outputs

## License

[Mozilla Public License v2.0](https://github.com/hashicorp/setup-terraform/blob/master/LICENSE)