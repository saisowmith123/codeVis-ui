import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  @Input() selectedLanguage: string = 'python';
  @Output() languageChange = new EventEmitter<string>();
}
