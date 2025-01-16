const { exec } = require('child_process');
const fs = require('fs');

function extractColorfulVariables() {
    const colorfulegex = /^\$(white|primary|success|info|warning|danger):\s*([^;!]+)(?:\s*!default)?;/gm;
    const content = fs.readFileSync('src/styles/variables.scss', 'utf-8');
    const variables = {};
    let match;
    while ((match = colorfulegex.exec(content)) !== null) {
        const variableName = `$${match[1]}`;
        const variableValue = match[2].trim();
        variables[variableName] = variableValue;
    }
    return variables;
}

function extractGrayVariables(theme) {
    const grayRegex = /--(gray-\d+):\s*([^;]+)/g;
    const content = fs.readFileSync('src/styles/theme/' + theme + '.scss', 'utf-8');
    const variables = {};
    let match;
    while ((match = grayRegex.exec(content)) !== null) {
        const variableName = `$${match[1]}`;
        const variableValue = match[2].trim();
        variables[variableName] = variableValue;
    }
    return variables;
}

const defaultThemeVariables = extractGrayVariables('default');
const darkThemeVariables = extractGrayVariables('dark');
const colorfulVariables = extractColorfulVariables();

const cssVariables = {
    defaultThemeColorsMap: { ...defaultThemeVariables, ...colorfulVariables },
    darkThemeColorsMap: { ...darkThemeVariables, ...colorfulVariables }
};

const tsContent = `
// You can update this file by executing 'npm run extract-css-variables' command

export const cssVariables = ${JSON.stringify(cssVariables, null, 2)};`;

exec('prettier --write "src/theme/examples/color/css-variables.ts"');

fs.writeFileSync('src/theme/examples/color/css-variables.ts', tsContent);
