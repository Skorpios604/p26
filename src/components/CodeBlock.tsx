import { Highlight, themes } from "prism-react-renderer"

interface CodeBlockProps {
    code: string
    language: string
}

export const CodeBlock = ({ code, language }: CodeBlockProps) => (
    <Highlight
        theme={themes.vsDark}
        code={code}
        language={language}
    >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <div className="relative group rounded-lg overflow-hidden my-4 border border-zinc-800">
                <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-zinc-800">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-zinc-400 font-mono">{language}</span>
                </div>
                <pre
                    style={style}
                    className={`${className} p-4 overflow-x-auto text-sm font-mono custom-scrollbar`}
                >
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            <span className="mr-4 text-zinc-600 select-none inline-block w-6 text-right">{i + 1}</span>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            </div>
        )}
    </Highlight>
)
