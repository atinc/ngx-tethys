/** Renders an in-place CLI progress bar (TTY) or sparse logs (non-TTY / CI). */
export class MigrationProgressReporter {
    private readonly totalSteps: number;
    private readonly barWidth: number;
    private lastLineLength = 0;
    private lastLoggedMigration = '';
    private lastLoggedPercentBucket = -1;

    constructor(totalSteps: number, barWidth = 28) {
        this.totalSteps = totalSteps;
        this.barWidth = barWidth;
    }

    start(message: string): void {
        process.stdout.write(`${message}\n`);
    }

    update(completedSteps: number, migrationName: string): void {
        const line = this.renderLine(completedSteps, migrationName);

        if (process.stdout.isTTY) {
            process.stdout.write(`\r${line}${' '.repeat(Math.max(0, this.lastLineLength - line.length))}`);
            this.lastLineLength = line.length;
            return;
        }

        const percent = this.getPercent(completedSteps);
        const percentBucket = Math.floor(percent / 10);

        if (migrationName !== this.lastLoggedMigration || percentBucket > this.lastLoggedPercentBucket) {
            process.stdout.write(`${line}\n`);
            this.lastLoggedMigration = migrationName;
            this.lastLoggedPercentBucket = percentBucket;
        }
    }

    complete(migrationName = 'Done'): void {
        const line = this.renderLine(this.totalSteps, migrationName);

        if (process.stdout.isTTY) {
            process.stdout.write(`\r${line}${' '.repeat(Math.max(0, this.lastLineLength - line.length))}\n`);
            return;
        }

        process.stdout.write(`${line}\n`);
    }

    private renderLine(completedSteps: number, migrationName: string): string {
        const percent = this.getPercent(completedSteps);
        const filled =
            this.totalSteps > 0 ? Math.min(this.barWidth, Math.round((this.barWidth * completedSteps) / this.totalSteps)) : this.barWidth;
        const bar = `${'█'.repeat(filled)}${'░'.repeat(this.barWidth - filled)}`;
        const label = truncateLabel(migrationName, 28);

        return `  [${bar}] ${percent.toString().padStart(3)}%  ${label}`;
    }

    private getPercent(completedSteps: number): number {
        if (this.totalSteps <= 0) {
            return 100;
        }

        return Math.min(100, Math.round((completedSteps / this.totalSteps) * 100));
    }
}

function truncateLabel(label: string, maxLength: number): string {
    if (label.length <= maxLength) {
        return label;
    }

    return `${label.slice(0, maxLength - 3)}...`;
}
