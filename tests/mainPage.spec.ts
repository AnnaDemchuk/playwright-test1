import { test, expect, Page, Locator } from '@playwright/test';
import strict from 'assert/strict';
import { MainPage } from './models/MainPage';

let mainPage: MainPage;

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMyPage();
  });

  test('Проверка отображения элементов навигации хедера', async () => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка названия элементов', async () => {
    await mainPage.checkElementsText();
  });

  test('Проверка href', async ({ page }) => {
    await mainPage.checkElementsHref();
  });

  test('Проверка переключения на dark mode', async () => {
    await test.step('Нажатие на иконку mode', async () => {
      await mainPage.clickSwithLightModeIcon();
    });
    test.step('Проверка значения смены атрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`Проверка стилей со светлой темой`, async () => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Скриношотная проверка светлой темы', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Проверка стилей с темной темой`, async () => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    test.step('Скриношотная проверка темной темы', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
