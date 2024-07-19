const core = require("@actions/core");
const axios = require("axios");

const ARGOCD_SERVER = core.getInput("argocd_server", { required: true });
const ARGOCD_USERNAME = core.getInput("argocd_username", { required: true });
const ARGOCD_PASSWORD = core.getInput("argocd_password", { required: true });
const ARGOCD_APP_NAMES = core.getInput("argocd_app_names").split(",").map((app) => app.trim(), { required: true });
const REFRESH_APP = core.getInput("refresh_app") === "true";
const SYNC_APP = core.getInput("sync_app") === "true";

async function getSessionToken() {
  try {
    const response = await axios.post(`${ARGOCD_SERVER}/api/v1/session`, {
      username: ARGOCD_USERNAME,
      password: ARGOCD_PASSWORD,
    });
    return response.data.token;
  } catch (error) {
    core.setFailed(`Error getting session token: ${error.message}`);
  }
}

async function refreshApplication(token, appName) {
  try {
    await axios.get(
      `${ARGOCD_SERVER}/api/v1/applications/${appName}?refresh=true`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    core.info(`Application ${appName} refreshed successfully`);
  } catch (error) {
    core.setFailed(`Error refreshing application ${appName}: ${error.message}`);
  }
}

async function syncApplication(token, appName) {
  try {
    await axios.post(
      `${ARGOCD_SERVER}/api/v1/applications/${appName}/sync`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    core.info(`Application ${appName} synced successfully`);
  } catch (error) {
    core.setFailed(`Error syncing application ${appName}: ${error.message}`);
  }
}

async function main() {
  try {
    const token = await getSessionToken();

    for (const appName of ARGOCD_APP_NAMES) {
      console.log(`Processing application: ${appName}`);
      if (REFRESH_APP) {
        await refreshApplication(token, appName);
      }

      if (SYNC_APP) {
        await syncApplication(token, appName);
      }
    }
  } catch (error) {
    core.setFailed(`An unexpected error occurred: ${error.message}`);
  }
}

main();
