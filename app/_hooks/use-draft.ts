import { useEffect, useState } from "react";
import { draftStorageKey } from "../_lib/formatter-constants";
import type { ShowToast } from "./use-toast";

/**
 * 单份草稿：编辑区正文自动存本地，下次进来恢复上次内容。
 * 正文清空时同步删除草稿，下次进编辑器回到示例文案。
 */
export function useDraft(initialText: string, showToast: ShowToast) {
  const [inputText, setInputText] = useState(initialText);
  const [draftLoaded, setDraftLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftStorageKey);
      if (saved) {
        setInputText(saved);
        showToast("已恢复上次编辑的草稿");
      }
    } catch {
      // 读不到就继续用示例文案
    }
    setDraftLoaded(true);
    // 仅挂载时执行一次，不依赖 showToast（每次渲染是新对象）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!draftLoaded) return;
    const timer = setTimeout(() => {
      try {
        if (inputText) {
          localStorage.setItem(draftStorageKey, inputText);
        } else {
          localStorage.removeItem(draftStorageKey);
        }
      } catch {
        // 隐私模式或超出配额：存不进不影响继续编辑
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [inputText, draftLoaded]);

  return [inputText, setInputText] as const;
}