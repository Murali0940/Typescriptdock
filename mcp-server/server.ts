import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { z } from 'zod';
import { spawn } from 'node:child_process';
import path from 'node:path';

function buildServer(): McpServer {
    const server = new McpServer({
        name: 'playwright-mcp-server',
        version: '1.0.0',
    });

    const projectRoot = path.resolve(process.cwd());

    server.registerTool(
        'run_playwright_test',
        {
            description:
                'Run a Playwright TypeScript test using the Playwright test runner.',

            inputSchema: z.object({
                testFile: z
                    .string()
                    .describe(
                        'Path to the Playwright test file, for example tests/login.spec.ts'
                    ),
            }),
        },

        async ({ testFile }) => {
            return new Promise((resolve) => {
                console.error(`Running Playwright test: ${testFile}`);

                const npxCommand =
                    globalThis.process.platform === 'win32'
                        ? 'npx.cmd'
                        : 'npx';

                const args = [
                    'playwright',
                    'test',
                    testFile,
                ];

                const childProcess = spawn(
                    npxCommand,
                    args,
                    {
                        cwd: projectRoot,
                        shell: false,
                    }
                );

                let output = '';

                childProcess.stdout.on('data', (data) => {
                    output += data.toString();
                });

                childProcess.stderr.on('data', (data) => {
                    output += data.toString();
                });

                childProcess.on('close', (code) => {
                    const status =
                        code === 0
                            ? 'PASSED'
                            : 'FAILED';

                    resolve({
                        content: [
                            {
                                type: 'text',
                                text:
                                    `Playwright Test Status: ${status}\n` +
                                    `Exit Code: ${code}\n\n` +
                                    `Test Output:\n${output}`,
                            },
                        ],
                    });
                });

                childProcess.on('error', (error) => {
                    resolve({
                        content: [
                            {
                                type: 'text',
                                text:
                                    `Failed to start Playwright.\n\n` +
                                    `Error: ${error.message}`,
                            },
                        ],
                    });
                });
            });
        }
    );

    return server;
}

await serveStdio(() => buildServer());