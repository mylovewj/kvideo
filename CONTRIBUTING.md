# 贡献指南

感谢您对 KVideo 项目的关注！我们热烈欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🎨 优化 UI/UX
- ✨ 提交代码修复或新功能

## 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
  - [报告 Bug](#报告-bug)
  - [提出功能建议](#提出功能建议)
  - [提交代码](#提交代码)
- [开发指南](#开发指南)
  - [环境搭建](#环境搭建)
  - [代码规范](#代码规范)
  - [提交规范](#提交规范)
- [Liquid Glass UI 设计规范](#liquid-glass-ui-设计规范)
  - [核心原则](#核心原则)
  - [组件设计准则](#组件设计准则)
  - [CSS 变量系统](#css-变量系统)
  - [动画规范](#动画规范)
- [测试指南](#测试指南)
- [文档规范](#文档规范)

## 行为准则

本项目遵循 [Contributor Covenant](https://www.contributor-covenant.org/) 行为准则。参与本项目即表示您同意遵守其条款。

我们承诺提供一个开放、友好、包容的社区环境：

- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员保持同理心

## 如何贡献

### 报告 Bug

如果您发现了 Bug，请通过 [GitHub Issues](https://github.com/KuekHaoYang/kvideo/issues) 报告。报告时请包含：

1. **清晰的标题** - 简明扼要地描述问题
2. **重现步骤** - 详细说明如何触发 Bug
3. **预期行为** - 描述您期望的正常行为
4. **实际行为** - 描述实际发生了什么
5. **环境信息**
   - 浏览器版本（如 Chrome 120）
   - 操作系统（如 macOS 14.0）
   - Node.js 版本（如 20.10.0）
6. **截图/视频**（如适用）
7. **控制台错误**（如有）

**Bug 报告模板：**

```markdown
### 问题描述
[清晰描述 Bug]

### 重现步骤
1. 进入 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

### 预期行为
[描述预期的正常行为]

### 实际行为
[描述实际发生的情况]

### 截图
[如果适用，添加截图]

### 环境
- 浏览器: [如 Chrome 120]
- 操作系统: [如 macOS 14.0]
- Node.js 版本: [如 20.10.0]

### 额外信息
[任何其他有助于解决问题的信息]
```

### 提出功能建议

我们欢迎新功能建议！请通过 [GitHub Issues](https://github.com/KuekHaoYang/kvideo/issues) 提交，并包含：

1. **功能概述** - 简要描述功能
2. **使用场景** - 说明为什么需要这个功能
3. **详细设计** - 描述功能如何工作
4. **UI 设计**（如适用）- 提供设计稿或草图
5. **技术实现思路**（可选）

### 提交代码

1. **Fork 仓库**
   ```bash
   # 点击 GitHub 页面右上角的 "Fork" 按钮
   ```

2. **克隆您的 Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/kvideo.git
   cd kvideo
   ```

3. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **进行开发**
   - 遵循 [代码规范](#代码规范)
   - 遵循 [Liquid Glass UI 设计规范](#liquid-glass-ui-设计规范)
   - 编写清晰的代码注释

6. **测试您的更改**
   ```bash
   npm run dev  # 启动开发服务器
   npm run lint # 检查代码规范
   npm run build # 确保构建成功
   ```

7. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加某个功能"
   # 遵循提交规范（见下文）
   ```

8. **推送到您的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **创建 Pull Request**
   - 前往原仓库页面
   - 点击 "New Pull Request"
   - 填写 PR 模板
   - 等待代码审查

## 开发指南

### 环境搭建

**系统要求：**
- Node.js 20.x 或更高
- npm 9.x 或 pnpm 8.x
- Git 2.x

**快速开始：**

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/kvideo.git
cd kvideo

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问 http://localhost:3000
```

### 代码规范

#### TypeScript 规范

- **严格模式** - 启用 `strict: true`
- **类型注解** - 所有函数参数和返回值必须有类型
- **避免 `any`** - 使用具体类型或 `unknown`
- **接口优先** - 优先使用 `interface` 而非 `type`

```typescript
// ✅ 好的示例
interface VideoProps {
  id: string;
  title: string;
  onPlay: (url: string) => void;
}

function VideoCard({ id, title, onPlay }: VideoProps): JSX.Element {
  return <div>{title}</div>;
}

// ❌ 不好的示例
function VideoCard(props: any) {
  return <div>{props.title}</div>;
}
```

#### React 组件规范

- **函数组件** - 使用函数组件和 Hooks
- **命名规范** - PascalCase 命名组件文件
- **单一职责** - 每个组件只做一件事
- **文件大小** - 单个文件不超过 150 行（严格遵守）
- **Props 解构** - 在函数参数中解构 props

```typescript
// ✅ 好的示例 - SearchForm.tsx
'use client';

interface SearchFormProps {
  onSubmit: (query: string) => void;
  placeholder?: string;
}

export function SearchForm({ onSubmit, placeholder = '搜索视频...' }: SearchFormProps) {
  // 组件逻辑（不超过 150 行）
}
```

#### 文件组织规范

```
components/
├── search/              # 功能分组
│   ├── SearchForm.tsx   # 主组件
│   ├── VideoGrid.tsx
│   └── index.ts         # 导出文件
├── player/
└── ui/                  # 通用 UI 组件
    ├── Button.tsx
    ├── Card.tsx
    └── Input.tsx
```

#### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `VideoPlayer`, `SearchForm` |
| 函数 | camelCase | `handleSearch`, `fetchVideoData` |
| 常量 | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RESULTS` |
| 接口 | PascalCase + 描述性 | `VideoPlayerProps`, `SearchResult` |
| 类型 | PascalCase | `VideoData`, `PlayerState` |
| Hook | use + PascalCase | `useVideoPlayer`, `useSearchCache` |

### 提交规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

**格式：**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）：**

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构（既不是新功能也不是 Bug 修复） |
| `perf` | 性能优化 |
| `test` | 添加测试 |
| `chore` | 构建过程或辅助工具的变动 |
| `ui` | UI/UX 改进 |

**示例：**

```bash
# 新功能
git commit -m "feat(search): 添加实时流式搜索功能"

# Bug 修复
git commit -m "fix(player): 修复 HLS 流加载失败问题"

# UI 改进
git commit -m "ui(card): 优化视频卡片悬停动画效果"

# 文档
git commit -m "docs(readme): 更新安装步骤说明"

# 重构
git commit -m "refactor(api): 提取搜索逻辑到独立模块"
```

## Liquid Glass UI 设计规范

KVideo 严格遵循 **Liquid Glass** 设计系统。所有 UI 贡献必须符合以下规范。

### 核心原则

#### 1. 玻璃效果（Glass Effect）

所有容器类组件必须使用毛玻璃效果：

```css
.glass-container {
  background: var(--glass-bg);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-md);
}
```

#### 2. 通用柔软度（Universal Softness）

**只使用两种圆角：**

- **`rounded-2xl` (1.5rem)** - 用于容器类组件
- **`rounded-full` (9999px)** - 用于圆形/胶囊组件

```typescript
// ✅ 正确示例
<div className="... rounded-2xl">  {/* 卡片 */}
<button className="... rounded-2xl"> {/* 按钮 */}
<input className="... rounded-2xl">  {/* 输入框 */}
<div className="... rounded-full">   {/* 头像 */}
<span className="... rounded-full">  {/* 徽章 */}

// ❌ 错误示例
<div className="... rounded-lg">     {/* 不使用其他圆角值 */}
<div className="... rounded-md">
<div className="... rounded">
```

#### 3. 流体动画（Fluid Animation）

使用物理感知的缓动曲线：

```css
.animated-element {
  transition: all var(--transition-fluid);
  /* 等价于: transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); */
}
```

#### 4. 光学交互（Lensing & Light Interaction）

悬停时添加内发光效果：

```css
.interactive-element:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 30%, transparent);
}
```

#### 5. 层次分明（Depth & Hierarchy）

使用两级阴影：

```css
--shadow-sm: 0 2px 4px var(--shadow-color);
--shadow-md: 0 4px 12px var(--shadow-color);
```

### 组件设计准则

#### 按钮组件

```typescript
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        font-semibold transition-all duration-[400ms]
        rounded-2xl shadow-[var(--shadow-sm)]
        hover:transform hover:translate-y-[-2px]
        hover:shadow-[var(--shadow-md)]
        active:transform active:translate-y-0 active:scale-[0.98]
        ${variant === 'primary' && 'bg-[var(--accent-color)] text-white'}
        ${variant === 'secondary' && 'bg-[var(--glass-bg)] border border-[var(--glass-border)]'}
        ${size === 'md' && 'px-5 py-3 text-base'}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

#### 卡片组件

```typescript
// Card.tsx
interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-[var(--glass-bg)] backdrop-blur-[25px] saturate-[180%]
        border border-[var(--glass-border)] rounded-2xl
        shadow-[var(--shadow-md)] p-6
        transition-all duration-[400ms]
        ${hover && 'hover:transform hover:translate-y-[-5px] hover:scale-[1.02]'}
      `}
    >
      {children}
    </div>
  );
}
```

#### 输入框组件

```typescript
// Input.tsx
interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function Input({ placeholder, value, onChange }: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full bg-[var(--glass-bg)] backdrop-blur-[10px]
        border border-[var(--glass-border)] rounded-2xl
        px-4 py-3 text-base text-[var(--text-color)]
        transition-all duration-[400ms]
        focus:outline-none focus:border-[var(--accent-color)]
        focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent-color)_30%,transparent)]
      "
    />
  );
}
```

### CSS 变量系统

所有样式必须使用 CSS 变量，确保主题切换正常工作：

```css
/* globals.css */
:root {
  /* 字体 */
  --font-family-system: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* 浅色主题 */
  --bg-color-light: #f0f2f5;
  --text-color-light: #1d1d1f;
  --accent-color-light: #007aff;
  --glass-bg-light: rgba(242, 242, 247, 0.8);
  --glass-border-light: rgba(255, 255, 255, 0.5);
  --shadow-color-light: rgba(0, 0, 0, 0.1);

  /* 深色主题 */
  --bg-color-dark: #121212;
  --text-color-dark: #f5f5f7;
  --accent-color-dark: #0a84ff;
  --glass-bg-dark: rgba(28, 28, 30, 0.75);
  --glass-border-dark: rgba(60, 60, 60, 0.7);
  --shadow-color-dark: rgba(0, 0, 0, 0.3);

  /* 圆角 */
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* 阴影 */
  --shadow-sm: 0 2px 4px var(--shadow-color);
  --shadow-md: 0 4px 12px var(--shadow-color);

  /* 动画 */
  --transition-fluid: 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

body {
  --bg-color: var(--bg-color-light);
  --text-color: var(--text-color-light);
  --accent-color: var(--accent-color-light);
  --glass-bg: var(--glass-bg-light);
  --glass-border: var(--glass-border-light);
  --shadow-color: var(--shadow-color-light);
}

body.dark-mode {
  --bg-color: var(--bg-color-dark);
  --text-color: var(--text-color-dark);
  --accent-color: var(--accent-color-dark);
  --glass-bg: var(--glass-bg-dark);
  --glass-border: var(--glass-border-dark);
  --shadow-color: var(--shadow-color-dark);
}
```

**使用示例：**

```typescript
// ✅ 正确 - 使用 CSS 变量
<div style={{ 
  background: 'var(--glass-bg)',
  borderRadius: 'var(--radius-2xl)',
  color: 'var(--text-color)'
}} />

// ❌ 错误 - 硬编码颜色
<div style={{ 
  background: '#f0f2f5',
  borderRadius: '1.5rem',
  color: '#1d1d1f'
}} />
```

### 动画规范

#### 悬停动画

```typescript
<div className="
  transition-all duration-[400ms]
  hover:transform hover:translate-y-[-5px] hover:scale-[1.02]
  hover:shadow-[var(--shadow-md)]
">
```

#### 点击动画

```typescript
<button className="
  active:transform active:translate-y-0 active:scale-[0.98]
">
```

#### 淡入动画

```typescript
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

### 响应式设计

使用 Tailwind 的响应式前缀：

```typescript
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  xl:grid-cols-5
">
```

**断点定义：**

| 前缀 | 最小宽度 | 适用设备 |
|------|---------|---------|
| `sm` | 640px | 平板竖屏 |
| `md` | 768px | 平板横屏 |
| `lg` | 1024px | 笔记本 |
| `xl` | 1280px | 桌面 |
| `2xl` | 1536px | 大屏 |

### UI 检查清单

提交 UI 相关的 PR 前，请确保：

- [ ] 所有容器使用 `rounded-2xl`
- [ ] 所有圆形元素使用 `rounded-full`
- [ ] 使用毛玻璃效果 `backdrop-filter: blur(25px) saturate(180%)`
- [ ] 使用 CSS 变量而非硬编码颜色
- [ ] 悬停时有流体动画效果
- [ ] 支持深浅色主题
- [ ] 在移动端和桌面端测试过
- [ ] 无控制台警告或错误
- [ ] 代码通过 ESLint 检查

## 测试指南

### 手动测试

在提交 PR 前，请确保：

1. **功能测试**
   - [ ] 新功能按预期工作
   - [ ] 没有破坏现有功能
   - [ ] 边界情况处理正确

2. **浏览器测试**
   - [ ] Chrome（最新版本）
   - [ ] Safari（最新版本）
   - [ ] Firefox（最新版本）
   - [ ] Edge（最新版本）

3. **响应式测试**
   - [ ] 移动端（375px - 428px）
   - [ ] 平板（768px - 1024px）
   - [ ] 桌面（1280px+）

4. **主题测试**
   - [ ] 浅色主题显示正常
   - [ ] 深色主题显示正常
   - [ ] 主题切换平滑

5. **性能测试**
   - [ ] 页面加载时间 < 3 秒
   - [ ] 动画流畅（60fps）
   - [ ] 无内存泄漏

### 构建测试

```bash
# 开发环境
npm run dev

# 生产构建
npm run build

# 检查构建产物
npm start

# 代码检查
npm run lint
```

## 文档规范

### 代码注释

- **函数注释** - 使用 JSDoc 格式
- **复杂逻辑** - 添加行内注释说明
- **TODO** - 使用 `// TODO:` 标记待办事项

```typescript
/**
 * 并行搜索视频
 * @param query - 搜索关键词
 * @param sources - 视频源列表
 * @returns 搜索结果数组
 */
async function searchVideos(
  query: string,
  sources: VideoSource[]
): Promise<SearchResult[]> {
  // TODO: 添加缓存机制
  const results = await Promise.all(
    sources.map(source => fetchFromSource(source, query))
  );
  
  return results.filter(Boolean);
}
```

### README 更新

如果您的更改影响到以下内容，请更新 README：

- 添加新功能
- 修改安装步骤
- 更新依赖项
- 添加新的 API

## Pull Request 指南

### PR 标题

遵循 Conventional Commits 格式：

```
feat(search): 添加实时流式搜索功能
fix(player): 修复视频加载失败问题
docs(readme): 更新安装步骤
ui(card): 优化卡片悬停效果
```

### PR 描述模板

```markdown
## 变更类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 性能优化
- [ ] 重构
- [ ] 文档更新
- [ ] UI/UX 改进

## 变更描述
[清晰描述您做了什么改动]

## 相关 Issue
Closes #[issue 编号]

## 测试
- [ ] 本地测试通过
- [ ] 多浏览器测试
- [ ] 响应式测试
- [ ] 主题切换测试

## 截图
[如果是 UI 改动，添加前后对比截图]

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 已添加必要的注释
- [ ] 已更新相关文档
- [ ] 无 ESLint 警告
- [ ] 通过所有测试
- [ ] UI 符合 Liquid Glass 设计规范
```

### 代码审查

PR 提交后，维护者会进行代码审查。请：

- 及时回复审查意见
- 根据反馈修改代码
- 保持讨论友好和专业
- 学习和理解审查意见

## 获得帮助

如果您在贡献过程中遇到问题：

1. **查看文档** - 阅读 README 和本贡献指南
2. **搜索 Issues** - 查看是否有类似问题
3. **提问** - 在 [GitHub Discussions](https://github.com/KuekHaoYang/kvideo/discussions) 提问
4. **联系维护者** - 通过 Issues 联系项目维护者

## 致谢

感谢所有为 KVideo 做出贡献的开发者！您的努力让这个项目变得更好。

---

<p align="center">
  再次感谢您的贡献！✨<br>
  让我们一起打造最优雅的视频聚合平台
</p>
