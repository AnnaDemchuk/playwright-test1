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
    await test.step('Нажатие на иконку mode', async () => {
      await mainPage.clickSwithLightModeIcon();
    });
    test.step('Проверка значения смены атрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`Проверка стилей со светлой темой`, async ({ mainPage }) => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Скриношотная проверка светлой темы', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Проверка стилей с темной темой`, async ({ mainPage }) => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    test.step('Скриношотная проверка темной темы', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
