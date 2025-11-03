import { test, expect } from './fixtures/mainPage';
import { MainPage } from './models/MainPage';

test.describe('тесты главной страницы', () => {
  test('Проверка отображения элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка названия элементов', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Проверка href', async ({ mainPage }) => {
    await mainPage.checkElementsHref();
  });

  test('Проверка переключения на dark mode', async ({ mainPage }) => {
    await mainPage.clickSwithLightModeIcon();
    await mainPage.checkDataThemeAttributeValue();
  });

  test(`Проверка стилей со светлой темой`, async ({ mainPage }) => {
    await mainPage.setTheme('light');
    await mainPage.checkLayoutMode('light');
  });

  test(`Проверка стилей с темной темой`, async ({ mainPage }) => {
    await mainPage.setTheme('dark');
    await mainPage.checkLayoutMode('dark');
  });
});
