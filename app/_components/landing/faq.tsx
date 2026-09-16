import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    q: "TypeZen 真的完全免费吗？",
    a: "是的，TypeZen 核心编辑、84 套模板、AI 排版（BYO Key）和一键复制功能完全免费，永久保留，并且完全开源。",
  },
  {
    q: "AI 排版功能是如何运作的？",
    a: "TypeZen 支持通过填入您自己的 OpenAI、Anthropic 或 OpenRouter API Key 来启用 AI 智能排版。AI 排版请求会临时经过 TypeZen 服务端转发到您选择的模型服务，我们不会持久化保存您的文章内容和 API Key。",
  },
  {
    q: "模版库会更新吗？",
    a: "我们会定期根据设计趋势和用户反馈，更新和增加新的排版模板。目前已涵盖新粗野、极简、商务、文艺、科技、节庆等 6 大核心风格。",
  },
  {
    q: "为什么我复制过去后图片不显示？",
    a: "如果您使用了本地上传的图片，微信后台需要一定时间来「转存」这些图片。建议在粘贴后等待 1-2 秒，或使用公网可访问的图片链接。",
  },
  {
    q: "支持代码块和表格吗？",
    a: "支持！代码块、表格、引用、图片等 Markdown 元素均可正确渲染为微信兼容的内联样式 HTML，粘贴到公众号后台即可保持样式不变。",
  },
];

export function LandingFAQ() {
  return (
    <section id="faq" className="py-24 bg-(--neo-surface) border-t-[3px] border-(--neo-ink)">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-(--neo-ink) uppercase">
            常见问题解答
          </h2>
          <p className="text-xl font-bold text-(--neo-muted)">
            在这里寻找您关于 TypeZen 的所有疑惑。
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group neo-panel bg-white [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between p-6 font-black cursor-pointer text-xl text-(--neo-ink)">
                {faq.q}
                <div className="w-10 h-10 border-[3px] border-(--neo-ink) flex items-center justify-center bg-(--neo-yellow) shadow-[2px_2px_0px_var(--neo-shadow-core)] group-open:bg-(--neo-pink) transition-colors">
                  <Plus className="w-6 h-6 group-open:hidden" />
                  <Minus className="w-6 h-6 hidden group-open:block" />
                </div>
              </summary>
              <div className="px-6 pb-8 text-lg font-bold text-(--neo-muted) leading-relaxed border-t-[3px] border-(--neo-ink) pt-6">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
