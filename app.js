// ContentGen AI — app.js

let currentFormat = 'blog';

const generatedContent = {
    blog: `Artificial intelligence agents are fundamentally reshaping how software is conceived, built, and maintained. Unlike traditional automation tools, AI agents operate with a degree of autonomy that was previously unimaginable.

## The Rise of Autonomous Development

Modern AI agents can understand complex codebases, identify patterns, and generate production-quality code with minimal human intervention. They don't just autocomplete — they reason about architecture, consider edge cases, and suggest improvements.

## Key Transformations

**1. Intelligent Code Generation**
AI agents can translate natural language requirements into functional code, complete with tests and documentation. This dramatically reduces the time from concept to implementation.

**2. Automated Code Review**
Rather than waiting for human reviewers, AI agents can perform real-time code analysis, catching bugs, security vulnerabilities, and performance issues before they reach production.

**3. Self-Healing Systems**
Perhaps most remarkably, AI agents can monitor deployed systems, detect anomalies, and autonomously apply fixes — turning the dream of self-healing software into reality.

## The Human Element

Despite these advances, the role of human developers remains crucial. AI agents excel at execution and pattern recognition, but human creativity, empathy, and strategic thinking are irreplaceable. The future lies in collaboration, not replacement.

## Looking Ahead

As AI agents become more sophisticated, we'll see a fundamental shift in what it means to be a software developer. The emphasis will move from writing code to guiding AI, from implementing features to defining vision.`,
    social: `🤖 AI agents aren't just tools — they're becoming teammates.

The future of software development isn't about replacing developers. It's about amplifying them.

Here's what AI agents can already do:
→ Write production-quality code
→ Review and fix bugs automatically
→ Monitor and heal systems in real-time
→ Test, deploy, and iterate

But here's the thing nobody talks about:

The best results come from human + AI collaboration, not full automation.

The developers who thrive will be those who learn to work WITH AI agents, not against them.

#AI #SoftwareEngineering #DevTools #FutureOfTech`,
    email: `Subject: How AI Agents Are Transforming Our Development Workflow

Hi [Name],

I wanted to share some exciting developments in how AI agents are changing the software development landscape.

Our team has been testing AI-powered development agents, and the results have been impressive:

• 40% reduction in time from concept to deployment
• 60% fewer bugs reaching production
• 3x improvement in code review throughput

The key insight? These agents don't replace developers — they handle the routine work so our engineers can focus on architecture, innovation, and solving complex problems.

I'd love to walk you through a demo. Are you available this week for a quick 15-minute call?

Best regards,
[Your Name]`,
    ad: `🚀 Build Software 10x Faster with AI Agents

Stop writing boilerplate. Start building what matters.

Our AI Development Agent handles:
✅ Code generation from plain English
✅ Automatic bug detection & fixing
✅ Real-time code review
✅ Self-healing production systems

Join 10,000+ developers already shipping faster.

→ Start Free Trial

"Transformed how our team builds software." — TechCrunch`,
    technical: `# Architecture: Multi-Agent Software Development System

## System Overview

This document describes the architecture of an AI-agent-powered software development pipeline, designed for autonomous code generation, review, and deployment.

## Agent Components

### 1. Code Generation Agent (CGA)
- **Input**: Natural language specifications, API contracts
- **Model**: MiMo V2.5 (fine-tuned for code generation)
- **Output**: Production-ready source code with unit tests
- **Context Window**: 128K tokens

### 2. Review Agent (RA)
- **Input**: Pull request diffs, code context
- **Model**: MiMo V2.5 with specialized security training
- **Output**: Structured review with severity-scored findings
- **Integration**: GitHub/GitLab webhooks

### 3. Test Agent (TA)
- **Input**: Source code, acceptance criteria
- **Model**: MiMo V2.5 with test generation training
- **Output**: Test suites (unit, integration, e2e)
- **Coverage Target**: ≥90% branch coverage

## Pipeline Flow

\`\`\`
Spec → CGA → RA → TA → CI/CD → Deploy
          ↑      ↑
          └──────┘ (feedback loop)
\`\`\`

## Deployment

The system runs on Kubernetes with auto-scaling:
- Minimum replicas: 3
- Maximum replicas: 50
- GPU allocation: NVIDIA A100 per agent node`
};

const aiSuggestions = {
    rephrase: "Here's a rephrased version:\n\nAI agents represent a paradigm shift in software development. Rather than simply automating tasks, they bring a new level of cognitive capability to the development process, enabling autonomous decision-making and adaptive problem-solving.",
    expand: "Here's an expanded version:\n\nThe emergence of AI agents in software development marks a pivotal moment in the history of computing. These intelligent systems, powered by large language models like MiMo V2.5, can understand context, reason about complex systems, and generate solutions that rival human-quality code. Their impact spans the entire software lifecycle, from initial design through deployment and maintenance.",
    summarize: "Key takeaways:\n\n• AI agents can autonomously write, review, and test code\n• Human-AI collaboration produces the best outcomes\n• Self-healing systems are becoming a reality\n• The developer role is evolving from code-writing to AI-guiding",
    improve: "Suggested improvements:\n\n1. Add specific statistics or case studies to support claims\n2. Include a concrete example of an AI agent workflow\n3. Add a comparison table of before/after AI agent adoption\n4. Include a 'getting started' section for readers\n5. Reference specific tools or platforms in the ecosystem"
};

const templates = {
    intro: "In the ever-evolving landscape of software development, a new paradigm is emerging that promises to fundamentally change how we build, deploy, and maintain software systems.",
    cta: "Ready to experience the future of development? Start your free trial today and join thousands of developers who are already building smarter, shipping faster, and creating better software with AI agents.",
    conclusion: "The age of AI-powered development is here, and it's only getting started. The developers and organizations that embrace these tools today will have a significant advantage tomorrow. The question isn't whether AI agents will transform software development — it's whether you'll be ready when they do.",
    hook: "What if your code could write itself? Not in theory, not in demos — but in production, at scale, with human-level quality. That's no longer science fiction.",
    listicle: "Here are the top 5 ways AI agents are transforming software development:\n\n1. **Autonomous Code Generation** — From spec to code in minutes, not months\n2. **Intelligent Bug Detection** — Catching issues before they reach production\n3. **Automated Code Reviews** — Every PR reviewed with expert-level analysis\n4. **Self-Healing Systems** — Production issues fixed before users notice\n5. **Continuous Learning** — Agents that improve with every interaction"
};

function updateWordCount() {
    const text = document.getElementById('editor').value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const readTime = Math.max(1, Math.ceil(words / 200));

    document.getElementById('wordCount').textContent = words;
    document.getElementById('charCount').textContent = chars;
    document.getElementById('readTime').textContent = readTime + ' min read';
}

function updateLineNumbers() {
    const text = document.getElementById('editor').value;
    const lines = Math.max(text.split('\n').length, 20);
    const gutter = document.getElementById('lineNumbers');
    gutter.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

function generateContent() {
    const btn = document.getElementById('generateBtn');
    const editor = document.getElementById('editor');
    btn.textContent = '⏳ Generating...';
    btn.disabled = true;

    setTimeout(() => {
        editor.value = generatedContent[currentFormat] || generatedContent.blog;
        updateWordCount();
        updateLineNumbers();
        btn.textContent = '✨ Generate';
        btn.disabled = false;
    }, 1500);
}

function showSuggestion(type) {
    const output = document.getElementById('aiOutput');
    const text = generatedContent[currentFormat] || '';
    if (!text.trim()) {
        output.innerHTML = '<div class="ai-placeholder">Generate content first to get suggestions.</div>';
        return;
    }
    output.innerHTML = aiSuggestions[type] || 'Processing...';
}

function insertTemplate(type) {
    const editor = document.getElementById('editor');
    const template = templates[type];
    if (template) {
        editor.value = editor.value ? editor.value + '\n\n' + template : template;
        updateWordCount();
        updateLineNumbers();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');

    editor.addEventListener('input', () => {
        updateWordCount();
        updateLineNumbers();
    });

    // Format tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFormat = tab.dataset.format;
        });
    });

    // Generate
    document.getElementById('generateBtn').addEventListener('click', generateContent);

    // Suggestion buttons
    document.getElementById('rephraseBtn').addEventListener('click', () => showSuggestion('rephrase'));
    document.getElementById('expandBtn').addEventListener('click', () => showSuggestion('expand'));
    document.getElementById('summarizeBtn').addEventListener('click', () => showSuggestion('summarize'));
    document.getElementById('improveBtn').addEventListener('click', () => showSuggestion('improve'));

    // Templates
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', () => insertTemplate(btn.dataset.template));
    });

    // Copy
    document.getElementById('copyBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(editor.value).then(() => {
            const btn = document.getElementById('copyBtn');
            btn.textContent = '✓ Copied!';
            setTimeout(() => { btn.textContent = '📋 Copy'; }, 1500);
        });
    });

    // Clear
    document.getElementById('clearBtn').addEventListener('click', () => {
        editor.value = '';
        updateWordCount();
        updateLineNumbers();
    });

    // Export
    document.getElementById('exportBtn').addEventListener('click', () => {
        const blob = new Blob([editor.value], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contentgen-${currentFormat}-${Date.now()}.md`;
        a.click();
        URL.revokeObjectURL(url);
    });

    updateLineNumbers();
});
