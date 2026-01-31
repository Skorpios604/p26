import { CodeBlock } from "../components/CodeBlock";
import { AppleStyleVerticalDock } from "../components/AppleStyleVerticalDock";

export default function Blog() {
    return (
        <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-purple-500/30">
            <AppleStyleVerticalDock />
            <div className="max-w-3xl mx-auto px-6 py-20 pb-40">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Runtime Environment
                    </h1>
                    <p className="text-lg leading-relaxed text-gray-400">
                        A <strong className="text-white">runtime environment</strong> is the ecosystem that lets your code <strong className="text-white">actually run.</strong>
                    </p>
                    <p className="mt-4 text-lg leading-relaxed text-gray-400">
                        It provides the <strong className="text-white">engine</strong>, <strong className="text-white">APIs</strong>, and <strong className="text-white">infrastructure</strong> your program needs when it's executing.
                    </p>
                </div>

                {/* Examples */}
                <div className="mb-12 p-6 bg-[#1a1a1a] rounded-lg border border-zinc-800">
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-purple-400 mt-1">•</span>
                            <span>A browser is the runtime environment for frontend JavaScript.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-400 mt-1">•</span>
                            <span>Node.js is the runtime environment for backend JavaScript.</span>
                        </li>
                    </ul>
                </div>

                {/* Section 1 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-green-400 mb-6 flex items-center gap-3">
                        <span className="text-xl">🟢</span> What Node.js Provides as a Runtime
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">1. JavaScript Engine (V8)</h3>
                            <p className="text-gray-400">Node uses Google's V8 engine to <strong className="text-white">execute JavaScript</strong> outside the browser.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">2. Built-in APIs</h3>
                            <p className="text-gray-400 mb-4">Node gives you APIs that JavaScript normally <strong className="text-white">doesn't have</strong> in the browser, like:</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-[#111] rounded border border-zinc-800">
                                    <code className="text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">fs</code>
                                    <span>File system</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-[#111] rounded border border-zinc-800">
                                    <code className="text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">http</code>
                                    <span>Web servers</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-[#111] rounded border border-zinc-800">
                                    <code className="text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">crypto</code>
                                    <span>Encryption</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-[#111] rounded border border-zinc-800">
                                    <code className="text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">path</code>
                                    <span>File paths</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-[#111] rounded border border-zinc-800">
                                    <code className="text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">net</code>
                                    <span>TCP sockets</span>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-gray-500 italic">These are part of the runtime, not JavaScript itself.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">3. Event Loop</h3>
                            <p className="text-gray-400">Node's runtime manages asynchronous tasks (timers, network requests, file I/O) using the <strong className="text-white">event loop</strong>, which is also part of the runtime.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">4. Memory & Process Management</h3>
                            <p className="text-gray-400 mb-2">Node handles:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-400 pl-4">
                                <li>allocating memory</li>
                                <li>garbage collection</li>
                                <li>running your code inside a process</li>
                                <li>managing threads internally</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">5. Module System</h3>
                            <div className="flex flex-col gap-4">
                                <CodeBlock language="javascript" code={`// CommonJS
const fs = require('fs');`} />
                                <CodeBlock language="javascript" code={`// ES Modules
import fs from 'fs';`} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">6. NPM Ecosystem</h3>
                            <p className="text-gray-400">Node's runtime includes the ability to load external packages installed using <code className="text-purple-400">npm</code>.</p>
                        </div>

                    </div>
                </section>

                <hr className="border-zinc-800 my-12" />

                {/* Section 2 */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <span className="text-xl">🧠</span> Why It's Not Just “JavaScript”
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#111] p-6 rounded-lg border border-zinc-800">
                            <h4 className="text-yellow-400 font-medium mb-4">JavaScript language alone defines:</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>• variables</li>
                                <li>• loops</li>
                                <li>• functions</li>
                                <li>• classes</li>
                            </ul>
                        </div>
                        <div className="bg-[#111] p-6 rounded-lg border border-purple-900/30">
                            <h4 className="text-purple-400 font-medium mb-4">But it doesn't define:</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>• how to read/write files</li>
                                <li>• how to listen on a port</li>
                                <li>• how to access OS resources</li>
                            </ul>
                        </div>
                    </div>
                    <p className="mt-6 text-center text-lg text-white font-medium">The runtime environment adds those capabilities.</p>
                </section>

                {/* Section 3 Analogy */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <span className="text-xl">🧩</span> Analogy
                    </h2>
                    <p className="mb-6 text-gray-400">Running JS in the browser vs Node:</p>

                    <div className="overflow-x-auto rounded-lg border border-zinc-800">
                        <table className="w-full text-left text-sm text-gray-400">
                            <thead className="bg-[#1e1e1e] text-gray-200 uppercase font-medium">
                                <tr>
                                    <th className="px-6 py-4">Environment</th>
                                    <th className="px-6 py-4">Can Access</th>
                                    <th className="px-6 py-4">Cannot Access</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800 bg-[#111]">
                                <tr>
                                    <td className="px-6 py-4 font-medium text-white">Browser JS</td>
                                    <td className="px-6 py-4 text-green-400/90">DOM, Web APIs, fetch</td>
                                    <td className="px-6 py-4 text-red-400/90">File system, OS-level networking</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-white">Node.js</td>
                                    <td className="px-6 py-4 text-green-400/90">File system, OS networking, processes</td>
                                    <td className="px-6 py-4 text-red-400/90">DOM, browser APIs</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-center text-gray-500 text-sm">Different runtime, different powers.</p>
                </section>

                {/* Summary */}
                <section className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 rounded-xl border border-zinc-800">
                    <h2 className="text-2xl font-semibold text-white mb-6">Summary</h2>
                    <p className="mb-6 text-lg"><strong className="text-white">Node.js runtime environment</strong> =</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {[
                            "JavaScript engine",
                            "Node APIs",
                            "Event loop",
                            "Memory/process manager",
                            "Module loading",
                            "NPM system"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs">✔</div>
                                <span className="text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-gray-400 italic border-t border-zinc-800 pt-6">
                        It provides everything JavaScript needs to behave as a server-side platform.
                    </p>
                </section>

            </div>
        </div>
    )
}
