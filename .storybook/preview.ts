import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/styles/globals.css";

const preview: Preview = {
  decorators: [
    // Adds a "Theme" toggle to the Storybook toolbar. Switches the `dark`
    // class on the <html> element, which our globals.css picks up via
    // `:root.dark`.
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
      parentSelector: "html",
    }),
  ],
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
