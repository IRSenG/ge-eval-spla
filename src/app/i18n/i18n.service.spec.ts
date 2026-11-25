/*
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ES_TRANSLATIONS} from './es';
import {I18nService} from './i18n.service';
import {PT_BR_TRANSLATIONS} from './pt-BR';
import {DEFAULT_LANGUAGE, EN_TRANSLATIONS, LANGUAGE_STORAGE_KEY} from './translations';
import {StateService} from '../services/state.service';

describe('I18nService', () => {
  beforeEach(() => {
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    localStorage.removeItem('ge_eval_studio_config');
  });

  afterEach(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
  });

  it('defaults to Latin American Spanish (es) when no language is stored', () => {
    const service = new I18nService();
    expect(service.language()).toBe(DEFAULT_LANGUAGE);
    expect(service.language()).toBe('es');
    expect(service.t('nav.runEvaluation')).toBe('Ejecutar evaluación');
    expect(document.documentElement.lang).toBe('es-419');
  });

  it('restores a previously saved language from localStorage', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'pt-BR');
    const service = new I18nService();
    expect(service.language()).toBe('pt-BR');
    expect(service.t('nav.runEvaluation')).toBe('Executar avaliação');
    expect(document.documentElement.lang).toBe('pt-BR');
  });

  it('persists language switches and interpolates parameters', () => {
    const service = new I18nService();
    service.setLanguage('pt-BR');
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('pt-BR');
    expect(service.t('eval.progressText', {completed: 3, total: 10}))
        .toBe('Avaliando... (3 / 10)');

    service.setLanguage('en');
    expect(service.t('eval.progressText', {completed: 3, total: 10}))
        .toBe('Evaluating... (3 / 10)');
  });

  it('keeps identical translation keys across es, pt-BR, and en', () => {
    const enKeys = Object.keys(EN_TRANSLATIONS).sort();
    const esKeys = Object.keys(ES_TRANSLATIONS).sort();
    const ptKeys = Object.keys(PT_BR_TRANSLATIONS).sort();
    expect(esKeys).toEqual(enKeys);
    expect(ptKeys).toEqual(enKeys);
  });

  it('updates untouched default auto-rater rubric in StateService on language switch', () => {
    const i18n = new I18nService();
    const state = new StateService(i18n);

    expect(state.getCurrentConfig().autoRaterInstruction)
        .toBe(ES_TRANSLATIONS['scoring.defaultAutoRaterInstruction']);

    i18n.setLanguage('pt-BR');
    expect(state.getCurrentConfig().autoRaterInstruction)
        .toBe(PT_BR_TRANSLATIONS['scoring.defaultAutoRaterInstruction']);

    // Once customized by the user, switching language must not overwrite it.
    const customRubric = 'Custom rubric with more than twenty characters.';
    state.setConfig({
      ...state.getCurrentConfig(),
      autoRaterInstruction: customRubric,
    });
    i18n.setLanguage('en');
    expect(state.getCurrentConfig().autoRaterInstruction).toBe(customRubric);
  });
});
