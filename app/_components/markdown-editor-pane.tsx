import {
  CheckSquare,
  Code2,
  FileText,
  Highlighter,
  Image as ImageIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Settings,
  Sparkles,
  Subscript,
  Superscript,
  Table,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import { MoreVertical } from "lucide-react";
import type { ActiveTab, WordCount } from "../_types/formatter";

type MarkdownEditorPaneProps = {
  activeTab: ActiveTab;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  onInputScroll: (e: React.UIEvent<HTMLTextAreaElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  wordCount: WordCount;
  insertMarkdown: (prefix: string, suffix?: string, placeholder?: string) => void;
  insertHeading: (level: number) => void;
  insertList: (type: "ul" | "ol" | "tl") => void;
  insertTable: () => void;
  insertHighlight: () => void;
  insertSuperscript: () => void;
  insertSubscript: () => void;
  insertCodeBlock: () => void;
  insertLink: () => void;
  insertImage: () => void;
  onAiFormat: () => void;
  isAiFormatting: boolean;
  onOpenAiConfig: () => void;
  onRestoreSample: () => void;
};

export function MarkdownEditorPane({
  activeTab,
  inputText,
  setInputText,
  inputRef,
  onInputScroll,
  onPaste,
  wordCount,
  insertMarkdown,
  insertHeading,
  insertList,
  insertTable,
  insertHighlight,
  insertSuperscript,
  insertSubscript,
  insertCodeBlock,
  insertLink,
  insertImage,
  onAiFormat,
  isAiFormatting,
  onOpenAiConfig,
  onRestoreSample,
}: MarkdownEditorPaneProps) {
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  const advancedToolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAdvancedTools) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (advancedToolsRef.current && !advancedToolsRef.current.contains(event.target as Node)) {
        setShowAdvancedTools(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAdvancedTools]);

  return (
    <div
      className={`flex-[1.2] flex-col neo-panel overflow-hidden ${activeTab === "input" ? "flex" : "hidden md:flex"}`}
    >
      <div className="neo-strip px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 shrink-0 min-w-0">
        <span className="text-xs sm:text-sm font-black text-(--neo-on-header) flex items-center gap-2 uppercase shrink-0 min-w-0">
          <FileText className="w-4 h-4 shrink-0" />
          <span className="truncate">Markdown 输入</span>
        </span>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 justify-end w-full sm:w-auto">
          <button
            onClick={onAiFormat}
            className="neo-button neo-button-pink text-xs px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            disabled={!inputText.trim() || isAiFormatting}
            title="使用 AI 一键优化当前 Markdown 排版结构"
          >
            {isAiFormatting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
            )}
            {isAiFormatting ? "AI 排版中..." : "AI 一键排版"}
          </button>
          <button
            onClick={onOpenAiConfig}
            className="neo-button neo-button-ghost p-1.5 shrink-0"
            title="配置 AI 服务"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRestoreSample}
            className="neo-button neo-button-secondary text-xs px-2 sm:px-2.5 py-1 whitespace-nowrap shrink-0"
            title="恢复示例 Markdown"
          >
            <span className="hidden max-[340px]:inline">恢复示例</span>
            <span className="inline max-[340px]:hidden">恢复示例内容</span>
          </button>
        </div>
      </div>

      <div className="bg-(--neo-surface) px-3 py-2 border-b-[3px] border-(--neo-ink) flex flex-wrap items-center gap-x-2 gap-y-2 shrink-0 overflow-x-auto custom-scrollbar no-scrollbar">
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={() => insertHeading(1)}
            className="neo-toolbar-button p-2 text-sm font-bold"
            title="一级标题"
          >
            H1
          </button>
          <button
            onClick={() => insertHeading(2)}
            className="neo-toolbar-button p-2 text-sm font-bold"
            title="二级标题"
          >
            H2
          </button>
          <button
            onClick={() => insertMarkdown("**", "**", "加粗")}
            className="neo-toolbar-button p-2 font-bold"
            title="加粗"
          >
            B
          </button>
          <button
            onClick={() => insertList("ul")}
            className="neo-toolbar-button p-2"
            title="列表"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={insertImage}
            className="neo-toolbar-button p-2"
            title="图片"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertMarkdown("> ", "", "引用内容")}
            className="neo-toolbar-button p-2"
            title="引用"
          >
            <Quote className="w-4 h-4" />
          </button>
          <div ref={advancedToolsRef} className="relative">
            <button
              type="button"
              onClick={() => setShowAdvancedTools((prev) => !prev)}
              className="neo-toolbar-button p-2"
              title="更多工具"
              aria-expanded={showAdvancedTools}
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {showAdvancedTools && (
              <div className="absolute right-0 top-10 z-30 w-56 neo-modal p-2 grid grid-cols-2 gap-1">
                <button type="button" onClick={() => { insertHeading(3); setShowAdvancedTools(false); }} className="neo-toolbar-button px-2 py-2 text-xs">H3</button>
                <button type="button" onClick={() => { insertMarkdown("*", "*", "斜体"); setShowAdvancedTools(false); }} className="neo-toolbar-button px-2 py-2 italic font-serif">I</button>
                <button type="button" onClick={() => { insertMarkdown("~~", "~~", "删除线"); setShowAdvancedTools(false); }} className="neo-toolbar-button px-2 py-2 line-through">S</button>
                <button type="button" onClick={() => { insertHighlight(); setShowAdvancedTools(false); }} className="neo-toolbar-button p-2 text-yellow-600"><Highlighter className="w-4 h-4" /></button>
                <button type="button" onClick={() => { insertList("ol"); setShowAdvancedTools(false); }} className="neo-toolbar-button p-2"><ListOrdered className="w-4 h-4" /></button>
                <button type="button" onClick={() => { insertList("tl"); setShowAdvancedTools(false); }} className="neo-toolbar-button p-2"><CheckSquare className="w-4 h-4" /></button>
                <button type="button" onClick={() => { insertLink(); setShowAdvancedTools(false); }} className="neo-toolbar-button p-2"><LinkIcon className="w-4 h-4" /></button>
                <button type="button" onClick={() => { insertTable(); setShowAdvancedTools(false); }} className="neo-toolbar-button p-2"><Table className="w-4 h-4" /></button>
                <button type="button" onClick={() => { insertMarkdown("---\n", "", ""); setShowAdvancedTools(false); }} className="neo-toolbar-button p-2"><Minus className="w-4 h-4" /></button>
                <button type="button" onClick={() => { insertMarkdown("`", "`", "代码"); setShowAdvancedTools(false); }} className="neo-toolbar-button px-2 py-2 font-mono text-xs">{"</>"}</button>
                <button type="button" onClick={() => { insertCodeBlock(); setShowAdvancedTools(false); }} className="neo-toolbar-button p-2"><Code2 className="w-4 h-4" /></button>
                <button type="button" onClick={() => { insertSuperscript(); setShowAdvancedTools(false); }} className="neo-toolbar-button p-2"><Superscript className="w-4 h-4" /></button>
                <button type="button" onClick={() => { insertSubscript(); setShowAdvancedTools(false); }} className="neo-toolbar-button p-2"><Subscript className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex md:flex-wrap md:w-full md:items-center md:gap-x-2 md:gap-y-2">
        {/* Style Group */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => insertHeading(1)}
            className="neo-toolbar-button p-1.5 text-sm font-bold"
            title="一级标题"
          >
            H1
          </button>
          <button
            onClick={() => insertHeading(2)}
            className="neo-toolbar-button p-1.5 text-sm font-bold"
            title="二级标题"
          >
            H2
          </button>
          <button
            onClick={() => insertHeading(3)}
            className="neo-toolbar-button p-1.5 text-sm font-bold"
            title="三级标题"
          >
            H3
          </button>
          <div className="w-[2px] h-4 bg-(--neo-ink)/20 mx-0.5" />
          <button
            onClick={() => insertMarkdown("**", "**", "加粗")}
            className="neo-toolbar-button p-1.5 font-bold"
            title="加粗 (Ctrl+B)"
          >
            B
          </button>
          <button
            onClick={() => insertMarkdown("*", "*", "斜体")}
            className="neo-toolbar-button p-1.5 italic font-serif"
            title="斜体 (Ctrl+I)"
          >
            I
          </button>
          <button
            onClick={() => insertMarkdown("~~", "~~", "删除线")}
            className="neo-toolbar-button p-1.5 line-through"
            title="删除线"
          >
            S
          </button>
          <button
            onClick={insertHighlight}
            className="neo-toolbar-button p-1.5 text-yellow-600"
            title="文本高亮"
          >
            <Highlighter className="w-4 h-4" />
          </button>
        </div>

        <div className="w-[3px] h-6 bg-(--neo-ink) mx-1 shrink-0" />

        {/* List Group */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => insertList("ul")}
            className="neo-toolbar-button p-1.5"
            title="无序列表"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertList("ol")}
            className="neo-toolbar-button p-1.5"
            title="有序列表"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertList("tl")}
            className="neo-toolbar-button p-1.5"
            title="任务列表"
          >
            <CheckSquare className="w-4 h-4" />
          </button>
        </div>

        <div className="w-[3px] h-6 bg-(--neo-ink) mx-1 shrink-0" />

        {/* Insert Group */}
        <div className="flex items-center gap-1">
          <button onClick={insertLink} className="neo-toolbar-button p-1.5" title="插入链接">
            <LinkIcon className="w-4 h-4" />
          </button>
          <button onClick={insertImage} className="neo-toolbar-button p-1.5" title="插入图片">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button onClick={insertTable} className="neo-toolbar-button p-1.5" title="插入表格">
            <Table className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertMarkdown("---\n", "", "")}
            className="neo-toolbar-button p-1.5"
            title="分隔线"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        <div className="w-[3px] h-6 bg-(--neo-ink) mx-1 shrink-0" />

        {/* Advanced Group */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => insertMarkdown("`", "`", "代码")}
            className="neo-toolbar-button p-1.5 font-mono text-sm"
            title="行内代码"
          >
            {"</>"}
          </button>
          <button onClick={insertCodeBlock} className="neo-toolbar-button p-1.5" title="代码块">
            <Code2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertMarkdown("> ", "", "引用内容")}
            className="neo-toolbar-button p-1.5"
            title="引用块"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button onClick={insertSuperscript} className="neo-toolbar-button p-1.5" title="上标">
            <Superscript className="w-4 h-4" />
          </button>
          <button onClick={insertSubscript} className="neo-toolbar-button p-1.5" title="下标">
            <Subscript className="w-4 h-4" />
          </button>
        </div>
        </div>
      </div>

      <textarea
        ref={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onScroll={onInputScroll}
        onPaste={onPaste}
        className="flex-1 w-full p-4 lg:p-6 resize-none focus:outline-none text-(--neo-ink) leading-relaxed font-mono text-[14px] bg-(--neo-surface) overflow-y-auto custom-scrollbar"
        placeholder="支持标准 Markdown 语法：&#10;# 标题支持1-6级&#10;> 引用内容&#10;- 列表项1&#10;- 列表项2&#10;**加粗文字**"
      />

      <div className="bg-(--neo-green) px-4 py-2 border-t-[3px] border-(--neo-ink) flex items-center justify-between text-xs text-(--neo-on-accent) shrink-0 font-bold">
        <div className="flex items-center gap-4">
          <span>
            字符: <strong>{wordCount.chars}</strong>
          </span>
          <span>
            字数: <strong>{wordCount.words}</strong>
          </span>
          <span>
            预计阅读: <strong>{wordCount.readTime}分钟</strong>
          </span>
        </div>
        <span>支持直接粘贴图片</span>
      </div>
    </div>
  );
}
