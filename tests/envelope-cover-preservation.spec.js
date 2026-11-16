// @ts-check
const { test, expect } = require('@playwright/test');
const { spawn } = require('child_process');
const path = require('path');
const net = require('net');

/**
 * Preservation Property Tests — Seal Animation, Skip Button, and Post-Dismissal Behavior
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**
 *
 * These tests verify the existing interactive behavior works correctly on UNFIXED code,
 * establishing a baseline. They should PASS before any fixes are applied, and continue
 * to PASS after the fix — confirming no regressions.
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

/**
 * Helper: navigate to the page and wait for the loader to dismiss,
 * leaving the envelope cover visible and ready for interaction.
 */
async function loadPageAndWaitForLoader(page) {
  await page.setViewportSize(VIEWPORT);
  await page.goto(`http://127.0.0.1:${serverPort}/index.html`, { waitUntil: 'networkidle' });
  // Wait for loader to dismiss
  await page.waitForSelector('#loader.is-hidden', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(500);
}

/**
 * Helper: wait for envelope cover dismissal animation to complete.
 * The openEnvelope() function takes ~1200ms total:
 *   0ms: seal click → is-pulsing
 *   200ms: inner fades, split halves created
 *   600ms: cover fades, hero entrance, scroll unlocked
 *   1200ms: cover display:none
 */
async function waitForDismissal(page) {
  await page.waitForTimeout(1800); // generous buffer for animation completion
}

test.describe('Envelope Cover Preservation Tests', () => {
  /**
   * Property 2: Preservation — Interactive and Structural Behavior
   *
   * These tests verify existing behavior BEFORE the fix is applied.
   * All tests should PASS on unfixed code.
   */

  test('Preservation 3.5: Seal and CTA visible before interaction', async ({ page }) => {
    /**
     * **Validates: Requirements 3.5, 3.6**
     * Before any interaction, verify the seal button is visible and
     * "Tap the seal to open" CTA text exists on the page.
     */
    await loadPageAndWaitForLoader(page);

    // Seal button should be visible
    const seal = page.locator('#envelope-seal');
    await expect(seal).toBeVisible();

    // CTA text "Tap the seal to open" should exist
    const cta = page.locator('.envelope-cover__cta');
    await expect(cta).toBeVisible();
    const ctaText = await cta.textContent();
    expect(ctaText).toContain('Tap the seal to open');

    // Seal should have the glow animation active (the animation property should be set)
    const sealAnimation = await seal.evaluate((el) => {
      return window.getComputedStyle(el).animationName;
    });
    expect(sealAnimation).toContain('envelope-seal-glow');
  });

  test('Preservation 3.1: Seal tap dismisses cover', async ({ page }) => {
    /**
     * **Validates: Requirements 3.1**
     * Click the seal button → wait for animation → verify envelope-cover
     * is hidden (display:none or opacity:0) → verify main content is visible.
     */
    await loadPageAndWaitForLoader(page);

    // Verify cover is visible initially
    const cover = page.locator('#envelope-cover');
    await expect(cover).toBeVisible();

    // Click the seal
    await page.locator('#envelope-seal').click();

    // Wait for the full animation sequence to complete
    await waitForDismissal(page);

    // Cover should be hidden (display: none set at 1200ms)
    const coverDisplay = await cover.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(coverDisplay).toBe('none');

    // Main content (hero section) should be visible
    const hero = page.locator('#top');
    await expect(hero).toBeVisible();
  });

  test('Preservation 3.2: Skip button dismisses cover', async ({ page }) => {
    /**
     * **Validates: Requirements 3.2**
     * Click the SKIP button → verify envelope-cover is hidden →
     * verify main content is visible.
     */
    await loadPageAndWaitForLoader(page);

    // Verify cover is visible initially
    const cover = page.locator('#envelope-cover');
    await expect(cover).toBeVisible();

    // Click the SKIP button
    await page.locator('#envelope-skip').click();

    // Wait for the full animation sequence to complete
    await waitForDismissal(page);

    // Cover should be hidden
    const coverDisplay = await cover.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(coverDisplay).toBe('none');

    // Main content should be visible
    const hero = page.locator('#top');
    await expect(hero).toBeVisible();
  });

  test('Preservation 3.3: Post-dismissal sections exist in DOM', async ({ page }) => {
    /**
     * **Validates: Requirements 3.3**
     * After cover dismissal, verify that sections #top, #card, #events,
     * and #rsvp all exist in the DOM.
     */
    await loadPageAndWaitForLoader(page);

    // Dismiss the cover via skip button
    await page.locator('#envelope-skip').click();
    await waitForDismissal(page);

    // Verify required sections exist in DOM
    const topSection = page.locator('#top');
    const cardSection = page.locator('#card');
    const eventsSection = page.locator('#events');
    const rsvpSection = page.locator('#rsvp');

    await expect(topSection).toBeAttached();
    await expect(cardSection).toBeAttached();
    await expect(eventsSection).toBeAttached();
    await expect(rsvpSection).toBeAttached();
  });

  test('Preservation 3.4: Personal names preserved', async ({ page }) => {
    /**
     * **Validates: Requirements 3.4**
     * Verify "M" and "S" text appears in the envelope initials, and
     * "Mukul" and "Sailly" appear somewhere on the page.
     */
    await loadPageAndWaitForLoader(page);

    // Check initials contain "M" and "S"
    const initialsText = await page.locator('.envelope-cover__initials').textContent();
    expect(initialsText).toContain('M');
    expect(initialsText).toContain('S');

    // Check "Mukul" and "Sailly" appear on the page (in title, alt text, or content)
    const pageContent = await page.content();
    expect(pageContent).toContain('Mukul');
    expect(pageContent).toContain('Sailly');
  });
});
