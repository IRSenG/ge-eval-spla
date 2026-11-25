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

import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {I18nService} from '../../i18n/i18n.service';
import {TranslatePipe} from '../../i18n/translate.pipe';
import {Language} from '../../i18n/translations';
import {AuthService} from '../../services/auth.service';
import {StateService} from '../../services/state.service';

/**
 * Component for the application header.
 * It displays the title based on the current active tab and a language switcher.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  /** Observable of the mapped title string for the current active tab. */
  tabTitle$: Observable<string>;

  constructor(
      public readonly stateService: StateService,
      public readonly authService: AuthService,
      public readonly i18n: I18nService
  ) {
    this.tabTitle$ = combineLatest([
      this.stateService.currentTab$,
      this.i18n.language$,
    ]).pipe(map(([tab]) => this.getTabTitle(tab)));
  }

  onLanguageChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.i18n.setLanguage(select.value as Language);
  }

  logout() {
    this.authService.logout();
  }

  /**
   * Returns the title string for the current active tab.
   */
  private getTabTitle(tab: string|null) {
    switch (tab) {
      case 'run':
        return this.i18n.t('nav.runEvaluation');
      case 'compare':
        return this.i18n.t('nav.compareEvals');
      case 'queries':
        return this.i18n.t('nav.runQueries');
      case 'about':
        return this.i18n.t('nav.aboutTitle');
      default:
        return this.i18n.t('nav.defaultTitle');
    }
  }
}
