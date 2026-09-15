import { CircleDollarSign, Copy, Moon, MoreVertical, Send, Star, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import type { ActiveTab } from "../_types/formatter";

type AppHeaderProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onShowReward: () => void;
  onShowWeChatSync: () => void;
  onCopy: () => void;
  hasContent: boolean;
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
};

export function AppHeader({
  isDarkMode,
  toggleDarkMode,
  onShowReward,
  onShowWeChatSync,
  onCopy,
  hasContent,
  activeTab,
  setActiveTab,
}: AppHeaderProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMoreMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMoreMenu]);

  return (
    <header className="bg-(--neo-app-header) border-b-[3px] border-(--neo-ink) sticky top-0 z-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0"
        >
          <img
            src="/logo.png"
            alt="TypeZen | 微信公众号 Markdown 智能排版助手"
            width={40}
            height={40}
            className="w-10 h-10 p-1 border-[3px] border-(--neo-ink) bg-white shadow-[3px_3px_0px_var(--neo-shadow-core)]"
          />
          <h1 className="text-lg sm:text-2xl font-black tracking-tighter text-(--neo-on-header)">
            TypeZen
            <span className="hidden lg:inline"> · AI 公众号排版助手</span>
          </h1>
        </Link>

        <div className="min-w-0 py-1">
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <button
              onClick={toggleDarkMode}
              className="neo-button neo-button-ghost p-2 h-10 hidden sm:flex items-center justify-center shrink-0"
              title={isDarkMode ? "切换到亮色模式" : "切换到暗黑模式"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={onShowReward}
              className="neo-button neo-button-pink p-2 h-10 hidden sm:flex items-center justify-center shrink-0"
              title="赞赏支持"
            >
              <CircleDollarSign className="w-5 h-5" />
            </button>
            <a
              href="https://github.com/mspringjade/wechat-formatter"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="neo-button neo-button-ghost px-2 py-2 sm:px-3 h-10 hidden sm:flex items-center gap-1.5 shrink-0"
              title="GitHub 仓库 · Star 支持"
            >
              <Star className="w-4 h-4" />
              <span className="text-xs font-black hidden lg:inline">Star</span>
            </a>
            <button
              onClick={onShowWeChatSync}
              className="neo-button bg-(--neo-green) text-white hover:brightness-110 px-3 py-2 sm:px-4 h-10 flex items-center gap-2 text-sm shrink-0"
              disabled={!hasContent}
            >
              <Send className="w-4 h-4" />
              <span className="lg:hidden">同步</span>
              <span className="hidden lg:inline">同步公众号</span>
            </button>
            <button
              onClick={onCopy}
              className="neo-button neo-button-primary px-3 py-2 sm:px-6 h-10 flex items-center gap-2 text-sm sm:text-base shrink-0"
              disabled={!hasContent}
            >
              <Copy className="w-5 h-5" />
              <span className="lg:hidden">复制</span>
              <span className="hidden lg:inline">一键复制</span>
            </button>
            <div ref={moreMenuRef} className="relative sm:hidden shrink-0">
              <button
                type="button"
                onClick={() => setShowMoreMenu((prev) => !prev)}
                className="neo-button neo-button-ghost p-2 h-10 flex items-center justify-center"
                title="更多操作"
                aria-expanded={showMoreMenu}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {showMoreMenu && (
                <div className="absolute right-0 top-12 z-30 w-52 neo-modal p-2 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      toggleDarkMode();
                      setShowMoreMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-black text-(--neo-ink) hover:bg-(--neo-yellow)"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{isDarkMode ? "亮色模式" : "暗黑模式"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onShowReward();
                      setShowMoreMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-black text-(--neo-ink) hover:bg-(--neo-pink)/20"
                  >
                    <CircleDollarSign className="w-4 h-4" /> 赞赏支持
                  </button>
                  <a
                    href="https://github.com/mspringjade/wechat-formatter"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => setShowMoreMenu(false)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-black text-(--neo-ink) hover:bg-(--neo-cyan)/20"
                  >
                    <Star className="w-4 h-4" /> GitHub Star
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 bg-(--neo-sub-header) border-t-[3px] border-(--neo-ink) p-2 lg:hidden">
        <button
          onClick={() => setActiveTab("input")}
          className={`flex-1 py-2 text-sm font-black text-center ${activeTab === "input" ? "neo-tab neo-tab-active" : "neo-tab"}`}
        >
          编辑
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2 text-sm font-black text-center ${activeTab === "preview" ? "neo-tab neo-tab-active" : "neo-tab"}`}
        >
          预览
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex-1 py-2 text-sm font-black text-center ${activeTab === "settings" ? "neo-tab neo-tab-active" : "neo-tab"}`}
        >
          样式 & 模板
        </button>
      </div>
    </header>
  );
}
