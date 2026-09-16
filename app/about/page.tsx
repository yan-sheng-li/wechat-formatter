import Link from "next/link";
import {
  SITE_BRAND,
  SITE_CONTACT_EMAIL,
  SITE_GITHUB_URL,
  SITE_ICP,
  SITE_PRODUCT_NAME,
  SITE_SINCE_YEAR,
  SITE_URL,
} from "@/lib/site-config";
import { LegalLayout } from "../_components/landing/legal-layout";

export const metadata = {
  title: "关于我们",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  const currentYear = new Date().getFullYear();

  return (
    <LegalLayout title="关于我们">
      <section>
        <h2 className="text-xl font-black uppercase text-(--neo-cyan) mb-3">品牌介绍</h2>
        <p className="text-base font-bold text-(--neo-muted) leading-relaxed">
          {SITE_BRAND} 是一款专为微信公众号打造的 {SITE_PRODUCT_NAME}。
          我们相信，创作者的时间应该花在内容本身，而不是反复调整字号、间距与配色。 通过 {SITE_BRAND}
          ，你只需要专注于用 Markdown 写作，剩下的排版工作交给 AI 与 84 套精选模板即可完成。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase text-(--neo-pink) mb-3">核心功能</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base font-bold text-(--neo-muted)">
          <li className="flex items-start gap-2">
            <span className="text-(--neo-yellow)">▸</span>
            <span>84 套多风格排版模板</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-(--neo-yellow)">▸</span>
            <span>AI 一键优化 Markdown 结构</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-(--neo-yellow)">▸</span>
            <span>实时手机预览与样式微调</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-(--neo-yellow)">▸</span>
            <span>一键复制到公众号后台</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-(--neo-yellow)">▸</span>
            <span>微信同步与 IP 白名单诊断</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-(--neo-yellow)">▸</span>
            <span>本地安全，API Key 不落地</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase text-(--neo-green) mb-3">开源与技术栈</h2>
        <p className="text-base font-bold text-(--neo-muted) leading-relaxed mb-4">
          {SITE_BRAND} 基于 Next.js、React、Tailwind CSS 与 Vercel AI SDK 构建，
          追求极致的加载速度与现代化开发体验。项目代码已在 GitHub 开源，欢迎 Star、提 Issue
          或贡献代码。
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={SITE_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="neo-button neo-button-ghost px-4 py-2 text-sm"
          >
            GitHub 仓库
          </a>
          <Link href="/editor" className="neo-button neo-button-primary px-4 py-2 text-sm">
            进入编辑器
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase text-(--neo-cyan) mb-3">团队与维护</h2>
        <p className="text-base font-bold text-(--neo-muted) leading-relaxed">
          {SITE_BRAND} 由 {SITE_BRAND} Team 设计、开发与维护。 自 {SITE_SINCE_YEAR}{" "}
          年上线以来，我们持续迭代模板系统、AI 排版能力与微信同步体验，
          希望能为每一位内容创作者节省排版时间。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase text-(--neo-pink) mb-3">相关链接</h2>
        <div className="flex flex-wrap gap-4 text-sm font-bold">
          <Link
            href="/privacy"
            className="text-(--neo-muted) hover:text-(--neo-ink) transition-colors"
          >
            隐私政策
          </Link>
          <Link
            href="/terms"
            className="text-(--neo-muted) hover:text-(--neo-ink) transition-colors"
          >
            服务条款
          </Link>
          <Link
            href="/editor"
            className="text-(--neo-muted) hover:text-(--neo-ink) transition-colors"
          >
            进入编辑器
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-black uppercase text-(--neo-green) mb-3">联系我们</h2>
        <p className="text-base font-bold text-(--neo-muted) leading-relaxed">
          如有任何问题、建议或合作意向，欢迎通过邮件联系我们：
          <a
            href={`mailto:${SITE_CONTACT_EMAIL}`}
            className="text-(--neo-ink) hover:text-(--neo-pink) transition-colors underline underline-offset-4 decoration-2"
          >
            {SITE_CONTACT_EMAIL}
          </a>
        </p>
      </section>

      {SITE_ICP && (
        <p className="text-xs font-bold text-(--neo-muted) pt-4 border-t-[3px] border-(--neo-ink)">
          {SITE_ICP}
        </p>
      )}

      <p className="text-xs font-bold text-(--neo-muted)">
        © {SITE_SINCE_YEAR}-{currentYear} {SITE_BRAND} ({" "}
        {SITE_GITHUB_URL.replace("https://github.com/", "")} ). All rights reserved.
      </p>
    </LegalLayout>
  );
}
