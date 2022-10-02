import RemarkGfm from "remark-gfm";
import RemarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import "github-markdown-css";

interface MarkdownRendererProps {
  content: string;
}

function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[RemarkGfm, RemarkBreaks]}
      
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          if (!inline && match) {
            return (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            );
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}

export default MarkdownRenderer;
