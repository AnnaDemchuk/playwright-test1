import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js button',
        text: 'Node.js',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
        name: 'Community icon',
        text: 'Community',
        attribute: {
          type: 'href',
          value: '/community/welcome',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GitHub repository icon',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
        name: 'Discord server icon',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('button', { name: 'Switch between dark and light' }),
        name: 'Switch icon',
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
        name: 'Search input',
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable end-to-end testing for modern web apps.',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started button',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }

  async openMyPage() {
    await this.page.goto('https://playwright.dev/');
  }

  async checkElementsVisability() {
    for (const { locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Проверка названия элемента ${name}`, async () => {
          await expect(locator(this.page)).toContainText(text);
        });
      }
    }
  }

  async checkElementsHref() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`Проверка href элемента ${name}`, async () => {
          await expect(locator(this.page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    }
  }

  async clickSwithLightModeIcon() {
    await test.step('Нажатие на иконку mode', async () => {
      await this.page.getByLabel('Switch between dark and light').click(); //from system to light
      await this.page.getByLabel('Switch between dark and light').click(); ////from light to dark
    });
  }

  async checkDataThemeAttributeValue() {
    test.step('Проверка значения смены атрибута', async () => {
      await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });
  }
  async setTheme(mode: string) {
    await test.step(`Установка ${mode} темы`, async () => {
      await this.page.evaluate((theme) => {
        document.querySelector('html')?.setAttribute('data-theme', theme);
      }, mode);
    });
  }

  async checkLayoutMode(mode: string) {
    await test.step(`Скриношотная проверка ${mode} темы`, async () => {
      await expect(this.page).toHaveScreenshot(`pageWith${mode}Mode.png`);
    });
  }
}
