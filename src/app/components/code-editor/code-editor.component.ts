import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, MonacoEditorModule],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
})
export class CodeEditorComponent implements OnInit, OnChanges {
  @Input() language = 'python';
  @Input() code = '';
  @Output() codeChange = new EventEmitter<string>();
  editorModel = { value: '', language: 'python' };

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.loadSavedCode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['language'] && !changes['language'].firstChange) {
      this.loadSavedCode();
    }
  }

  loadSavedCode() {
    const saved = this.localStorage.getSavedCode(this.language);
    this.code = saved;
    this.editorModel = {
      value: this.code,
      language: this.language === 'r' ? 'r' : 'python',
    };
    this.codeChange.emit(this.code);
  }

  onEditorInit(editor: any) {
    // Optional: Save editor instance
  }

  onCodeChange(updated: any) {
    this.code = updated;
    this.editorModel.value = updated;
    this.codeChange.emit(updated);
    this.localStorage.saveCode(this.language, updated);
  }
}
