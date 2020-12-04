export function getWorkspaceAllTsconfig(json) {
    if (!json || !json.projects) {
        throw new Error('error angular.json');
    }
    const list = [];
    for (const projectName in json.projects) {
        if (Object.prototype.hasOwnProperty.call(json.projects, projectName)) {
            const projectConfig = json.projects[projectName];
            const buildConfig = projectConfig?.architect?.build;
            if (buildConfig?.options?.tsConfig) {
                list.push(buildConfig.options.tsConfig);
            }
            if (buildConfig?.configurations) {
                for (const configName in buildConfig.configurations) {
                    if (Object.prototype.hasOwnProperty.call(buildConfig.configurations, configName)) {
                        const element = buildConfig.configurations[configName];
                        if (element?.tsConfig) {
                            list.push(element.tsConfig);
                        }
                    }
                }
            }
            const testConfig = projectConfig?.architect?.test;
            if (testConfig?.options?.tsConfig) {
                list.push(testConfig.options.tsConfig);
            }
            if (testConfig?.configurations) {
                for (const configName in testConfig.configurations) {
                    if (Object.prototype.hasOwnProperty.call(testConfig.configurations, configName)) {
                        const element = testConfig.configurations[configName];
                        if (element?.tsConfig) {
                            list.push(element.tsConfig);
                        }
                    }
                }
            }
        }
    }
    return list;
}
