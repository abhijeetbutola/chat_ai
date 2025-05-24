import { Message } from "@/context/chatContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Dark theme for code blocks

function ChatMessage({ message }: { message: Message }) {
  const { role, content } = message;
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} pb-6`}>
      <div
        className={`prose prose-sm dark:prose-invert max-w-none break-words p-4 rounded-lg ${
          isUser
            ? "bg-secondary-foreground text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground"
            : "bg-background border border-muted"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // Fix code block overflow and styling
            pre: ({ children, ...props }) => (
              <pre
                className="overflow-x-auto whitespace-pre-wrap break-words bg-gray-900 text-gray-100 p-4 rounded-md my-4"
                {...props}
              >
                {children}
              </pre>
            ),
            // Inline code styling
            code: ({ children, className, ...props }) => {
              // Check if this is inline code (no className means inline)
              if (!className) {
                return (
                  <code
                    className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              // Block code - let the pre handle styling
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            // Ensure proper spacing for other elements
            p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
            ul: ({ children }) => (
              <ul className="mb-4 last:mb-0">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 last:mb-0">{children}</ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default ChatMessage;
