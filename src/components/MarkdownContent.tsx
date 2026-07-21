import type { ReactElement } from "react";

type Props = { content: string; className?: string };

function renderLine(line: string) {
  let html = line
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
  return html;
}

export default function MarkdownContent({ content, className = "" }: Props) {
  const lines = content.split("\n");
  const elements: ReactElement[] = [];
  let inList = false;
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 mb-4">
          {listItems.map((item, i) => (
            <li key={i} className="text-charcoal/70" dangerouslySetInnerHTML={{ __html: renderLine(item.replace(/^- /, "")) }} />
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      flushList();
      continue;
    }

    if (trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(trimmed);
      continue;
    }

    flushList();

    elements.push(
      <p key={`p-${i}`} className="mb-4 text-charcoal/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderLine(trimmed) }} />
    );
  }

  flushList();

  return <div className={className}>{elements}</div>;
}
