import { execSync } from 'child_process';

(function main() {
    execSync('ts-node ./scripts/handle-standalone/find-standalone.ts');
    execSync('ts-node ./scripts/handle-standalone/rename-standalone.ts');
})();
