# ArgoCD Sync Action

This action refreshes and syncs multiple ArgoCD applications using the ArgoCD API.
- Future: ability to rollback to the previous version of ArgoCD Application (TODO)

## Inputs

- `argocd_server`: ArgoCD Server URL (required)
- `argocd_username`: ArgoCD Username (required)
- `argocd_password`: ArgoCD Password (required)
- `argocd_app_names`: Comma-separated list of ArgoCD Application Names (required)
- `refresh_app`: Whether to refresh the applications (optional, default: 'false')
- `sync_app`: Whether to sync the applications (optional, default: 'false')

## Example usage

```yaml
- name: ArgoCD API Action
  uses: MayurDuduka/argocd-api@v1.0
  with:
    argocd_server: ${{ secrets.ARGOCD_SERVER }}
    argocd_username: ${{ secrets.ARGOCD_USERNAME }}
    argocd_password: ${{ secrets.ARGOCD_PASSWORD }}
    argocd_app_names: 'app1,app2,app3'
    refresh_app: 'true'
    sync_app: 'true'
```