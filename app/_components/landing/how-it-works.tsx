import { Check, Copy, Edit3, Image as ImageIcon, Layout, Zap } from "lucide-react";

const steps = [
  {
    icon: <Edit3 className="w-10 h-10" />,
    title: "多维创作与导入",
    description:
      "支持 Markdown 自由书写与粘贴。不仅能拖拽上传图片，更支持直接粘贴系统截图，瞬间转为预览。连续图片自动触发「多图并排」美化布局。",
    color: "var(--neo-pink)",
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "AI 结构化深度修复",
    description:
      "内置 AI 引擎一键扫描。在不改写文字的前提下，自动修正标题层级、规范列表、添加合理空行，支持自定义系统提示词以满足个性化需求。",
    color: "var(--neo-cyan)",
  },
  {
    icon: <Layout className="w-10 h-10" />,
    title: "海量模板与细节微调",
    description:
      "提供 84 套涵盖新粗野、极简、国风等 7 大风格的精选模板。侧边栏支持对字号、行高、段间距、主题色等 10+ 项参数进行颗粒度级别的实时微调。",
    color: "var(--neo-green)",
  },
  {
    icon: <ImageIcon className="w-10 h-10" />,
    title: "全元素内联适配",
    description:
      "代码块、表格、引用、图片等所有 Markdown 元素自动转为微信兼容的内联样式 HTML。表格自适应宽度，代码块不溢出，粘贴即可发布。",
    color: "var(--neo-yellow)",
  },
  {
    icon: <Copy className="w-10 h-10" />,
    title: "一键复制发布",
    description:
      "排版完成后一键复制富文本，直接粘贴到微信公众号后台即可发布。无需注册账号，无需额外工具，操作简单高效。",
    color: "var(--neo-pink)",
  },
  {
    icon: <Check className="w-10 h-10" />,
    title: "全自动兼容性处理",
    description:
      "渲染引擎全自动完成 CSS 内联处理。只需点击「一键复制」，即可在微信编辑器中直接粘贴，完美还原 100% 预览效果。",
    color: "var(--neo-cyan)",
  },
];

export function LandingHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-(--neo-surface) border-t-[3px] border-(--neo-ink)"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-(--neo-ink) uppercase">
            从输入到发布的完整流程
          </h2>
          <p className="text-xl font-bold text-(--neo-muted) max-w-2xl mx-auto">
            TypeZen 针对公众号排版痛点设计，只需简单的几步，即可享受高效流畅的创作流程。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
              <div
                className="w-24 h-24 rounded-full border-[3px] border-(--neo-ink) shadow-[4px_4px_0px_var(--neo-shadow-core)] flex items-center justify-center mb-8 bg-white"
                style={{ color: step.color }}
              >
                {step.icon}
              </div>
              <div className="neo-panel p-6 bg-white w-full h-full flex flex-col items-center">
                <div className="font-black text-4xl mb-2 text-(--neo-ink) opacity-20">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-black mb-3 text-(--neo-ink)">{step.title}</h3>
                <p className="font-bold text-(--neo-muted) text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
