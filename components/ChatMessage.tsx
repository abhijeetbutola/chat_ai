import { Message } from "@/context/chatContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { memo } from "react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = memo(({ message }: ChatMessageProps) => {
  const { role, content, isStreaming } = message;
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} pb-6`}>
      <div
        className={`whitespace-pre-wrap p-4 rounded-lg max-w-prose break-words ${
          isUser
            ? "bg-secondary-foreground text-foreground"
            : "bg-background border border-muted"
        }`}
      >
        {isUser ? (
          // For user messages, just show plain text
          <div className="whitespace-pre-wrap">{content}</div>
        ) : (
          // For assistant messages, render markdown
          <div className="relative">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                pre: ({ children, ...props }) => (
                  <pre
                    className="overflow-x-auto whitespace-pre-wrap break-words bg-gray-900 text-gray-100 p-4 rounded-md my-4"
                    {...props}
                  >
                    {children}
                  </pre>
                ),
                code: ({ children, className, ...props }) => {
                  if (!className) {
                    return (
                      <code
                        className="bg-gray-900 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => (
                  <p className="mb-4 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 last:mb-0 list-disc pl-5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 last:mb-0 list-decimal pl-5">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">
                    {children}
                  </blockquote>
                ),
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold mb-3 mt-5 first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold mb-2 mt-4 first:mt-0">
                    {children}
                  </h3>
                ),
                hr: () => (
                  <hr className="my-6 border-t border-gray-300 dark:border-gray-600" />
                ),
              }}
            >
              {content || ""}
            </ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1 align-text-bottom"></span>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
