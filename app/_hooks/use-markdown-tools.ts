import { useCallback } from "react";
import React, { type ClipboardEvent } from "react";
import { uploadImageFile } from "../_lib/image-upload";
import type { ShowToast } from "./use-toast";

type UseMarkdownToolsParams = {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  imageUrl: string;
  imageDesc: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setImageDesc: React.Dispatch<React.SetStateAction<string>>;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: ShowToast;
};

export function useMarkdownTools({
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
}: UseMarkdownToolsParams) {
  const insertMarkdown = useCallback(
    (prefix: string, suffix: string = prefix, placeholder: string = "") => {
      const textarea = inputRef.current;
      if (!textarea) return;

      const scrollTop = textarea.scrollTop;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = inputText.substring(start, end);
      const textToInsert = selectedText || placeholder;
      const newText =
        inputText.substring(0, start) + prefix + textToInsert + suffix + inputText.substring(end);

      setInputText(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.scrollTop = scrollTop;
        const newCursorPos = start + prefix.length + textToInsert.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [inputRef, inputText, setInputText],
  );

  const insertHeading = useCallback(
    (level: number) => {
      const textarea = inputRef.current;
      if (!textarea) return;

      const scrollTop = textarea.scrollTop;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = inputText.substring(start, end);
      const prefix = "#".repeat(level) + " ";
      const textToInsert = selectedText || "标题";
      const newText =
        inputText.substring(0, start) + prefix + textToInsert + inputText.substring(end);

      setInputText(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.scrollTop = scrollTop;
        textarea.setSelectionRange(
          start + prefix.length,
          start + prefix.length + textToInsert.length,
        );
      }, 0);
    },
    [inputRef, inputText, setInputText],
  );

  const insertList = useCallback(
    (type: "ul" | "ol" | "tl") => {
      const textarea = inputRef.current;
      if (!textarea) return;

      const scrollTop = textarea.scrollTop;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = inputText.substring(start, end);
      let prefix = "";
      if (type === "ul") prefix = "- ";
      else if (type === "ol") prefix = "1. ";
      else if (type === "tl") prefix = "- [ ] ";

      const textToInsert = selectedText || "列表项";
      const newText = inputText.substring(0, start) + prefix + textToInsert + inputText.substring(end);

      setInputText(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.scrollTop = scrollTop;
        textarea.setSelectionRange(
          start + prefix.length,
          start + prefix.length + textToInsert.length,
        );
      }, 0);
    },
    [inputRef, inputText, setInputText],
  );

  const insertTable = useCallback(() => {
    const textarea = inputRef.current;
    if (!textarea) return;
    const scrollTop = textarea.scrollTop;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const tableTemplate = "\n| 标题 | 标题 |\n| --- | --- |\n| 内容 | 内容 |\n";
    const newText = inputText.substring(0, start) + tableTemplate + inputText.substring(end);
    setInputText(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.scrollTop = scrollTop;
      textarea.setSelectionRange(start + 3, start + 5);
    }, 0);
  }, [inputRef, inputText, setInputText]);

  const insertHighlight = useCallback(() => {
    insertMarkdown("==", "==", "高亮文字");
  }, [insertMarkdown]);

  const insertSuperscript = useCallback(() => {
    insertMarkdown("^", "^", "上标");
  }, [insertMarkdown]);

  const insertSubscript = useCallback(() => {
    insertMarkdown("~", "~", "下标");
  }, [insertMarkdown]);

  const insertCodeBlock = useCallback(() => {
    const textarea = inputRef.current;
    if (!textarea) return;

    const scrollTop = textarea.scrollTop;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = inputText.substring(start, end);
    const codeBlock = "```javascript\n" + (selectedText || "代码") + "\n```";
    const newText = inputText.substring(0, start) + codeBlock + inputText.substring(end);

    setInputText(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.scrollTop = scrollTop;
      const newCursorPos = start + 14 + (selectedText || "代码").length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [inputRef, inputText, setInputText]);

  const insertLink = useCallback(() => {
    const textarea = inputRef.current;
    if (!textarea) return;

    const scrollTop = textarea.scrollTop;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = inputText.substring(start, end);
    const linkText = selectedText || "链接文字";
    const linkMarkdown = `[${linkText}](url)`;
    const newText = inputText.substring(0, start) + linkMarkdown + inputText.substring(end);

    setInputText(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.scrollTop = scrollTop;
      const urlStart = start + linkText.length + 3;
      textarea.setSelectionRange(urlStart, urlStart + 3);
    }, 0);
  }, [inputRef, inputText, setInputText]);

  const insertImageAtCursor = useCallback(
    (imageMarkdown: string) => {
      const textarea = inputRef.current;
      if (!textarea) return;

      const scrollTop = textarea.scrollTop;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = inputText.substring(0, start) + imageMarkdown + inputText.substring(end);

      setInputText(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.scrollTop = scrollTop;
        textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
      }, 0);
    },
    [inputRef, inputText, setInputText],
  );

  const uploadAndInsertImage = useCallback(
    async (file: File, desc = "图片") => {
      try {
        const imageUrl = await uploadImageFile(file);
        insertImageAtCursor(`![${desc}](${imageUrl})`);
        showToast("图片已上传并插入", "success");
        return true;
      } catch (error) {
        showToast(error instanceof Error ? error.message : "图片上传失败，请稍后重试", "error");
        return false;
      }
    },
    [insertImageAtCursor, showToast],
  );

  const insertImage = useCallback(() => {
    setImageUrl("");
    setImageDesc("");
    setShowImageModal(true);
  }, [setImageDesc, setImageUrl, setShowImageModal]);

  const handleLocalImage = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;

      await uploadAndInsertImage(file, imageDesc || "图片");
      setShowImageModal(false);
    },
    [imageDesc, uploadAndInsertImage, setShowImageModal],
  );

  const handleOnlineImage = useCallback(() => {
    const url = imageUrl.trim();
    if (!url) return;

    const desc = imageDesc || "图片";
    insertImageAtCursor(`![${desc}](${url})`);
    setShowImageModal(false);
  }, [imageDesc, imageUrl, insertImageAtCursor, setShowImageModal]);

  const handlePaste = useCallback(
    async (e: ClipboardEvent<HTMLTextAreaElement>) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          e.preventDefault();
          const file = item.getAsFile();
          if (!file) continue;

          await uploadAndInsertImage(file, "图片");
          break;
        }
      }
    },
    [uploadAndInsertImage],
  );

  return {
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
    handleLocalImage,
    handleFileChange,
    handleOnlineImage,
    handlePaste,
  };
}
