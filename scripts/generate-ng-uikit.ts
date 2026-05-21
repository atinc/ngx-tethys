import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from 'typescript';

interface RenameConfig {
    fromPrefix: string;
    toPrefix: string;
}

/** 输入别名：字符串 shorthand，或带可选 transform 的对象 */
type InputAliasValue = string | { alias: string; transform?: string };

interface ComponentWrapperConfig {
    selector: string;
    inputs?: Record<string, InputAliasValue>;
    /** ngx-tethys 输出名 -> 对外输出名，如 thyRemove -> nxRemove */
    outputs?: Record<string, string>;
    /** 为 true 时，未在 inputs 中声明的输入不可从模板绑定（thy* / 自动 nx*） */
    exposeInputsOnly?: boolean;
    /** 为 true 时，未在 outputs 中声明的输出不可从模板绑定 */
    exposeOutputsOnly?: boolean;
    /** 默认按 ThyFoo -> foo.component.html 推断 */
    templateFile?: string;
    /** 默认：若 include 中存在 ${SourceSymbol}Module 且别名为 ${ExportName}Module 则生成 */
    generateModule?: boolean;
}

type ModuleExportShorthand = string[] | '*';

interface ModuleExportConfig {
    include: string[];
    aliases?: Record<string, string>;
    wrappers?: Record<string, ComponentWrapperConfig>;
}

type ModuleExportsValue = ModuleExportShorthand | ModuleExportConfig;

interface NgUIKitConfig {
    packageName: string;
    version: string;
    outputDir: string;
    modules: string[];
    secondaryEntryPoints?: boolean;
    rename?: RenameConfig;
    exports?: Record<string, ModuleExportsValue>;
    aliases?: Record<string, Record<string, string>>;
}

interface NormalizedExport {
    mode: 'all' | 'named';
    aliases: Record<string, string>;
    wrappers: Record<string, ComponentWrapperConfig>;
}

interface ParsedSignalInput {
    name: string;
    typeText: string;
    defaultValue: string;
    signalKind: 'input' | 'model';
    hasTransform: boolean;
    useCoerceBooleanTransform: boolean;
}

interface ParsedSignalOutput {
    name: string;
    typeText: string;
}

interface ComponentDecoratorMeta {
    imports: string[];
    host?: string;
}

interface WrapperImportPlan {
    core: string[];
    fromTethys: string[];
    fromUtil: string[];
    extra: string[];
}

const rootDir = path.resolve(__dirname, '..');
const configPath = path.join(rootDir, 'ng-uikit.config.json');
const srcRoot = path.join(rootDir, 'src');

const GENERATED_WRAPPER_SUFFIX = '.wrapper.generated';
const OMIT_ALIAS_PREFIX = '__ngUikitOmit__';

function omitBindingAlias(memberName: string): string {
    return `${OMIT_ALIAS_PREFIX}${memberName}`;
}

function loadConfig(): NgUIKitConfig {
    const config = fs.readJsonSync(configPath) as NgUIKitConfig;
    if (!config.modules?.length) {
        throw new Error('ng-uikit.config.json: "modules" must be a non-empty array');
    }
    return config;
}

function assertModulesExist(modules: string[]) {
    for (const name of modules) {
        if (!fs.existsSync(path.join(srcRoot, name, 'index.ts'))) {
            throw new Error(`Module "${name}" not found or missing index.ts`);
        }
    }
}

function applyPrefixRename(exportName: string, rename?: RenameConfig): string {
    if (!rename?.fromPrefix || !rename?.toPrefix) {
        return exportName;
    }
    if (exportName.startsWith(rename.fromPrefix)) {
        return rename.toPrefix + exportName.slice(rename.fromPrefix.length);
    }
    return exportName;
}

function normalizeModuleExport(moduleName: string, config: NgUIKitConfig): NormalizedExport {
    const legacyAliases = config.aliases?.[moduleName];
    const moduleExport = config.exports?.[moduleName];

    if (moduleExport === '*') {
        return { mode: 'all', aliases: {}, wrappers: {} };
    }

    let include: string[] = [];
    let explicitAliases: Record<string, string> = {};
    let wrappers: Record<string, ComponentWrapperConfig> = {};

    if (Array.isArray(moduleExport)) {
        include = moduleExport;
    } else if (moduleExport && typeof moduleExport === 'object') {
        include = moduleExport.include ?? [];
        explicitAliases = moduleExport.aliases ?? {};
        wrappers = moduleExport.wrappers ?? {};
    } else if (legacyAliases) {
        include = Object.keys(legacyAliases);
        explicitAliases = legacyAliases;
    } else {
        throw new Error(`exports.${moduleName} is required`);
    }

    if (!include.length) {
        throw new Error(`exports.${moduleName}.include must be a non-empty array`);
    }

    const aliases: Record<string, string> = {};
    for (const from of include) {
        aliases[from] = explicitAliases[from] ?? applyPrefixRename(from, config.rename);
    }

    return { mode: 'named', aliases, wrappers };
}

function toKebabFileName(className: string): string {
    return className
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');
}

function symbolToComponentFileBase(sourceSymbol: string): string {
    const base = sourceSymbol.replace(/^(Thy|Nx)/, '');
    return base.charAt(0).toLowerCase() + base.slice(1);
}

function resolveComponentTsPath(moduleName: string, sourceSymbol: string, templateFile?: string): string {
    if (templateFile) {
        return path.join(srcRoot, moduleName, templateFile.replace(/\.html$/, '.ts'));
    }
    const fileBase = symbolToComponentFileBase(sourceSymbol);
    const candidates = [
        path.join(srcRoot, moduleName, `${fileBase}.component.ts`),
        path.join(srcRoot, moduleName, `${fileBase}.directive.ts`)
    ];
    for (const file of candidates) {
        if (fs.existsSync(file)) {
            return file;
        }
    }
    throw new Error(`Cannot resolve component file for ${sourceSymbol} in src/${moduleName}/ (${candidates.join(', ')})`);
}

function resolveTemplateFileName(moduleName: string, sourceSymbol: string, templateFile?: string): string {
    if (templateFile) {
        return templateFile;
    }
    const tsPath = resolveComponentTsPath(moduleName, sourceSymbol);
    const content = fs.readFileSync(tsPath, 'utf8');
    const sf = ts.createSourceFile(tsPath, content, ts.ScriptTarget.Latest, true);
    let templateUrl: string | undefined;

    const visit = (node: ts.Node) => {
        if (ts.isClassDeclaration(node) && node.name?.text === sourceSymbol) {
            const decorators = ts.getDecorators(node) ?? [];
            const dec = decorators.find(d => {
                const e = d.expression;
                return ts.isCallExpression(e) && ts.isIdentifier(e.expression) && e.expression.text === 'Component';
            });
            if (dec && ts.isCallExpression(dec.expression)) {
                const arg = dec.expression.arguments[0];
                if (arg && ts.isObjectLiteralExpression(arg)) {
                    for (const prop of arg.properties) {
                        if (
                            ts.isPropertyAssignment(prop) &&
                            ts.isIdentifier(prop.name) &&
                            prop.name.text === 'templateUrl' &&
                            ts.isStringLiteralLike(prop.initializer)
                        ) {
                            templateUrl = prop.initializer.text.replace(/^\.\//, '');
                        }
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(sf);

    if (templateUrl) {
        return templateUrl;
    }
    return `${symbolToComponentFileBase(sourceSymbol)}.component.html`;
}

function parseComponentDecoratorMeta(componentFile: string, className: string): ComponentDecoratorMeta {
    const content = fs.readFileSync(componentFile, 'utf8');
    const sf = ts.createSourceFile(componentFile, content, ts.ScriptTarget.Latest, true);
    const imports: string[] = [];
    let host: string | undefined;

    const visit = (node: ts.Node) => {
        if (ts.isClassDeclaration(node) && node.name?.text === className) {
            const decorators = ts.getDecorators(node) ?? [];
            const dec = decorators.find(d => {
                const e = d.expression;
                return ts.isCallExpression(e) && ts.isIdentifier(e.expression) && e.expression.text === 'Component';
            });
            if (dec && ts.isCallExpression(dec.expression)) {
                const arg = dec.expression.arguments[0];
                if (arg && ts.isObjectLiteralExpression(arg)) {
                    for (const prop of arg.properties) {
                        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
                            continue;
                        }
                        if (prop.name.text === 'imports' && ts.isArrayLiteralExpression(prop.initializer)) {
                            for (const el of prop.initializer.elements) {
                                if (ts.isIdentifier(el)) {
                                    imports.push(el.text);
                                }
                            }
                        }
                        if (prop.name.text === 'host' && prop.initializer) {
                            host = getNodeText(prop.initializer, sf);
                        }
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    };

    visit(sf);
    return { imports, host };
}

function parseFileSymbolImports(componentFile: string): Map<string, string> {
    const content = fs.readFileSync(componentFile, 'utf8');
    const sf = ts.createSourceFile(componentFile, content, ts.ScriptTarget.Latest, true);
    const map = new Map<string, string>();

    const visit = (node: ts.Node) => {
        if (ts.isImportDeclaration(node) && node.importClause && ts.isStringLiteralLike(node.moduleSpecifier)) {
            const specifier = node.moduleSpecifier.text;
            const clause = node.importClause;
            if (clause.name) {
                map.set(clause.name.text, specifier);
            }
            if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
                for (const el of clause.namedBindings.elements) {
                    const localName = el.name.text;
                    map.set(localName, specifier);
                }
            }
        }
        ts.forEachChild(node, visit);
    };

    visit(sf);
    return map;
}

function resolveSpecifierForWrapper(specifier: string, moduleName: string): string {
    if (specifier.startsWith('.')) {
        return `ngx-tethys/${moduleName}`;
    }
    return specifier;
}

function buildStandaloneComponentImportLines(
    componentFile: string,
    symbols: string[],
    moduleName: string
): string[] {
    const symbolImports = parseFileSymbolImports(componentFile);
    const byModule = new Map<string, string[]>();

    for (const sym of symbols) {
        const spec = symbolImports.get(sym);
        if (!spec) {
            throw new Error(`Cannot resolve import for "${sym}" in ${componentFile}`);
        }
        const resolved = resolveSpecifierForWrapper(spec, moduleName);
        const list = byModule.get(resolved) ?? [];
        list.push(sym);
        byModule.set(resolved, list);
    }

    return [...byModule.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([mod, syms]) => `import { ${syms.join(', ')} } from '${mod}';`);
}

function parseSourceModuleProviders(moduleName: string, sourceSymbol: string): string | undefined {
    const fileBase = symbolToComponentFileBase(sourceSymbol);
    const moduleFile = path.join(srcRoot, moduleName, `${fileBase}.module.ts`);
    if (!fs.existsSync(moduleFile)) {
        return undefined;
    }

    const content = fs.readFileSync(moduleFile, 'utf8');
    const sf = ts.createSourceFile(moduleFile, content, ts.ScriptTarget.Latest, true);
    let providers: string | undefined;

    const visit = (node: ts.Node) => {
        if (ts.isClassDeclaration(node)) {
            const decorators = ts.getDecorators(node) ?? [];
            const dec = decorators.find(d => {
                const e = d.expression;
                return ts.isCallExpression(e) && ts.isIdentifier(e.expression) && e.expression.text === 'NgModule';
            });
            if (dec && ts.isCallExpression(dec.expression)) {
                const arg = dec.expression.arguments[0];
                if (arg && ts.isObjectLiteralExpression(arg)) {
                    for (const prop of arg.properties) {
                        if (
                            ts.isPropertyAssignment(prop) &&
                            ts.isIdentifier(prop.name) &&
                            prop.name.text === 'providers' &&
                            prop.initializer
                        ) {
                            providers = getNodeText(prop.initializer, sf);
                        }
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    };

    visit(sf);
    return providers;
}

function applySymbolAliases(text: string, aliases: Record<string, string>): string {
    const entries = Object.entries(aliases).sort((a, b) => b[0].length - a[0].length);
    let result = text;
    for (const [from, to] of entries) {
        if (from !== to) {
            result = result.replace(new RegExp(`\\b${from}\\b`, 'g'), to);
        }
    }
    return result;
}

function buildProviderImportLines(
    moduleFile: string,
    symbols: string[],
    moduleName: string,
    aliases: Record<string, string>
): string[] {
    const symbolImports = parseFileSymbolImports(moduleFile);
    const byModule = new Map<string, string[]>();

    for (const sym of symbols) {
        const spec = symbolImports.get(sym);
        if (!spec) {
            throw new Error(`Cannot resolve import for "${sym}" in ${moduleFile}`);
        }
        const resolved = resolveSpecifierForWrapper(spec, moduleName);
        const exportName = aliases[sym] ?? sym;
        const importSymbol = exportName === sym ? sym : `${sym} as ${exportName}`;
        const list = byModule.get(resolved) ?? [];
        list.push(importSymbol);
        byModule.set(resolved, list);
    }

    return [...byModule.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([mod, syms]) => `import { ${syms.join(', ')} } from '${mod}';`);
}

function parseModuleProviderImportLines(
    moduleName: string,
    sourceSymbol: string,
    providers: string,
    aliases: Record<string, string>
): string[] {
    const fileBase = symbolToComponentFileBase(sourceSymbol);
    const moduleFile = path.join(srcRoot, moduleName, `${fileBase}.module.ts`);
    if (!fs.existsSync(moduleFile)) {
        return [];
    }

    const symbolImports = parseFileSymbolImports(moduleFile);
    const symbols = [...symbolImports.keys()].filter(sym => new RegExp(`\\b${sym}\\b`).test(providers));
    if (!symbols.length) {
        return [];
    }

    return buildProviderImportLines(moduleFile, symbols, moduleName, aliases);
}

function getNodeText(node: ts.Node, sourceFile: ts.SourceFile): string {
    return node.getText(sourceFile).trim();
}

function parseSignalInputs(componentFile: string, className: string): ParsedSignalInput[] {
    const content = fs.readFileSync(componentFile, 'utf8');
    const sf = ts.createSourceFile(componentFile, content, ts.ScriptTarget.Latest, true);
    const results: ParsedSignalInput[] = [];

    const visit = (node: ts.Node) => {
        if (ts.isClassDeclaration(node) && node.name?.text === className) {
            for (const member of node.members) {
                if (
                    !ts.isPropertyDeclaration(member) ||
                    !member.name ||
                    !ts.isIdentifier(member.name) ||
                    !member.initializer ||
                    !ts.isCallExpression(member.initializer)
                ) {
                    continue;
                }
                const call = member.initializer;
                const signalKind =
                    ts.isIdentifier(call.expression) && call.expression.text === 'model'
                        ? 'model'
                        : ts.isIdentifier(call.expression) && call.expression.text === 'input'
                          ? 'input'
                          : null;
                if (!signalKind) {
                    continue;
                }

                const name = member.name.text;
                const typeArgs = call.typeArguments ?? [];
                const typeText = typeArgs.length > 0 ? typeArgs.map(a => getNodeText(a, sf)).join(', ') : 'unknown';

                let defaultValue = 'undefined';
                if (call.arguments.length > 0) {
                    defaultValue = getNodeText(call.arguments[0], sf);
                }

                let hasTransform = false;
                let useCoerceBooleanTransform = false;
                if (call.arguments.length > 1 && ts.isObjectLiteralExpression(call.arguments[1])) {
                    for (const prop of call.arguments[1].properties) {
                        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && prop.name.text === 'transform') {
                            hasTransform = true;
                            const initText = getNodeText(prop.initializer, sf);
                            if (initText === 'coerceBooleanProperty' || initText.includes('coerceBooleanProperty')) {
                                useCoerceBooleanTransform = true;
                            }
                        }
                    }
                }
                if (typeText.includes('ThyBooleanInput')) {
                    useCoerceBooleanTransform = hasTransform || typeText.includes('boolean');
                }

                results.push({
                    name,
                    typeText,
                    defaultValue,
                    signalKind,
                    hasTransform,
                    useCoerceBooleanTransform
                });
            }
        }
        ts.forEachChild(node, visit);
    };

    visit(sf);
    return results;
}

function parseSignalOutputs(componentFile: string, className: string): ParsedSignalOutput[] {
    const content = fs.readFileSync(componentFile, 'utf8');
    const sf = ts.createSourceFile(componentFile, content, ts.ScriptTarget.Latest, true);
    const results: ParsedSignalOutput[] = [];

    const visit = (node: ts.Node) => {
        if (ts.isClassDeclaration(node) && node.name?.text === className) {
            for (const member of node.members) {
                if (
                    !ts.isPropertyDeclaration(member) ||
                    !member.name ||
                    !ts.isIdentifier(member.name) ||
                    !member.initializer ||
                    !ts.isCallExpression(member.initializer)
                ) {
                    continue;
                }
                const call = member.initializer;
                if (!ts.isIdentifier(call.expression) || call.expression.text !== 'output') {
                    continue;
                }
                const name = member.name.text;
                const typeArgs = call.typeArguments ?? [];
                const typeText = typeArgs.length > 0 ? typeArgs.map(a => getNodeText(a, sf)).join(', ') : 'unknown';
                results.push({ name, typeText });
            }
        }
        ts.forEachChild(node, visit);
    };

    visit(sf);
    return results;
}

function resolveInputAliasMap(inputs: Record<string, InputAliasValue>): Record<string, { alias: string; transform?: string }> {
    const map: Record<string, { alias: string; transform?: string }> = {};
    for (const [from, value] of Object.entries(inputs)) {
        if (typeof value === 'string') {
            map[from] = { alias: value };
        } else {
            map[from] = value;
        }
    }
    return map;
}

function buildSignalInputOverrideLine(
    meta: ParsedSignalInput,
    alias: string,
    configTransform?: string
): string {
    let options = `{ alias: '${alias}'`;
    const transformName = configTransform ?? (meta.useCoerceBooleanTransform ? 'coerceBooleanProperty' : undefined);
    if (transformName) {
        options += `, transform: ${transformName}`;
    }
    options += ' }';

    let signalType = meta.typeText;
    if (meta.useCoerceBooleanTransform) {
        if (signalType === 'unknown' || signalType === 'boolean') {
            signalType = 'boolean, ThyBooleanInput';
        } else if (!signalType.includes('ThyBooleanInput')) {
            signalType = `boolean, ThyBooleanInput`;
        }
    }

    return `    override readonly ${meta.name} = ${meta.signalKind}<${signalType}>(${meta.defaultValue}, ${options});`;
}

function buildSignalInputOverrides(
    inputAliases: Record<string, { alias: string; transform?: string }>,
    parsed: ParsedSignalInput[],
    exposeInputsOnly: boolean
): string {
    const lines: string[] = [];
    const allowed = new Set(Object.keys(inputAliases));

    for (const [from, { alias, transform: configTransform }] of Object.entries(inputAliases)) {
        const meta = parsed.find(p => p.name === from);
        if (!meta) {
            throw new Error(`Input "${from}" not found on source component. Available: ${parsed.map(p => p.name).join(', ')}`);
        }
        lines.push(buildSignalInputOverrideLine(meta, alias, configTransform));
    }

    if (exposeInputsOnly) {
        for (const meta of parsed) {
            if (!allowed.has(meta.name)) {
                lines.push(buildSignalInputOverrideLine(meta, omitBindingAlias(meta.name)));
            }
        }
    }

    return lines.join('\n\n');
}

function buildSignalOutputOverrides(
    outputAliases: Record<string, string>,
    parsed: ParsedSignalOutput[],
    exposeOutputsOnly: boolean
): string {
    const lines: string[] = [];
    const allowed = new Set(Object.keys(outputAliases));

    for (const [from, alias] of Object.entries(outputAliases)) {
        const meta = parsed.find(p => p.name === from);
        if (!meta) {
            throw new Error(
                `Output "${from}" not found on source component. Available: ${parsed.map(p => p.name).join(', ')}`
            );
        }
        lines.push(`    override readonly ${from} = output<${meta.typeText}>({ alias: '${alias}' });`);
    }

    if (exposeOutputsOnly) {
        for (const meta of parsed) {
            if (!allowed.has(meta.name)) {
                lines.push(
                    `    override readonly ${meta.name} = output<${meta.typeText}>({ alias: '${omitBindingAlias(meta.name)}' });`
                );
            }
        }
    }

    return lines.join('\n\n');
}

function collectWrapperImports(
    sourceSymbol: string,
    moduleName: string,
    inputAliases: Record<string, { alias: string; transform?: string }>,
    parsed: ParsedSignalInput[],
    hasOutputs: boolean
): WrapperImportPlan {
    const fromUtil = new Set<string>();
    const fromTethys = new Set<string>([sourceSymbol]);

    for (const { transform } of Object.values(inputAliases)) {
        if (transform === 'coerceBooleanProperty') {
            fromUtil.add('coerceBooleanProperty');
            fromUtil.add('ThyBooleanInput');
        }
    }

    for (const meta of parsed) {
        const transformName =
            inputAliases[meta.name]?.transform ?? (meta.useCoerceBooleanTransform ? 'coerceBooleanProperty' : undefined);
        if (transformName === 'coerceBooleanProperty') {
            fromUtil.add('coerceBooleanProperty');
            fromUtil.add('ThyBooleanInput');
        }
        const typeRefs = meta.typeText.match(/\b[A-Z][A-Za-z0-9]*\b/g) ?? [];
        for (const ref of typeRefs) {
            if (ref === 'ThyBooleanInput') {
                fromUtil.add('ThyBooleanInput');
            } else if (inputAliases[meta.name]) {
                fromTethys.add(ref);
            }
        }
    }

    fromTethys.delete(sourceSymbol);

    const tethysTypes = [...fromTethys].filter(n => n !== sourceSymbol);
    const fromTethysImports = tethysTypes.length ? `${tethysTypes.join(', ')}, ${sourceSymbol}` : sourceSymbol;

    const core = ['input'];
    if (parsed.some(p => inputAliases[p.name] && p.signalKind === 'model')) {
        core.push('model');
    }
    if (hasOutputs) {
        core.push('output');
    }

    return {
        core,
        fromTethys: [fromTethysImports],
        fromUtil: [...fromUtil],
        extra: []
    };
}

function formatWrapperImports(plan: WrapperImportPlan, moduleName: string): string {
    const needsModel = plan.core.includes('model');
    const angularCore = [
        'ChangeDetectionStrategy',
        'Component',
        'ViewEncapsulation',
        ...plan.core.filter(n => n !== 'model')
    ];
    if (needsModel) {
        angularCore.push('model');
    }
    const lines: string[] = [`import { ${[...new Set(angularCore)].join(', ')} } from '@angular/core';`];
    for (const t of plan.fromTethys) {
        lines.push(`import { ${t} } from 'ngx-tethys/${moduleName}';`);
    }
    if (plan.fromUtil.length) {
        lines.push(`import { ${[...new Set(plan.fromUtil)].join(', ')} } from 'ngx-tethys/util';`);
    }
    for (const line of plan.extra) {
        lines.push(line);
    }
    return lines.join('\n');
}

function getSourceModuleSymbol(sourceSymbol: string): string {
    return `${sourceSymbol}Module`;
}

function shouldGenerateWrapperModule(
    sourceSymbol: string,
    exportName: string,
    normalized: NormalizedExport,
    wrapper: ComponentWrapperConfig
): boolean {
    if (wrapper.generateModule === false) {
        return false;
    }
    if (wrapper.generateModule === true) {
        return true;
    }
    const moduleSymbol = getSourceModuleSymbol(sourceSymbol);
    return normalized.aliases[moduleSymbol] !== undefined && normalized.aliases[moduleSymbol] === `${exportName}Module`;
}

function copyWrapperTemplate(moduleName: string, moduleDir: string, templateFileName: string) {
    const from = path.join(srcRoot, moduleName, templateFileName);
    const to = path.join(moduleDir, templateFileName);
    if (!fs.existsSync(from)) {
        throw new Error(`Template not found: ${from}`);
    }
    fs.copySync(from, to);
}

function writeComponentWrapper(
    moduleDir: string,
    moduleName: string,
    sourceSymbol: string,
    exportName: string,
    wrapper: ComponentWrapperConfig,
    normalized: NormalizedExport
) {
    const rawInputs = wrapper.inputs ?? {};
    if (!Object.keys(rawInputs).length) {
        throw new Error(`wrappers.${sourceSymbol}.inputs must not be empty`);
    }

    const componentFile = resolveComponentTsPath(moduleName, sourceSymbol, wrapper.templateFile);
    const templateFile = resolveTemplateFileName(moduleName, sourceSymbol, wrapper.templateFile);
    const parsed = parseSignalInputs(componentFile, sourceSymbol);
    const inputAliases = resolveInputAliasMap(rawInputs);
    const outputAliases = wrapper.outputs ?? {};
    const parsedOutputs = parseSignalOutputs(componentFile, sourceSymbol);
    const exposeInputsOnly = wrapper.exposeInputsOnly === true;
    const exposeOutputsOnly = wrapper.exposeOutputsOnly === true;
    const inputOverrides = buildSignalInputOverrides(inputAliases, parsed, exposeInputsOnly);
    const outputOverrides = buildSignalOutputOverrides(outputAliases, parsedOutputs, exposeOutputsOnly);
    const overrides = [inputOverrides, outputOverrides].filter(Boolean).join('\n\n');
    const decoratorMeta = parseComponentDecoratorMeta(componentFile, sourceSymbol);
    const importPlan = collectWrapperImports(
        sourceSymbol,
        moduleName,
        inputAliases,
        parsed,
        Object.keys(outputAliases).length > 0 || exposeOutputsOnly
    );
    importPlan.extra = buildStandaloneComponentImportLines(componentFile, decoratorMeta.imports, moduleName);

    copyWrapperTemplate(moduleName, moduleDir, templateFile);

    const fileBase = toKebabFileName(exportName);
    const fileName = `${fileBase}.component${GENERATED_WRAPPER_SUFFIX}.ts`;
    const importBlock = formatWrapperImports(importPlan, moduleName);
    const hostBlock = decoratorMeta.host ? `\n    host: ${decoratorMeta.host},` : '';
    const componentImportsBlock = decoratorMeta.imports.length
        ? `\n    imports: [${decoratorMeta.imports.join(', ')}],`
        : '';

    const content = `/**
 * AUTO-GENERATED by scripts/generate-ng-uikit.ts — do not edit.
 * Extends ${sourceSymbol}, selector: ${wrapper.selector}
 */
${importBlock}

@Component({
    selector: '${wrapper.selector}',
    templateUrl: './${templateFile}',${hostBlock}${componentImportsBlock}
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${exportName} extends ${sourceSymbol} {
${overrides}
}
`;

    fs.writeFileSync(path.join(moduleDir, fileName), content);

    if (shouldGenerateWrapperModule(sourceSymbol, exportName, normalized, wrapper)) {
        const moduleFile = `${fileBase}.module${GENERATED_WRAPPER_SUFFIX}.ts`;
        const providers = parseSourceModuleProviders(moduleName, sourceSymbol);
        const providerImports = providers
            ? parseModuleProviderImportLines(moduleName, sourceSymbol, providers, normalized.aliases)
            : [];
        const providersBlock = providers
            ? `,\n    providers: ${applySymbolAliases(providers, normalized.aliases)}`
            : '';

        const moduleContent = `/**
 * AUTO-GENERATED by scripts/generate-ng-uikit.ts — do not edit.
 */
import { NgModule } from '@angular/core';
${providerImports.length ? `${providerImports.join('\n')}\n` : ''}import { ${exportName} } from './${fileBase}.component${GENERATED_WRAPPER_SUFFIX}';

@NgModule({
    imports: [${exportName}],
    exports: [${exportName}]${providersBlock}
})
export class ${exportName}Module {}
`;
        fs.writeFileSync(path.join(moduleDir, moduleFile), moduleContent);
    }
}

function writeWrapperArtifacts(moduleDir: string, moduleName: string, normalized: NormalizedExport) {
    for (const [sourceSymbol, wrapper] of Object.entries(normalized.wrappers)) {
        const exportName = normalized.aliases[sourceSymbol];
        if (!exportName) {
            throw new Error(`wrappers.${sourceSymbol}: add "${sourceSymbol}" to exports.include`);
        }
        writeComponentWrapper(moduleDir, moduleName, sourceSymbol, exportName, wrapper, normalized);
    }
}

function removeGeneratedWrappers(moduleDir: string) {
    if (!fs.existsSync(moduleDir)) {
        return;
    }
    for (const file of fs.readdirSync(moduleDir)) {
        if (file.includes(GENERATED_WRAPPER_SUFFIX) || file.endsWith('.component.html')) {
            fs.removeSync(path.join(moduleDir, file));
        }
    }
}

function buildIndexSource(moduleName: string, normalized: NormalizedExport): string {
    if (normalized.mode === 'all') {
        return `export * from 'ngx-tethys/${moduleName}';\n`;
    }

    const lines: string[] = [];
    const wrapped = new Set(Object.keys(normalized.wrappers));

    for (const [from, to] of Object.entries(normalized.aliases)) {
        const wrappedSource = [...wrapped].find(s => getSourceModuleSymbol(s) === from);
        if (wrappedSource) {
            continue;
        }

        if (wrapped.has(from)) {
            const fileBase = toKebabFileName(to);
            const wrapper = normalized.wrappers[from];
            const exportName = to;
            lines.push(`export { ${to} } from './${fileBase}.component${GENERATED_WRAPPER_SUFFIX}';`);
            if (shouldGenerateWrapperModule(from, exportName, normalized, wrapper)) {
                lines.push(`export { ${exportName}Module } from './${fileBase}.module${GENERATED_WRAPPER_SUFFIX}';`);
            }
            continue;
        }

        if (from.endsWith('Module')) {
            lines.push(`    ${from} as ${to}`);
        } else if (from.endsWith('Type') || from.includes('Type')) {
            lines.push(`export type { ${from} as ${to} } from 'ngx-tethys/${moduleName}';`);
        } else {
            lines.push(`    ${from} as ${to}`);
        }
    }

    const reExports = lines.filter(l => l.startsWith('    '));
    const directExports = lines.filter(l => !l.startsWith('    '));

    const chunks: string[] = [...directExports];
    if (reExports.length) {
        chunks.push(`export {\n${reExports.join(',\n')}\n} from 'ngx-tethys/${moduleName}';`);
    }

    return `${chunks.join('\n')}\n`;
}

function writeSecondaryEntry(outputDir: string, moduleName: string, config: NgUIKitConfig) {
    const moduleDir = path.join(outputDir, moduleName);
    const normalized = normalizeModuleExport(moduleName, config);

    fs.ensureDirSync(moduleDir);
    removeGeneratedWrappers(moduleDir);

    if (Object.keys(normalized.wrappers).length) {
        writeWrapperArtifacts(moduleDir, moduleName, normalized);
    }

    fs.writeFileSync(path.join(moduleDir, 'ng-package.json'), `${JSON.stringify({ lib: { entryFile: 'index.ts' } }, null, 2)}\n`);
    fs.writeFileSync(path.join(moduleDir, 'index.ts'), buildIndexSource(moduleName, normalized));
}

function writeSingleEntryPublicApi(outputDir: string, modules: string[], config: NgUIKitConfig) {
    const blocks = modules.map(m => buildIndexSource(m, normalizeModuleExport(m, config)).trim());
    blocks.push(`export * from './version';`);
    fs.writeFileSync(path.join(outputDir, 'public-api.ts'), `${blocks.join('\n\n')}\n`);
}

function removeStaleModuleDirs(outputDir: string, keep: string[]) {
    if (!fs.existsSync(outputDir)) {
        return;
    }
    for (const entry of fs.readdirSync(outputDir)) {
        const fullPath = path.join(outputDir, entry);
        if (fs.statSync(fullPath).isDirectory() && !keep.includes(entry)) {
            fs.removeSync(fullPath);
        }
    }
}

function main() {
    const config = loadConfig();
    const outputDir = path.join(rootDir, config.outputDir);
    const useSecondary = config.secondaryEntryPoints === true;

    assertModulesExist(config.modules);
    fs.ensureDirSync(outputDir);

    fs.writeFileSync(path.join(outputDir, 'version.ts'), `export const NG_UIKIT_VERSION = '${config.version}';\n`);

    if (useSecondary) {
        removeStaleModuleDirs(outputDir, config.modules);
        for (const name of config.modules) {
            writeSecondaryEntry(outputDir, name, config);
            const normalized = normalizeModuleExport(name, config);
            const wrapperCount = Object.keys(normalized.wrappers).length;
            console.log(
                `[ng-uikit]   ${name}: ${Object.keys(normalized.aliases).length} export(s)` +
                    (wrapperCount ? `, ${wrapperCount} wrapper(s)` : '')
            );
        }
        fs.writeFileSync(path.join(outputDir, 'public-api.ts'), `export * from './version';\n`);
    } else {
        removeStaleModuleDirs(outputDir, []);
        writeSingleEntryPublicApi(outputDir, config.modules, config);
    }

    console.log(`[ng-uikit] ${config.packageName} @ ${config.outputDir}`);
}

main();
