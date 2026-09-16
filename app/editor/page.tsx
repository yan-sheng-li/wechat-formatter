"use client";

import { useMemo, useRef, useState } from "react";
import { AppFooter } from "../_components/app-footer";
import { AppHeader } from "../_components/app-header";
import { ImageInsertModal } from "../_components/image-insert-modal";
import { MarkdownEditorPane } from "../_components/markdown-editor-pane";
import { PreviewPane } from "../_components/preview-pane";
import { RewardModal } from "../_components/reward-modal";
import { SettingsPane } from "../_components/settings-pane";
import { Toast } from "../_components/toast";
import { useClipboardCopy } from "../_hooks/use-clipboard-copy";
import { useMarkdownTools } from "../_hooks/use-markdown-tools";
import { useDraft } from "../_hooks/use-draft";
import { useScrollSync } from "../_hooks/use-scroll-sync";
import { useTheme } from "../_hooks/use-theme";
import { useToast } from "../_hooks/use-toast";
import { useWordCount } from "../_hooks/use-word-count";
import { sampleText } from "../_lib/formatter-constants";
import type { ActiveTab, FormatTweaks } from "../_types/formatter";
import { allTemplates, groupedTemplates, renderArticle } from "../template-engine";

const DEFAULT_FORMAT_TWEAKS: FormatTweaks = {
  fontSize: 16,
  lineHeight: 1.8,
  paragraphSpacing: 16,
  firstLineIndent: false,
  pagePaddingTop: 16,
  pagePaddingRight: 16,
  pagePaddingBottom: 16,
  pagePaddingLeft: 16,
  letterSpacing: 0,
  imageRadius: 8,
  themeColor: "#ff6f9f",
  h1Layout: "center",
  h2Layout: "left",
};

export default function Home() {
  const { toast, showToast } = useToast();
  const [inputText, setInputText] = useDraft(sampleText, showToast);
  const [activeTab, setActiveTab] = useState<ActiveTab>("input");
  const [currentTemplateId, setCurrentTemplateId] = useState<string>("neo-brutalism-0");
  const [currentCategory, setCurrentCategory] = useState<string>("neo-brutalism");
  const [formatTweaks, setFormatTweaks] = useState<FormatTweaks>(DEFAULT_FORMAT_TWEAKS);
  const [showReward, setShowReward] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageDesc, setImageDesc] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const wordCount = useWordCount(inputText);
  const copyToClipboard = useClipboardCopy(showToast);
  const { syncScroll, setSyncScroll, previewRef, handleInputScroll, handlePreviewScroll } =
    useScrollSync(inputRef);

  const markdownTools = useMarkdownTools({
    inputText,
    setInputText,
    inputRef,
    fileInputRef,
    imageUrl,
    imageDesc,
    setImageUrl,
    setImageDesc,
    setShowImageModal,
    showToast,
  });

  const currentTemplate =
    allTemplates.find((template) => template.id === currentTemplateId) || allTemplates[0];

  const outputHtml = useMemo(() => {
    return inputText.trim() ? renderArticle(inputText, currentTemplate, formatTweaks) : "";
  }, [inputText, currentTemplate, formatTweaks]);

  const handleCopy = () => {
    copyToClipboard(outputHtml);
  };

  return (
    <main className="min-h-screen flex flex-col neo-app-bg font-sans relative overflow-x-hidden">
      <Toast toast={toast} />

      <ImageInsertModal
        open={showImageModal}
        imageDesc={imageDesc}
        setImageDesc={setImageDesc}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onClose={() => setShowImageModal(false)}
        onLocalImage={markdownTools.handleLocalImage}
        onOnlineImage={markdownTools.handleOnlineImage}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={markdownTools.handleFileChange}
        className="hidden"
      />

      <RewardModal open={showReward} onClose={() => setShowReward(false)} />

      <div className="h-screen flex flex-col overflow-hidden shrink-0">
        <AppHeader
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onShowReward={() => setShowReward(true)}
          onCopy={handleCopy}
          hasContent={Boolean(inputText.trim())}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-5 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full">
            <MarkdownEditorPane
              activeTab={activeTab}
              inputText={inputText}
              setInputText={setInputText}
              inputRef={inputRef}
              onInputScroll={handleInputScroll}
              onPaste={markdownTools.handlePaste}
              wordCount={wordCount}
              insertMarkdown={markdownTools.insertMarkdown}
              insertHeading={markdownTools.insertHeading}
              insertList={markdownTools.insertList}
              insertTable={markdownTools.insertTable}
              insertHighlight={markdownTools.insertHighlight}
              insertSuperscript={markdownTools.insertSuperscript}
              insertSubscript={markdownTools.insertSubscript}
              insertCodeBlock={markdownTools.insertCodeBlock}
              insertLink={markdownTools.insertLink}
              insertImage={markdownTools.insertImage}
              onRestoreSample={() => setInputText(sampleText)}
            />

            <PreviewPane
              activeTab={activeTab}
              previewRef={previewRef}
              onPreviewScroll={handlePreviewScroll}
              outputHtml={outputHtml}
            />

            <SettingsPane
              activeTab={activeTab}
              allTemplatesCount={allTemplates.length}
              groupedTemplates={groupedTemplates}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              currentTemplateId={currentTemplateId}
              setCurrentTemplateId={setCurrentTemplateId}
              formatTweaks={formatTweaks}
              setFormatTweaks={setFormatTweaks}
              onResetFormatTweaks={() => setFormatTweaks(DEFAULT_FORMAT_TWEAKS)}
              syncScroll={syncScroll}
              setSyncScroll={setSyncScroll}
            />
          </div>
        </div>

        <AppFooter />
      </div>
    </main>
  );
}
