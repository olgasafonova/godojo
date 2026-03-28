import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { colors, font, radius } from "../styles/tokens";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang = "go" }) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    codeToHtml(code.trim(), {
      lang,
      theme: "github-dark",
    }).then(setHtml);
  }, [code, lang]);

  if (!html) {
    // Fallback while Shiki loads
    return (
      <pre
        style={{
          background: colors.bgCode,
          padding: 16,
          borderRadius: radius.md,
          fontFamily: font.mono,
          fontSize: 14,
          color: colors.textCode,
          overflowX: "auto",
          lineHeight: 1.6,
        }}
      >
        <code>{code.trim()}</code>
      </pre>
    );
  }

  return (
    <div
      className="code-block"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        borderRadius: radius.md,
        overflow: "hidden",
        fontSize: 14,
        lineHeight: 1.6,
      }}
    />
  );
};
