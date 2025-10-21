// src/utils/withLoader.ts
import { Loader2 } from "lucide-react";

export function withLoader(callback: () => Promise<void> | void) {
  return async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;

    // Save original HTML
    const originalHTML = button.innerHTML;
    button.disabled = true;
    button.style.opacity = "0.7";
    button.style.cursor = "not-allowed";

    // Add loader icon
    button.innerHTML = `
      <span style="display: inline-flex; align-items: center; gap: 6px;">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="lucide lucide-loader2 animate-spin"
             width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Loading...
      </span>
    `;

    try {
      await callback();
    } finally {
      // Restore button content
      button.innerHTML = originalHTML;
      button.disabled = false;
      button.style.opacity = "1";
      button.style.cursor = "pointer";
    }
  };
}
