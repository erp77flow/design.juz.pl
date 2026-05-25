import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      source: {
        state: "open"
      }
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "AI Usage",
          "Foundations",
          "Atoms",
          "Molecules",
          "Patterns",
          "Layouts",
          "Screens"
        ]
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true
          }
        ]
      }
    }
  }
};

export default preview;
