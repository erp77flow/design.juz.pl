import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const managerCss = `
  :root {
    --juz-manager-primary: #6f35f2;
    --juz-manager-primary-soft: #f3edff;
    --juz-manager-ink: #111827;
    --juz-manager-muted: #48546a;
  }

  [data-nodetype="component"].sidebar-item,
  [data-nodetype="group"].sidebar-item,
  [data-nodetype="story"].sidebar-item,
  [data-nodetype="document"].sidebar-item {
    border-radius: 8px !important;
    min-height: 36px !important;
  }

  .sidebar-item[data-highlightable="true"]:not([data-selected="true"]):hover,
  .sidebar-item[data-highlightable="true"]:not([data-selected="true"]):focus-visible {
    background: var(--juz-manager-primary-soft) !important;
    color: var(--juz-manager-primary) !important;
  }

  .sidebar-item[data-selected="true"] {
    background: var(--juz-manager-primary) !important;
    color: #ffffff !important;
    box-shadow: 0 8px 20px rgba(111, 53, 242, 0.18) !important;
  }

  .sidebar-item[data-selected="true"] a,
  .sidebar-item[data-selected="true"] button,
  .sidebar-item[data-selected="true"] span,
  .sidebar-item[data-selected="true"] svg {
    color: #ffffff !important;
  }

  .sidebar-item[data-selected="true"] svg {
    fill: none !important;
    stroke: currentColor !important;
  }

  .sidebar-item[data-nodetype="component"][aria-expanded="true"]:not([data-selected="true"]),
  .sidebar-item[data-nodetype="group"][aria-expanded="true"]:not([data-selected="true"]) {
    background: #f5f0ff !important;
    color: var(--juz-manager-primary) !important;
  }

  .sidebar-subheading,
  .sidebar-subheading button {
    color: #667085 !important;
    letter-spacing: 0.18em !important;
  }
`;

const style = document.createElement("style");
style.setAttribute("data-juz-manager-theme", "true");
style.textContent = managerCss;
document.head.appendChild(style);

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "juz.pl | Design System",
    brandUrl: "https://github.com/juzpl/DesignSystem",
    brandImage: "./logo.svg",
    brandTarget: "_blank",
    colorPrimary: "#6f35f2",
    colorSecondary: "#6f35f2",
    appBg: "#f7f5fc",
    appContentBg: "#ffffff",
    appBorderColor: "#e3dfec",
    appBorderRadius: 8,
    barBg: "#ffffff",
    barSelectedColor: "#6f35f2",
    barTextColor: "#48546a",
    inputBg: "#ffffff",
    inputBorder: "#d9d3e8",
    inputTextColor: "#111827",
    inputBorderRadius: 8,
    textColor: "#111827",
    textInverseColor: "#ffffff",
    textMutedColor: "#6b7280"
  }),
  sidebar: {
    showRoots: true
  }
});
