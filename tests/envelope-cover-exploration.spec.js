// @ts-check
const { test, expect } = require('@playwright/test');
const { execSync, spawn } = require('child_process');
const path = require('path');
const net = require('net');

/**
 * Bug Condition Exploration Test — Envelope Cover Visual Composition Defects
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6**
 *
 * This test encodes the EXPECTED (fixed) behavior as assertions.
 * On UNFIXED code, these assertions should FAIL — confirming the defects exist.
 * After the fix is applied, re-running this test should PASS.
 */

const PROJECT_DIR = path.resolve(__dirname, '..');
const VIEWPORT = { width: 400, height: 718 };

/** Find an available port */
function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', reject);
  });
}

let serverProcess;
let serverPort;

test.beforeAll(async () => {
  serverPort = await getAvailablePort();
  serverProcess = spawn('python3', ['-m', 'http.server', String(serverPort), '--bind', '127.0.0.1'], {
    cwd: PROJECT_DIR,
    stdio: 'ignore',
  });
  // Wait for server to be ready
  await new Promise((resolve) => setTimeout(resolve, 1500));
});

test.afterAll(async () => {
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
});

test.describe('Envelope Cover Bug Condition Exploration', () => {
  /**
   * Property 1: Bug Condition — Envelope Cover Visual Composition Defects
   *
   * Each sub-test encodes one expected behavior. On unfixed code, these should FAIL,
   * proving the corresponding defect exists.
   */

  test('Defect 1.1: Poster rendered height should be at least 75% of viewport height (538.5px)', async ({ page }) => {
    /**
     * **Validates: Requirements 1.1**
     * Bug condition: .envelope-cover__poster rendered height < 75% of viewport (718 * 0.75 = 538.5px)
     * Expected behavior: poster fills 75-85% of viewport height
     */
    await page.setViewportSize(VIEWPORT);
    await page.goto(`http://127.0.0.1:${serverPort}/index.html`, { waitUntil: 'networkidle' });
    // Wait for loader to dismiss
    await page.waitForSelector('#loader.is-hidden', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    const posterBox = await page.locator('.envelope-cover__poster').boundingBox();
    expect(posterBox).not.toBeNull();

    const posterHeight = posterBox.height;
    const threshold = VIEWPORT.height * 0.75; // 538.5px

    // EXPECTED (fixed) behavior: poster height >= 75% of viewport
    expect(posterHeight).toBeGreaterThanOrEqual(threshold);
  });

  test('Defect 1.2: Invitation text should NOT have static position (should be absolute/overlaid)', async ({ page }) => {
    /**
     * **Validates: Requirements 1.2**
     * Bug condition: .envelope-cover__text computed position is "static"
     * Expected behavior: text is position: absolute, overlaying the poster
     */
    await page.setViewportSize(VIEWPORT);
    await page.goto(`http://127.0.0.1:${serverPort}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#loader.is-hidden', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    const textPosition = await page.locator('.envelope-cover__text').evaluate((el) => {
      return window.getComputedStyle(el).position;
    });

    // EXPECTED (fixed) behavior: text is NOT static — it should overlay the poster
    expect(textPosition).not.toBe('static');
  });

  test('Defect 1.3: Initials font-size should be at least 64px (4rem)', async ({ page }) => {
    /**
     * **Validates: Requirements 1.3**
     * Bug condition: .envelope-cover__initials computed font-size < 64px
     * Expected behavior: initials at clamp(3rem, 12vw, 5rem) — at 400px width, 12vw = 48px, clamped to min 48px (3rem)
     * At 400px, we expect at least 64px (4rem threshold from the spec)
     */
    await page.setViewportSize(VIEWPORT);
    await page.goto(`http://127.0.0.1:${serverPort}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#loader.is-hidden', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    const fontSizeStr = await page.locator('.envelope-cover__initials').evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });
    const fontSize = parseFloat(fontSizeStr);

    // EXPECTED (fixed) behavior: initials font-size >= 64px (4rem)
    expect(fontSize).toBeGreaterThanOrEqual(64);
  });

  test('Defect 1.4: Corner elements should contain SVG children (not just CSS pseudo-elements)', async ({ page }) => {
    /**
     * **Validates: Requirements 1.4**
     * Bug condition: .envelope-cover__corner has no SVG child elements
     * Expected behavior: corners have inline SVG elements with ornamental paths
     */
    await page.setViewportSize(VIEWPORT);
    await page.goto(`http://127.0.0.1:${serverPort}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#loader.is-hidden', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    const svgCount = await page.evaluate(() => {
      const corners = document.querySelectorAll('.envelope-cover__corner');
      let count = 0;
      corners.forEach((corner) => {
        count += corner.querySelectorAll('svg').length;
      });
      return count;
    });

    // EXPECTED (fixed) behavior: at least one SVG child across corner elements
    expect(svgCount).toBeGreaterThan(0);
  });

  test('Defect 1.5: Envelope cover background should have more than one gradient layer', async ({ page }) => {
    /**
     * **Validates: Requirements 1.5**
     * Bug condition: .envelope-cover background contains only one gradient layer
     * Expected behavior: warm layered background with multiple gradients
     */
    await page.setViewportSize(VIEWPORT);
    await page.goto(`http://127.0.0.1:${serverPort}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#loader.is-hidden', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    const backgroundImage = await page.locator('.envelope-cover').evaluate((el) => {
      return window.getComputedStyle(el).backgroundImage;
    });

    // Count gradient layers by splitting on gradient functions
    // The background-image value contains comma-separated gradient functions
    const gradientMatches = backgroundImage.match(/(linear-gradient|radial-gradient|conic-gradient)\(/g);
    const gradientCount = gradientMatches ? gradientMatches.length : 0;

    // EXPECTED (fixed) behavior: more than one gradient layer
    expect(gradientCount).toBeGreaterThan(1);
  });

  test('Defect 1.6: Inner container max-width should be greater than 480px', async ({ page }) => {
    /**
     * **Validates: Requirements 1.6**
     * Bug condition: .envelope-cover__inner max-width is 480px or less
     * Expected behavior: wider composition, max-width > 480px or none
     */
    await page.setViewportSize(VIEWPORT);
    await page.goto(`http://127.0.0.1:${serverPort}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#loader.is-hidden', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    const maxWidthStr = await page.locator('.envelope-cover__inner').evaluate((el) => {
      return window.getComputedStyle(el).maxWidth;
    });

    // "none" means no constraint — that's valid (passes)
    if (maxWidthStr === 'none') {
      return; // No max-width constraint means it's wide enough
    }

    const maxWidth = parseFloat(maxWidthStr);

    // EXPECTED (fixed) behavior: max-width > 480px
    expect(maxWidth).toBeGreaterThan(480);
  });
});
