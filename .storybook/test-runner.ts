import type { TestRunnerConfig } from "@storybook/test-runner";
import { getStoryContext, waitForPageReady } from "@storybook/test-runner";
import { AxeBuilder } from "@axe-core/playwright";

/**
 * Storybook test-runner config that runs axe-core against every story
 * after it finishes rendering (and any play function completes).
 *
 * Per-story / per-component overrides live in `preview.ts` /
 * individual story `parameters.a11y`. Here we just read those and feed
 * them into the AxeBuilder. By default we enforce WCAG 2A + 2AA tags.
 *
 * To skip a11y on a single story, set `parameters.a11y.disable = true`
 * (Storybook's addon-a11y convention) on that story.
 *
 * Reference:
 *   https://storybook.js.org/docs/writing-tests/accessibility-testing
 *   https://github.com/storybookjs/test-runner#axe-integration
 */
const config: TestRunnerConfig = {
  async postVisit(page, context) {
    // Wait for the story (including any play function + async UI work)
    // to settle before snapshotting the DOM for axe.
    await waitForPageReady(page);

    const storyContext = await getStoryContext(page, context);

    // Honour the addon-a11y "disable" escape hatch on a per-story basis.
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    const a11yParameters = storyContext.parameters?.a11y ?? {};
    const axeConfig = a11yParameters.config;
    const axeOptions = a11yParameters.options ?? {};

    const builder = new AxeBuilder({ page })
      // Scope to Storybook's rendered story root so we don't audit
      // Storybook's own chrome.
      .include("#storybook-root")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);

    if (axeConfig) {
      // Forward any project-level rule tweaks (see `preview.ts`
      // parameters.a11y.config.rules).
      // @ts-expect-error -- axe-core's RunOptions/AxeConfiguration shapes
      // overlap but aren't structurally identical to Storybook's typing.
      builder.options(axeOptions);
      // axe-core's `configure` accepts the same shape that's in preview.ts.
      // AxeBuilder doesn't expose `.configure()` directly, so merge the
      // rules into options if present.
      if (axeConfig.rules) {
        const rules: Record<string, { enabled: boolean }> = {};
        for (const rule of axeConfig.rules) {
          rules[rule.id] = { enabled: rule.enabled !== false };
        }
        builder.options({ ...axeOptions, rules });
      }
    }

    const results = await builder.analyze();

    if (results.violations.length > 0) {
      const formatted = results.violations
        .map((v) => {
          const nodes = v.nodes
            .map((n) => `      - ${n.target.join(" ")}\n        ${n.failureSummary?.replace(/\n/g, "\n        ")}`)
            .join("\n");
          return `  [${v.impact ?? "n/a"}] ${v.id}: ${v.help}\n    ${v.helpUrl}\n${nodes}`;
        })
        .join("\n\n");

      throw new Error(
        `Accessibility violations found in story "${context.title} / ${context.name}":\n\n${formatted}\n`,
      );
    }
  },
};

export default config;
