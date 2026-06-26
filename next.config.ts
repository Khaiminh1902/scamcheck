import type { NextConfig } from "next";
import { execSync } from "child_process";

const commitTime = (() => {
  try {
    return execSync(
      'git log -1 --date=format:"%d.%m.%Y (%H:%M)" --format="%ad"',
    )
      .toString()
      .trim();
  } catch {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} (${pad(d.getHours())}:${pad(d.getMinutes())})`;
  }
})();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: `v${commitTime}`,
  },
};

export default nextConfig;
