// ContentGen-AI - Smart Content Generation Platform
// All logic: templates, generators, utilities

(function () {
  "use strict";

  // ─── DOM refs ───
  const topicInput = document.getElementById("topic");
  const typeSelect = document.getElementById("contentType");
  const industrySelect = document.getElementById("industry");
  const toneSelect = document.getElementById("tone");
  const generateBtn = document.getElementById("generateBtn");
  const copyBtn = document.getElementById("copyBtn");
  const exportBtn = document.getElementById("exportBtn");
  const outputEl = document.getElementById("output");
  const wordCountEl = document.getElementById("wordCount");
  const readTimeEl = document.getElementById("readTime");
  const charCountEl = document.getElementById("charCount");
  const toastEl = document.getElementById("toast");

  // ─── Industry-specific phrase banks ───
  const industryPhrases = {
    general: {
      intros: [
        "In today's fast-paced world,",
        "With the ever-evolving landscape of modern life,",
        "As we navigate the complexities of the 21st century,",
        "Now more than ever,",
      ],
      verbs: ["transform", "revolutionize", "reshape", "elevate", "redefine"],
      nouns: ["innovation", "progress", "excellence", "growth", "opportunity"],
      closings: [
        "The future is bright for those who embrace change.",
        "Now is the time to take action and make a difference.",
        "The possibilities are truly endless.",
      ],
    },
    tech: {
      intros: [
        "In the rapidly evolving tech landscape,",
        "As software eats the world,",
        "With breakthroughs in AI and cloud computing,",
        "At the intersection of code and creativity,",
      ],
      verbs: ["deploy", "scale", "architect", "optimize", "automate"],
      nouns: ["scalability", "throughput", "latency", "uptime", "throughput"],
      closings: [
        "Ship fast, iterate faster.",
        "The best time to build was yesterday. The second best time is now.",
        "Code is poetry — write yours deliberately.",
      ],
    },
    health: {
      intros: [
        "In the pursuit of better health outcomes,",
        "As patient-centered care becomes the standard,",
        "With new research emerging daily,",
        "The healthcare industry is undergoing a seismic shift,",
      ],
      verbs: ["diagnose", "treat", "prevent", "heal", "empower"],
      nouns: ["wellness", "patient outcomes", "clinical efficacy", "recovery", "vitality"],
      closings: [
        "Your health is your greatest investment.",
        "Prevention is always better than cure.",
        "Together, we can build a healthier future.",
      ],
    },
    finance: {
      intros: [
        "In today's dynamic financial markets,",
        "As global economies shift and adapt,",
        "With interest rates and inflation top of mind,",
        "Smart money management has never been more critical,",
      ],
      verbs: ["invest", "diversify", "compound", "leverage", "hedge"],
      nouns: ["ROI", "portfolio diversification", "capital appreciation", "liquidity", "yield"],
      closings: [
        "Start building wealth today — your future self will thank you.",
        "Financial freedom begins with a single informed decision.",
        "Don't wait for the perfect moment — make the moment perfect.",
      ],
    },
    ecommerce: {
      intros: [
        "In the booming world of online retail,",
        "As consumer expectations continue to soar,",
        "With e-commerce growing at record pace,",
        "Standing out in the digital marketplace requires,",
      ],
      verbs: ["convert", "engage", "delight", "ship", "upsell"],
      nouns: ["conversion rate", "customer lifetime value", "cart abandonment", "brand loyalty", "AOV"],
      closings: [
        "Your next customer is one click away.",
        "Great products deserve great experiences.",
        "Sell the transformation, not just the product.",
      ],
    },
    education: {
      intros: [
        "In the evolving landscape of education,",
        "As lifelong learning becomes essential,",
        "With new pedagogical approaches emerging,",
        "Education is the most powerful weapon for change,",
      ],
      verbs: ["teach", "inspire", "empower", "mentor", "cultivate"],
      nouns: ["knowledge", "critical thinking", "literacy", "curriculum design", "student engagement"],
      closings: [
        "Never stop learning — the world never stops teaching.",
        "Invest in education; the returns are immeasurable.",
        "Every expert was once a beginner.",
      ],
    },
    fitness: {
      intros: [
        "In the pursuit of peak physical performance,",
        "As the wellness movement gains momentum,",
        "With science-backed training methods,",
        "Your body is capable of incredible things,",
      ],
      verbs: ["train", "strengthen", "recover", "fuel", "push"],
      nouns: ["endurance", "flexibility", "muscle hypertrophy", "mindfulness", "nutrition"],
      closings: [
        "Consistency beats intensity every time.",
        "The only bad workout is the one you didn't do.",
        "Take care of your body — it's the only place you have to live.",
      ],
    },
    food: {
      intros: [
        "In the world of culinary excellence,",
        "As farm-to-table becomes the gold standard,",
        "With flavors from around the globe,",
        "Great food brings people together,",
      ],
      verbs: ["savor", "craft", "nourish", "flavor", "plate"],
      nouns: ["umami", "freshness", "craftsmanship", "presentation", "sustainability"],
      closings: [
        "Life is too short for bad food.",
        "Every meal is an opportunity to nourish body and soul.",
        "Cook with passion, eat with joy.",
      ],
    },
  };

  // ─── Tone modifiers ───
  const toneAdverbs = {
    professional: ["effectively", "strategically", "efficiently", "systematically"],
    casual: ["easily", "naturally", "honestly", "simply"],
    witty: ["brilliantly", "ridiculously", "hilariously", "surprisingly"],
    persuasive: ["undeniably", "compellingly", "powerfully", "convincingly"],
    informative: ["notably", "significantly", "remarkably", "importantly"],
  };

  const toneOpeners = {
    professional: "Let's examine the key aspects of this topic.",
    casual: "So, let's talk about this for a sec.",
    witty: "Buckle up — this is going to be fun.",
    persuasive: "You need to pay attention to this.",
    informative: "Here's what you need to know.",
  };

  // ─── Helpers ───
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickN(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, arr.length));
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function getPhrases(industry) {
    return industryPhrases[industry] || industryPhrases.general;
  }

  function updateStats(text) {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    wordCountEl.textContent = words + " words";
    charCountEl.textContent = chars + " chars";
    readTimeEl.textContent = minutes + " min read";
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), 2000);
  }

  // ─── Content Generators ───

  function generateBlogPost(topic, industry, tone) {
    const p = getPhrases(industry);
    const adv = pick(toneAdverbs[tone]);
    const sections = [];

    sections.push(`# ${topic}: A Comprehensive Guide\n`);
    sections.push(`${pick(p.intros)} understanding ${topic} has become essential. ${toneOpeners[tone]}\n`);

    // Section 1
    sections.push(`## What Is ${topic}?\n`);
    sections.push(`${capitalize(topic)} ${pick(p.verbs)}s the way we think about ${pick(p.nouns)}. At its core, it represents a fundamental shift in how ${industry === "general" ? "organizations" : industry + " professionals"} approach ${pick(p.nouns)}.\n`);
    sections.push(`Experts agree that ${topic} is ${adv} reshaping our understanding of ${pick(p.nouns)}. Whether you're a seasoned professional or just getting started, there's never been a better time to dive in.\n`);

    // Section 2
    sections.push(`## Why ${topic} Matters\n`);
    const reasons = pickN([
      `It drives measurable improvements in ${pick(p.nouns)}`,
      `Organizations that embrace it see up to ${Math.floor(Math.random() * 40 + 20)}% better outcomes`,
      `It creates a competitive advantage in ${pick(p.nouns)}`,
      `The ROI of investing in ${topic} is well-documented`,
      `Early adopters consistently outperform their peers`,
      `Consumer demand for ${topic}-related solutions is growing`,
    ], 3);
    sections.push("Here are the key reasons to pay attention:\n");
    reasons.forEach((r, i) => sections.push(`${i + 1}. **${r}**`));
    sections.push("");

    // Section 3
    sections.push(`## How to Get Started with ${topic}\n`);
    sections.push(`Implementing ${topic} doesn't have to be overwhelming. ${pick(p.intros).replace(",", "")}, here's a practical roadmap:\n`);
    const steps = pickN([
      `**Research:** Start by understanding the fundamentals of ${topic}`,
      `**Plan:** Define clear goals and success metrics`,
      `**Execute:** Take small, consistent steps toward implementation`,
      `**Measure:** Track your progress and iterate based on data`,
      `**Scale:** Once you've found what works, ${pick(p.verbs)} your approach`,
      `**Optimize:** Continuously refine based on feedback and results`,
    ], 4);
    steps.forEach((s, i) => sections.push(`**Step ${i + 1}:** ${s.replace(/\*\*.*?\*\*: /, "")}\n`));

    // Section 4
    sections.push(`## Common Mistakes to Avoid\n`);
    sections.push(`Even experienced professionals stumble when it comes to ${topic}. Watch out for these pitfalls:\n`);
    const mistakes = pickN([
      `Trying to do everything at once instead of focusing on incremental progress`,
      `Ignoring data and relying solely on intuition`,
      `Failing to align ${topic} initiatives with broader business goals`,
      `Neglecting to invest in proper training and resources`,
      `Copying competitors without adapting to your unique context`,
    ], 3);
    mistakes.forEach((m) => sections.push(`- ${m}`));
    sections.push("");

    // Conclusion
    sections.push(`## Final Thoughts\n`);
    sections.push(`${pick(p.closings)} ${capitalize(topic)} is not just a trend — it's a fundamental shift that ${pick(p.verbs)}s ${pick(p.nouns)} for the better.\n`);
    sections.push(`The key takeaway? Start small, stay consistent, and let ${topic} ${adv} ${pick(p.verbs)} your approach to ${pick(p.nouns)}. ${pick(p.closings)}`);

    return sections.join("\n");
  }

  function generateTweetThread(topic, industry, tone) {
    const p = getPhrases(industry);
    const adv = pick(toneAdverbs[tone]);
    const tweets = [];
    const count = Math.floor(Math.random() * 3) + 5; // 5-7 tweets

    tweets.push(`🧵 THREAD: Everything you need to know about ${topic}\n\n${pick(p.intros)} this matters more than you think.\n\n👇\n`);

    tweets.push(`1/ ${capitalize(topic)} is ${adv} ${pick(p.verbs)}ing the ${industry} space.\n\nHere's what most people miss about ${pick(p.nouns)}...`);
    tweets.push(`2/ The biggest myth? That ${topic} is only for experts.\n\nIn reality, anyone can leverage ${pick(p.nouns)} to ${pick(p.verbs)} their results.`);
    tweets.push(`3/ Key stat: ${Math.floor(Math.random() * 60 + 30)}% of professionals say ${topic} has directly improved their ${pick(p.nouns)}.\n\nThe data doesn't lie.`);
    tweets.push(`4/ Pro tip: Start with the basics.\n\nFocus on ${pick(p.nouns)} first, then ${pick(p.verbs)} from there. Most people try to skip this step.`);
    tweets.push(`5/ One thing I've learned about ${topic}:\n\n${capitalize(pick(p.closings))}`);
    tweets.push(`6/ ${pick(p.intros)} ${topic} will only grow in importance.\n\nThose who invest in understanding it now will ${adv} ${pick(p.verbs)} their ${pick(p.nouns)}.`);

    if (count >= 7) {
      tweets.push(`7/ TL;DR:\n\n• ${capitalize(topic)} is here to stay\n• Start small, think big\n• Focus on ${pick(p.nouns)}\n• ${pick(p.closings)}\n\n♻️ RT if this was helpful!`);
    } else {
      tweets[tweets.length - 1] += `\n\n♻️ RT if this was helpful!`;
    }

    return tweets.slice(0, count).join("\n\n---\n\n");
  }

  function generateEmail(topic, industry, tone) {
    const p = getPhrases(industry);
    const adv = pick(toneAdverbs[tone]);
    const lines = [];

    const subjects = [
      `🚀 ${capitalize(topic)}: What You Need to Know Right Now`,
      `Don't Miss This: ${capitalize(topic)} Insights Inside`,
      `Your Guide to ${capitalize(topic)} Is Here`,
      `[Exclusive] Unlock the Power of ${capitalize(topic)}`,
    ];

    lines.push(`**Subject:** ${pick(subjects)}\n`);
    lines.push(`---\n`);
    lines.push(`Hi [First Name],\n`);
    lines.push(`${pick(p.intros)} I wanted to share something exciting about ${topic}.\n`);
    lines.push(`${toneOpeners[tone]}\n`);
    lines.push(`**Here's the deal:**\n`);
    lines.push(`${capitalize(topic)} is ${adv} ${pick(p.verbs)}ing how ${industry === "general" ? "businesses" : industry + " organizations"} approach ${pick(p.nouns)}. And the numbers back it up:\n`);
    lines.push(`- ${Math.floor(Math.random() * 50 + 30)}% improvement in ${pick(p.nouns)}`);
    lines.push(`- ${Math.floor(Math.random() * 3 + 2)}x faster ${pick(p.verbs)} cycles`);
    lines.push(`- Measurable impact on ${pick(p.nouns)} within ${Math.floor(Math.random() * 4 + 2)} weeks\n`);
    lines.push(`**What makes this different?**\n`);
    lines.push(`Unlike other approaches to ${topic}, our method focuses on ${pick(p.nouns)} first, ensuring you ${adv} ${pick(p.verbs)} your results from day one.\n`);
    lines.push(`**[CTA Button: Learn More About ${capitalize(topic)}]**\n`);
    lines.push(`Don't just take my word for it — ${pick(p.closings).toLowerCase()}\n`);
    lines.push(`To your success,`);
    lines.push(`[Your Name]`);
    lines.push(`[Company / Brand]\n`);
    lines.push(`P.S. — ${pick(["Limited spots available!", "This offer expires soon.", "Reply to this email with questions — I read every one.", "Forward this to someone who needs it."])}`);

    return lines.join("\n");
  }

  function generateProductDescription(topic, industry, tone) {
    const p = getPhrases(industry);
    const adv = pick(toneAdverbs[tone]);
    const lines = [];
    const price = (Math.random() * 150 + 19.99).toFixed(2);

    lines.push(`# ${capitalize(topic)} — ${pick(["Premium", "Ultimate", "Essential", "Pro", "Elite"])} Edition\n`);
    lines.push(`${pick(p.intros)} introducing the ${capitalize(topic)}: a game-changer in ${industry === "general" ? "its category" : industry}.\n`);
    lines.push(`---\n`);
    lines.push(`## ✨ Key Features\n`);
    const features = pickN([
      `${pick(["Advanced", "Smart", "Intuitive", "Powerful"])} ${pick(p.nouns)} engine`,
      `Designed to ${adv} ${pick(p.verbs)} your workflow`,
      `Built with ${pick(["premium", "sustainable", "high-quality", "cutting-edge"])} materials`,
      `Optimized for ${pick(p.nouns)} and ${pick(p.nouns)}`,
      `${pick(["Seamless", "Instant", "Effortless"])} integration with your existing tools`,
      `${Math.floor(Math.random() * 50 + 10)}+ five-star reviews from real customers`,
    ], 5);
    features.forEach((f) => lines.push(`- ✅ ${f}`));

    lines.push(`\n## 📦 What's Included\n`);
    lines.push(`- 1x ${capitalize(topic)} unit`);
    lines.push(`- Quick-start guide`);
    lines.push(`- Lifetime access to updates`);
    lines.push(`- ${pick(["Bonus template pack", "Premium support", "Free accessory kit", "Exclusive community access"])}\n`);

    lines.push(`## 💬 What Customers Say\n`);
    lines.push(`> "${pick(["This completely changed how I", "I can't believe how much better my", "Best investment I've made for my"])} ${pick(p.verbs)} my ${pick(p.nouns)}. ${pick(["Highly recommend!", "10/10!", "Worth every penny.", "A must-have."])}" — **${pick(["Alex", "Jordan", "Sam", "Taylor", "Morgan"])} M.**\n`);

    lines.push(`---\n`);
    lines.push(`**💰 Price: $${price}** ~~$${(parseFloat(price) * 1.5).toFixed(2)}~~\n`);
    lines.push(`**[🛒 Add to Cart]**\n`);
    lines.push(`${pick(p.closings)}`);

    return lines.join("\n");
  }

  function generateReadme(topic, industry, tone) {
    const p = getPhrases(industry);
    const lines = [];
    const repoName = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    lines.push(`# ${capitalize(topic)}\n`);
    lines.push(`> ${pick(p.intros)} this project ${pick(p.verbs)}s ${pick(p.nouns)} for ${industry === "general" ? "developers" : industry + " professionals"}.\n`);
    lines.push(`[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)`);
    lines.push(`[![Version](https://img.shields.io/badge/version-${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}-green.svg)]()\n`);

    lines.push(`## 📋 Table of Contents\n`);
    lines.push(`- [About](#about)`);
    lines.push(`- [Features](#features)`);
    lines.push(`- [Installation](#installation)`);
    lines.push(`- [Usage](#usage)`);
    lines.push(`- [Contributing](#contributing)`);
    lines.push(`- [License](#license)\n`);

    lines.push(`## 🚀 About\n`);
    lines.push(`${capitalize(topic)} is an open-source tool designed to ${pick(p.verbs)} ${pick(p.nouns)}. It provides a robust, scalable foundation for building ${industry === "general" ? "modern applications" : industry + " solutions"}.\n`);

    lines.push(`## ✨ Features\n`);
    const features = pickN([
      `⚡ Lightning-fast ${pick(p.nouns)}`,
      `🔒 Enterprise-grade security`,
      `📱 Responsive and accessible design`,
      `🔌 Easy integration with existing tools`,
      `📊 Built-in analytics and reporting`,
      `🌍 Multi-language support`,
      `🎨 Customizable themes and layouts`,
    ], 5);
    features.forEach((f) => lines.push(`- ${f}`));

    lines.push(`\n## 🛠️ Installation\n`);
    lines.push("```bash");
    lines.push(`# Clone the repository`);
    lines.push(`git clone https://github.com/username/${repoName}.git`);
    lines.push(`cd ${repoName}`);
    lines.push("");
    lines.push(`# Install dependencies`);
    lines.push(`npm install`);
    lines.push("");
    lines.push(`# Start the development server`);
    lines.push(`npm run dev`);
    lines.push("```\n");

    lines.push(`## 📖 Usage\n`);
    lines.push("```javascript");
    lines.push(`import { ${repoName.replace(/-/g, "")} } from '${repoName}';\n`);
    lines.push(`// Initialize`);
    lines.push(`const app = new ${capitalize(topic).replace(/\s+/g, "")}({`);
    lines.push(`  mode: 'production',`);
    lines.push(`  debug: false`);
    lines.push(`});\n`);
    lines.push(`// Generate results`);
    lines.push(`const result = app.${pick(p.verbs)}({ input: 'your-data' });`);
    lines.push(`console.log(result);`);
    lines.push("```\n");

    lines.push(`## 🤝 Contributing\n`);
    lines.push(`Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a PR.\n`);
    lines.push(`1. Fork the repository`);
    lines.push(`2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)`);
    lines.push(`3. Commit your changes (\`git commit -m 'Add amazing feature'\`)`);
    lines.push(`4. Push to the branch (\`git push origin feature/amazing-feature\`)`);
    lines.push(`5. Open a Pull Request\n`);

    lines.push(`## 📄 License\n`);
    lines.push(`This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.\n`);
    lines.push(`---\n`);
    lines.push(`*${pick(p.closings)}*`);

    return lines.join("\n");
  }

  // ─── Master generator ───
  const generators = {
    blog: generateBlogPost,
    tweet: generateTweetThread,
    email: generateEmail,
    product: generateProductDescription,
    readme: generateReadme,
  };

  function generate() {
    const topic = topicInput.value.trim();
    if (!topic) {
      topicInput.focus();
      showToast("⚠️ Please enter a topic!");
      return;
    }

    const type = typeSelect.value;
    const industry = industrySelect.value;
    const tone = toneSelect.value;

    generateBtn.disabled = true;
    generateBtn.textContent = "⏳ Generating...";

    // Simulate brief generation delay for UX
    setTimeout(() => {
      const content = generators[type](topic, industry, tone);
      outputEl.textContent = content;
      updateStats(content);

      generateBtn.disabled = false;
      generateBtn.textContent = "🚀 Generate Content";
      showToast("✅ Content generated!");
    }, 400);
  }

  // ─── Copy to clipboard ───
  function copyToClipboard() {
    const text = outputEl.textContent;
    if (!text || text.includes("Your generated content will appear here")) {
      showToast("⚠️ Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      showToast("📋 Copied to clipboard!");
    }).catch(() => {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast("📋 Copied to clipboard!");
    });
  }

  // ─── Export as .md file ───
  function exportMarkdown() {
    const text = outputEl.textContent;
    if (!text || text.includes("Your generated content will appear here")) {
      showToast("⚠️ Nothing to export!");
      return;
    }
    const topic = topicInput.value.trim().replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "content";
    const type = typeSelect.value;
    const filename = `${topic}-${type}.md`;

    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`💾 Exported as ${filename}`);
  }

  // ─── Event listeners ───
  generateBtn.addEventListener("click", generate);
  copyBtn.addEventListener("click", copyToClipboard);
  exportBtn.addEventListener("click", exportMarkdown);

  // Generate on Enter in topic field
  topicInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") generate();
  });
})();
