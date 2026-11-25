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

import {Injectable, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {ES_TRANSLATIONS} from './es';
import {PT_BR_TRANSLATIONS} from './pt-BR';
import {DEFAULT_LANGUAGE, EN_TRANSLATIONS, LANGUAGE_STORAGE_KEY, Language, LanguageOption, SUPPORTED_LANGUAGES, TranslationKey, Translations} from './translations';

const DICTIONARIES: Readonly<Record<Language, Translations>> = {
  es: ES_TRANSLATIONS,
  'pt-BR': PT_BR_TRANSLATIONS,
  en: EN_TRANSLATIONS,
};

const VALID_LANGUAGES = new Set<string>(SUPPORTED_LANGUAGES.map(l => l.code));

const SCORER_NAME_KEYS: Readonly<Record<string, TranslationKey>> = {
  'auto-rater': 'scorer.autoRater.name',
  'lcs': 'scorer.lcs.name',
  'source-attribution': 'scorer.sourceAttribution.name',
};

const SCORER_DESC_KEYS: Readonly<Record<string, TranslationKey>> = {
  'auto-rater': 'scorer.autoRater.description',
  'lcs': 'scorer.lcs.description',
  'source-attribution': 'scorer.sourceAttribution.description',
};

const DEFAULT_AUTO_RATER_INSTRUCTIONS = new Set<string>(
    Object.values(DICTIONARIES)
        .map(dict => dict['scoring.defaultAutoRaterInstruction'].trim()));

/**
 * Lightweight, dependency-free internationalization service powered by
 * Angular Signals and strongly typed translation dictionaries.
 *
 * Defaults to Latin American Spanish (`es`) on first load and persists any
 * user-selected language (`es`, `pt-BR`, `en`) in `localStorage`.
 */
@Injectable({providedIn: 'root'})
export class I18nService {
  readonly languages: readonly LanguageOption[] = SUPPORTED_LANGUAGES;
  readonly language = signal<Language>(this.loadInitialLanguage());
  private readonly languageSubject = new BehaviorSubject<Language>(this.language());
  /** Observable stream of language changes for RxJS-based components. */
  readonly language$ = this.languageSubject.asObservable();

  constructor() {
    this.syncDocumentLang(this.language());
  }

  /** Switches the active UI language and persists it in `localStorage`. */
  setLanguage(lang: Language) {
    if (!VALID_LANGUAGES.has(lang) || lang === this.language()) {
      return;
    }
    this.language.set(lang);
    this.languageSubject.next(lang);
    this.syncDocumentLang(lang);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      } catch (e) {
        console.warn('Could not persist language preference:', e);
      }
    }
  }

  /**
   * Translates a key for the active language, substituting `{param}` tokens.
   */
  t(key: TranslationKey, params?: Record<string, string|number>): string {
    const lang = this.language();
    const template = DICTIONARIES[lang]?.[key] ?? EN_TRANSLATIONS[key];
    if (!params) {
      return template;
    }
    return template.replace(/\{(\w+)\}/g, (match, token: string) => {
      return token in params ? String(params[token]) : match;
    });
  }

  /** Returns the localized display name for a built-in scorer, or its fallback. */
  scorerDisplayName(scorerId: string, fallback: string): string {
    const key = SCORER_NAME_KEYS[scorerId];
    return key ? this.t(key) : fallback;
  }

  /** Returns the localized description for a built-in scorer, or its fallback. */
  scorerDescription(scorerId: string, fallback?: string): string|undefined {
    const key = SCORER_DESC_KEYS[scorerId];
    return key ? this.t(key) : fallback;
  }

  /** Returns the default Auto Rater instruction for the given or active language. */
  defaultAutoRaterInstruction(lang: Language = this.language()): string {
    return DICTIONARIES[lang]['scoring.defaultAutoRaterInstruction'];
  }

  /** Whether `text` matches any language's untouched default Auto Rater rubric. */
  isDefaultAutoRaterInstruction(text: string|undefined): boolean {
    const trimmed = (text ?? '').trim();
    return trimmed === '' || DEFAULT_AUTO_RATER_INSTRUCTIONS.has(trimmed);
  }

  private loadInitialLanguage(): Language {
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored && VALID_LANGUAGES.has(stored)) {
          return stored as Language;
        }
      } catch {
        // Ignore storage access failures and fall back to the default language.
      }
    }
    return DEFAULT_LANGUAGE;
  }

  private syncDocumentLang(lang: Language) {
    if (typeof document !== 'undefined' && document.documentElement) {
      const option = SUPPORTED_LANGUAGES.find(l => l.code === lang);
      document.documentElement.lang = option?.htmlLang ?? lang;
    }
  }
}
